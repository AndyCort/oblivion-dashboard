import type { ImgHTMLAttributes } from "react";
import styled from "styled-components";

export interface FaviconProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  url: string;
  size?: number;
}

/**
 * 使用 Google Favicon API 根据域名获取网站图标
 * @param url 网站完整地址或相对路径
 * @param size 图标尺寸（如 16, 32, 64, 128）
 */
function getGoogleFaviconUrl(url: string, size = 64): string {
  try {
    let domain = url;
    if (url.startsWith("http://") || url.startsWith("https://")) {
      domain = new URL(url).hostname;
    } else if (url.startsWith("/")) {
      domain = typeof window !== "undefined" ? window.location.hostname : "";
    } else if (url.includes("/")) {
      domain = url.split("/")[0];
    }
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=${size}`;
  } catch {
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(url)}&sz=${size}`;
  }
}

/**
 * 可复用的 Favicon 图标组件
 */
export function Favicon({ url, size = 32, alt, className, ...rest }: FaviconProps) {
  const src = getGoogleFaviconUrl(url, size);

  return (
    <StyledFavicon
      src={src}
      alt={alt || "site favicon"}
      width={size}
      height={size}
      loading="lazy"
      className={className}
      {...rest}
    />
  );
}

const StyledFavicon = styled.img`
  border-radius: 6px;
  object-fit: contain;
  flex-shrink: 0;
  display: block;
`;
