import { normalizeMomentsResponse } from "../utils/normalizeMoments";
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

  return normalizeMomentsResponse(await res.json());
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
        if (!isMounted) return;
        const lastError = err instanceof Error ? err : new Error(String(err));
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
