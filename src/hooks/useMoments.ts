import { useState, useEffect, useCallback } from "react";
import type { Moment } from "../components/data/moments";
import { moments as localFallbackMoments } from "../components/data/moments";

const DEFAULT_API_URL = "https://admin.sorrow.love/api/public/moments";
const RAW_API_URL = import.meta.env.VITE_CMS_API_URL;

/**
 * 判断环境变量配置的 CMS URL 是否为合法且非占位符的真实地址
 */
function isValidCmsUrl(url?: string): url is string {
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

const API_URL = isValidCmsUrl(RAW_API_URL) ? RAW_API_URL.trim() : DEFAULT_API_URL;

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

async function fetchFromEndpoint(url: string, signal: AbortSignal): Promise<Moment[]> {
  const res = await fetch(url, {
    signal,
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    throw new Error(`HTTP error ${res.status}: ${res.statusText}`);
  }

  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json") && !contentType.includes("text/json")) {
    throw new Error(`响应非 JSON 格式 (${contentType})`);
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

  return (rawList as Record<string, unknown>[]).map(normalizeMoment);
}

export function useMoments() {
  const [moments, setMoments] = useState<Moment[]>(localFallbackMoments);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refresh = useCallback(() => {
    setIsLoading(true);
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 8000);

    const fetchMoments = async () => {
      try {
        const loadedMoments = await fetchFromEndpoint(API_URL, controller.signal);
        if (isMounted) {
          setMoments(loadedMoments);
          setError(null);
        }
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }
        const lastError = err instanceof Error ? err : new Error(String(err));
        console.warn(`从 ${API_URL} 获取最新说说失败，已回退至本地数据:`, lastError);
        if (isMounted) {
          setError(lastError);
          setMoments(localFallbackMoments);
        }
      }
    };

    fetchMoments().finally(() => {
      if (isMounted) {
        clearTimeout(timeoutId);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [refreshTrigger]);

  return {
    moments,
    isLoading,
    error,
    refresh,
  };
}
