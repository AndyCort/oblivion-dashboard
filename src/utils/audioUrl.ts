/** Accept direct HTTP(S) media URLs without stripping signed query parameters. */
export function parseAudioUrl(value: string): { url: string; title: string } {
  let url: URL;
  try {
    url = new URL(value.trim());
  } catch {
    throw new Error("请输入完整的音频链接（https://…）。");
  }
  if (!["https:", "http:"].includes(url.protocol)) {
    throw new Error("仅支持 HTTP 或 HTTPS 音频链接。");
  }
  const filename = url.pathname.split("/").filter(Boolean).at(-1);
  let title = filename || "链接音频";
  try { title = decodeURIComponent(title); } catch { /* Keep malformed escapes readable. */ }
  return { url: url.href, title };
}
