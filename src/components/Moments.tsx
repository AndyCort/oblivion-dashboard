import styled from "styled-components";
import type { Moment } from "./data/moments";
import { moments as defaultMoments } from "./data/moments";
import { MapPin, Music2 } from "lucide-react";
import { formatTime } from "./utils/formatTime";
import { useMusic } from "../contexts/MusicContext";

export interface MomentsProps {
  moments?: Moment[];
  isLoading?: boolean;
}

const author = "Andy";
const size = 12;

export default function Moments({ moments = defaultMoments, isLoading = false }: MomentsProps) {
  const { playTrack } = useMusic();
  const sortedMoments = [...moments].sort((a, b) => b.time - a.time);

  return (
    <MomentsContainer>
      {isLoading ? (
        <>
          {[1, 2, 3].map((id) => (
            <article key={`skeleton-${id}`} className="skeleton-card" aria-hidden="true">
              <header>
                <div className="skeleton-avatar skeleton-pulse" />
                <div className="skeleton-author skeleton-pulse" />
              </header>
              <div className="skeleton-body">
                <div className="skeleton-line skeleton-pulse" style={{ width: "92%" }} />
                <div className="skeleton-line skeleton-pulse" style={{ width: "78%" }} />
                <div className="skeleton-line skeleton-pulse" style={{ width: "54%" }} />
              </div>
              <footer className="skeleton-footer">
                <div className="skeleton-pill skeleton-pulse" style={{ width: "70px" }} />
                <div className="skeleton-pill skeleton-pulse" style={{ width: "100px" }} />
              </footer>
            </article>
          ))}
        </>
      ) : (
        sortedMoments.map((moment, index) => (
          <article
            key={`${moment.time}-${index}`}
            style={{ animationDelay: `${Math.min(index * 0.05, 0.25)}s` }}
          >
            <header>
              <div className="avatar">
                <img
                  src="https://raw.githubusercontent.com/AndyCort/PicGo/master/img/6C93394B-9A64-4DCE-BA19-3E6A316120D1_1_201_a.jpeg"
                  alt={author}
                  loading="lazy"
                />
              </div>
              <div className="author">{author}</div>
            </header>

            {/* 文字 */}
            <div className="text-container">
              {moment.content && (
                <div>
                  {typeof moment.content === "string"
                    ? moment.content
                    : moment.content.zh}
                </div>
              )}
            </div>

            {/* 图片 / 视频 */}
            {moment.media && moment.media.length > 0 && (
              <div className="media-container">
                {moment.media.map((item, mIdx) =>
                  item.type === "img" ? (
                    <img key={mIdx} src={item.url} alt="" loading="lazy" />
                  ) : (
                    <video key={mIdx} src={item.url} controls playsInline preload="metadata" />
                  ),
                )}
              </div>
            )}

            {/* Tag */}
            {moment.tags && moment.tags.length > 0 && (
              <div className="tags-container">
                {moment.tags.map((tag) => (
                  <span key={tag}>#{tag}</span>
                ))}
              </div>
            )}

            {/* 位置 */}
            {moment.location && (
              <div className="location-container">
                <MapPin size={size} strokeWidth={3} /> {moment.location}
              </div>
            )}

            {/* 底部 */}
            <footer>
              {/* 左边：时间 */}
              <span>{formatTime(moment.time)}</span>

              {/* 右边：音乐等 */}
              {moment.music && (
                <span>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (moment.music) {
                        playTrack({
                          title: moment.music.title,
                          artist: moment.music.artist,
                          url: moment.music.url,
                        });
                      }
                    }}
                  >
                    <Music2 size={size} /> {moment.music.title} -{" "}
                    {moment.music.artist}
                  </a>
                </span>
              )}
            </footer>
          </article>
        ))
      )}
    </MomentsContainer>
  );
}

const MomentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  color: #ffffff;

  @keyframes momentFadeIn {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes skeletonShimmer {
    0% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }

  article {
    height: auto;
    width: clamp(200px, 40vw, 1200px);
    border-radius: 12px;
    border: 1px solid #00000020;
    background: #000000bb;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    padding: 20px;
    gap: 20px;
    animation: momentFadeIn 0.35s ease-out backwards;

    &.skeleton-card {
      pointer-events: none;
      user-select: none;
      animation: none;
    }

    .skeleton-pulse {
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.04) 25%,
        rgba(255, 255, 255, 0.1) 37%,
        rgba(255, 255, 255, 0.04) 63%
      );
      background-size: 400% 100%;
      animation: skeletonShimmer 1.8s ease-in-out infinite;
    }

    .skeleton-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }

    .skeleton-author {
      width: 64px;
      height: 16px;
      border-radius: 4px;
    }

    .skeleton-body {
      margin: 20px 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .skeleton-line {
      height: 15px;
      border-radius: 4px;
    }

    .skeleton-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 16px;
    }

    .skeleton-pill {
      height: 14px;
      border-radius: 4px;
    }

    header {
      display: flex;
      gap: 10px;
      font-size: ${1.5 * size}px;

      .avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 36px;
        width: 36px;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

      .author {
        display: flex;
        align-items: center;
      }
    }

    .text-container {
      margin: 20px 0;
      white-space: pre-wrap;
      word-break: break-word;
      font-family: "EB Garamond", "LXGW WenKai TC", Georgia, serif;
      letter-spacing: 0.025em;
      line-height: 1.625;
      font-size: 15px;
    }

    .media-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin: 8px 0;

      img,
      video {
        width: 100%;
        aspect-ratio: 1 / 1;
        object-fit: cover;
        display: block;
        border-radius: 8px;
      }
    }

    .tags-container {
      display: flex;
      gap: 16px;
      margin: 16px 0;
      font-family: "LXGW WenKai TC";
      span {
        color: oklch(0.8 0.1 263);
      }
    }

    .location-container {
      display: flex;
      align-items: center;
      gap: 4px;
      margin: 8px 0;
      font-size: 12px;
      font-family: "LXGW WenKai TC";
    }

    footer {
      font-size: ${1.2 * size}px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;

      span {
        display: flex;
        align-items: center;
        gap: 4px;

        a {
          text-decoration: none;
          color: #ffffff;

          &:hover {
            font-weight: bold;
            transition: ease-in-out 0.3s;
          }
        }
      }
    }
  }
`;
