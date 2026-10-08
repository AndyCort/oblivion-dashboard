import { useState, useEffect, useCallback } from "react";
import type { Moment } from "../components/data/moments";
import { moments as localFallbackMoments } from "../components/data/moments";

const RAW_API_URL = import.meta.env.VITE_CMS_API_URL;

/**
 * 判断环境变量配置的 CMS URL 是否为合法且非占位符的真实地址
 */
function isValidCmsUrl(url?: string): boolean {
  if (!url || typeof url !== "string") return false;
  const trimmed = url.trim();
  if (
    !trimmed ||
    trimmed.includes("<你的CMS域名>") ||
    trimmed.includes("<your-") ||
    trimmed.includes("YOUR_CMS_DOMAIN")
  ) {
    return false;
  }
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * 防御性格式化 CMS 返回的说说数据，确保与 Moment 结构完全一致
 */
function normalizeMoment(item: Record<string, unknown>): Moment {
  let media = item.media;
  if (typeof media === "string") {
    try {
      media = JSON.parse(media);
    } catch {
      media = [];
    }
  }

  let tags = item.tags;
  if (typeof tags === "string") {
    try {
      tags = JSON.parse(tags);
    } catch {
      tags = [];
    }
  }

  let music = item.music;
  if (typeof music === "string") {
    try {
      music = JSON.parse(music);
    } catch {
      music = undefined;
    }
  }

  let time = typeof item.time === "number" ? item.time : Number(item.time);
  if (Number.isNaN(time) || !time) {
    const parsedDate = typeof item.time === "string" ? new Date(item.time).getTime() : NaN;
    time = Number.isNaN(parsedDate) ? Date.now() : parsedDate;
  }

  return {
    time,
    content:
      typeof item.content === "string" || (typeof item.content === "object" && item.content !== null)
        ? (item.content as Moment["content"])
        : undefined,
    media: Array.isArray(media) ? (media as Moment["media"]) : undefined,
    tags: Array.isArray(tags) ? (tags as string[]) : undefined,
    location: typeof item.location === "string" ? item.location : undefined,
    music: music && typeof music === "object" ? (music as Moment["music"]) : undefined,
  };
}

export function useMoments() {
  const isUrlConfigured = isValidCmsUrl(RAW_API_URL);
  const [moments, setMoments] = useState<Moment[]>(localFallbackMoments);
  const [isLoading, setIsLoading] = useState<boolean>(isUrlConfigured);
  const [error, setError] = useState<Error | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refresh = useCallback(() => {
    if (!isUrlConfigured) return;
    setIsLoading(true);
    setRefreshTrigger((prev) => prev + 1);
  }, [isUrlConfigured]);

  useEffect(() => {
    if (!isUrlConfigured) {
      return;
    }

    let isMounted = true;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 8000);

    const fetchMoments = async () => {
      try {
        const res = await fetch(RAW_API_URL!, {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });

        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}: ${res.statusText}`);
        }

        const json = await res.json();
        const rawList = Array.isArray(json)
          ? json
          : Array.isArray(json?.data)
            ? json.data
            : Array.isArray(json?.moments)
              ? json.moments
              : null;

        if (!rawList) {
          throw new Error("CMS API 返回的数据结构未包含合法的说说列表");
        }

        const parsed = (rawList as Record<string, unknown>[]).map(normalizeMoment);
        if (isMounted) {
          setMoments(parsed);
          setError(null);
        }
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }
        console.warn("无法从 CMS 获取最新说说，已回退至本地数据:", err);
        if (isMounted) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setMoments(localFallbackMoments);
        }
      } finally {
        if (isMounted) {
          clearTimeout(timeoutId);
          setIsLoading(false);
        }
      }
    };

    void fetchMoments();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [isUrlConfigured, refreshTrigger]);

  return {
    moments,
    isLoading,
    error,
    refresh,
  };
}
