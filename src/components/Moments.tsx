import styled, { keyframes } from "styled-components";
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

const momentFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const skeletonShimmer = keyframes`
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
`;

const MomentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  color: #ffffff;
`;

const Article = styled.article<{ $delay?: number }>`
  height: auto;
  width: clamp(200px, 40vw, 1200px);
  border-radius: 12px;
  border: 1px solid #00000020;
  background: #000000bb;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 20px;
  gap: 20px;
  animation: ${momentFadeIn} 0.35s ease-out backwards;
  animation-delay: ${(props) => props.$delay ?? 0}s;
`;

const SkeletonCard = styled(Article)`
  pointer-events: none;
  user-select: none;
  animation: none;
`;

const SkeletonPulse = styled.div`
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.04) 25%,
    rgba(255, 255, 255, 0.1) 37%,
    rgba(255, 255, 255, 0.04) 63%
  );
  background-size: 400% 100%;
  animation: ${skeletonShimmer} 1.8s ease-in-out infinite;
`;

const SkeletonAvatar = styled(SkeletonPulse)`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

const SkeletonAuthor = styled(SkeletonPulse)`
  width: 64px;
  height: 16px;
  border-radius: 4px;
`;

const SkeletonBody = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SkeletonLine = styled(SkeletonPulse)<{ $width: string }>`
  width: ${(props) => props.$width};
  height: 15px;
  border-radius: 4px;
`;

const SkeletonFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`;

const SkeletonPill = styled(SkeletonPulse)<{ $width: string }>`
  width: ${(props) => props.$width};
  height: 14px;
  border-radius: 4px;
`;

const CardHeader = styled.header`
  display: flex;
  gap: 10px;
  font-size: ${1.5 * size}px;
`;

const Avatar = styled.div`
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
`;

const Author = styled.div`
  display: flex;
  align-items: center;
`;

const TextContainer = styled.div`
  margin: 20px 0;
  white-space: pre-wrap;
  word-break: break-word;
  font-family: "EB Garamond", "LXGW WenKai TC", Georgia, serif;
  letter-spacing: 0.025em;
  line-height: 1.625;
  font-size: 15px;
`;

const MediaContainer = styled.div`
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
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 16px;
  margin: 16px 0;
  font-family: "LXGW WenKai TC";
`;

const TagItem = styled.span`
  color: oklch(0.8 0.1 263);
`;

const LocationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 8px 0;
  font-size: 12px;
  font-family: "LXGW WenKai TC";
`;

const CardFooter = styled.footer`
  font-size: ${1.2 * size}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const FooterItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const MusicLink = styled.a`
  text-decoration: none;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    font-weight: bold;
    transition: ease-in-out 0.3s;
  }
`;

export default function Moments({ moments = defaultMoments, isLoading = false }: MomentsProps) {
  const { playTrack } = useMusic();
  const sortedMoments = [...moments].sort((a, b) => b.time - a.time);

  return (
    <MomentsContainer>
      {isLoading ? (
        <>
          {[1, 2, 3].map((id) => (
            <SkeletonCard key={`skeleton-${id}`} aria-hidden="true">
              <CardHeader>
                <SkeletonAvatar />
                <SkeletonAuthor />
              </CardHeader>
              <SkeletonBody>
                <SkeletonLine $width="92%" />
                <SkeletonLine $width="78%" />
                <SkeletonLine $width="54%" />
              </SkeletonBody>
              <SkeletonFooter>
                <SkeletonPill $width="70px" />
                <SkeletonPill $width="100px" />
              </SkeletonFooter>
            </SkeletonCard>
          ))}
        </>
      ) : (
        sortedMoments.map((moment, index) => (
          <Article
            key={`${moment.time}-${index}`}
            $delay={Math.min(index * 0.05, 0.25)}
          >
            <CardHeader>
              <Avatar>
                <img
                  src="https://raw.githubusercontent.com/AndyCort/PicGo/master/img/6C93394B-9A64-4DCE-BA19-3E6A316120D1_1_201_a.jpeg"
                  alt={author}
                  loading="lazy"
                />
              </Avatar>
              <Author>{author}</Author>
            </CardHeader>

            {moment.content && (
              <TextContainer>
                {typeof moment.content === "string"
                  ? moment.content
                  : moment.content.zh}
              </TextContainer>
            )}

            {moment.media && moment.media.length > 0 && (
              <MediaContainer>
                {moment.media.map((item, mIdx) =>
                  item.type === "img" ? (
                    <img key={mIdx} src={item.url} alt="" loading="lazy" />
                  ) : (
                    <video key={mIdx} src={item.url} controls playsInline preload="metadata" />
                  ),
                )}
              </MediaContainer>
            )}

            {moment.tags && moment.tags.length > 0 && (
              <TagsContainer>
                {moment.tags.map((tag) => (
                  <TagItem key={tag}>#{tag}</TagItem>
                ))}
              </TagsContainer>
            )}

            {moment.location && (
              <LocationContainer>
                <MapPin size={size} strokeWidth={3} /> {moment.location}
              </LocationContainer>
            )}

            <CardFooter>
              <FooterItem>{formatTime(moment.time)}</FooterItem>

              {moment.music && (
                <FooterItem>
                  <MusicLink
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
                    <Music2 size={size} /> {moment.music.title} - {moment.music.artist}
                  </MusicLink>
                </FooterItem>
              )}
            </CardFooter>
          </Article>
        ))
      )}
    </MomentsContainer>
  );
}
