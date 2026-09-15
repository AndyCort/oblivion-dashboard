import styled from "styled-components";
import type { Moment } from "./data/moments";
import { MapPin, Music2 } from "lucide-react";
import { formatTime } from "./utils/formatTime";

interface MomentsProps {
  moments: Moment[];
}
const author = "Andy";
const size = 12;
export default function Moments({ moments }: MomentsProps) {
  const sortedMoments = [...moments].sort((a, b) => b.time - a.time);

  return (
    <MomentsContainer>
      {sortedMoments.map((moment, index) => (
        <article key={index}>
          <header>
            <div className="avatar">
              <img src="https://raw.githubusercontent.com/AndyCort/PicGo/master/img/6C93394B-9A64-4DCE-BA19-3E6A316120D1_1_201_a.jpeg" />
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
              {moment.media.map((item, index) =>
                item.type === "img" ? (
                  <img key={index} src={item.url} alt="" />
                ) : (
                  <video key={index} src={item.url} controls />
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
                <a href={moment.music.url}>
                  <Music2 size={size} /> {moment.music.title} -{" "}
                  {moment.music.artist}
                </a>
              </span>
            )}
          </footer>
        </article>
      ))}
    </MomentsContainer>
  );
}

const MomentsContainer = styled.div`
  /* test */
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  color: #ffffff;
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
        // border: 1px solid blue;
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
            font-style: bold;
            transition: ease-in-out 0.3s;
          }
        }
      }
    }
  }
`;
