import type { Moment, Media } from "../components/data/moments";

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function parse(value: unknown): unknown {
  if (typeof value !== "string") return value;
  try { return JSON.parse(value); } catch { return undefined; }
}
function webUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try { return ["https:", "http:"].includes(new URL(value).protocol); } catch { return false; }
}

/** Discard invalid records and validate nested fields before rendering CMS data. */
export function normalizeMoment(item: unknown): Moment | null {
  if (!record(item)) return null;
  let time = typeof item.time === "number" ? item.time : typeof item.time === "string" && item.time.trim() ? Number(item.time) : NaN;
  if (!Number.isFinite(time) && typeof item.time === "string") time = Date.parse(item.time);
  if (!Number.isFinite(time) || Number.isNaN(new Date(time).getTime())) return null;

  const content = typeof item.content === "string" ? item.content
    : record(item.content) && typeof item.content.zh === "string"
      ? { zh: item.content.zh, en: typeof item.content.en === "string" ? item.content.en : "" } : undefined;
  const rawMedia = parse(item.media);
  const media: Media[] = Array.isArray(rawMedia) ? rawMedia.flatMap(value =>
    record(value) && (value.type === "img" || value.type === "vid") && webUrl(value.url)
      ? [{ type: value.type, url: value.url }] : []) : [];
  const rawTags = parse(item.tags);
  const tags = Array.isArray(rawTags) ? [...new Set(rawTags.filter((tag): tag is string => typeof tag === "string" && tag.trim().length > 0))] : [];
  const rawMusic = parse(item.music);
  const music = record(rawMusic) && typeof rawMusic.title === "string" && typeof rawMusic.artist === "string" && webUrl(rawMusic.url)
    ? { title: rawMusic.title, artist: rawMusic.artist, url: rawMusic.url } : undefined;
  return { time, content, media, tags, music, location: typeof item.location === "string" ? item.location : undefined };
}

export function normalizeMomentsResponse(json: unknown): Moment[] {
  const raw = Array.isArray(json) ? json : record(json) ? (Array.isArray(json.data) ? json.data : json.moments) : undefined;
  if (!Array.isArray(raw)) throw new Error("CMS response does not contain a moments list");
  const normalized = raw.map(normalizeMoment).filter((item): item is Moment => item !== null);
  if (raw.length && !normalized.length) throw new Error("CMS response contains no valid moments");
  return normalized;
}
