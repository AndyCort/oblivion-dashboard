import { useState, useEffect } from "react";
import styled from "styled-components";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { WidgetBase } from "./ui/Shared";
import { wConf } from "../config/GlobalConfig";

const MusicWidget = styled(WidgetBase)`
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;

const MusicCover = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  object-fit: cover;
`;

const MusicInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
`;

const MusicTitle = styled.div`
  font-weight: 500;
  font-size: 1rem;
`;

const MusicArtist = styled.div`
  font-size: 0.85rem;
  opacity: 0.7;
`;

const ProgressBarBackground = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  margin-top: 6px;
`;

const ProgressBarFill = styled.div<{ $progress: number }>`
  width: ${(props) => props.$progress}%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 2px;
  transition: width 1s linear;
`;

const ControlsContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(20px, 5vw, 60px);
  margin-top: 8px;
`;

const ControlButton = styled.button<{ $opacity?: number }>`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => props.$opacity ?? 1};

  &:hover {
    opacity: 1;
  }
`;

export function MusicPlayer({ className = "" }: { className?: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  // Fake progress bar
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((p) => (p >= 100 ? 0 : p + 0.5));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <MusicWidget className={className}>
      <MusicCover src={wConf.MusicPlayer.cover} alt="Album Art" />
      <MusicInfo>
        <MusicTitle>Sorrow & Light</MusicTitle>
        <MusicArtist>Oblivion Soundtrack</MusicArtist>

        {/* Fake Progress Bar */}
        <ProgressBarBackground>
          <ProgressBarFill $progress={progress} />
        </ProgressBarBackground>

        <ControlsContainer>
          <ControlButton $opacity={wConf.MusicPlayer.opacity}>
            <SkipBack size={wConf.MusicPlayer.size} />
          </ControlButton>

          <ControlButton onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? (
              <Pause size={wConf.MusicPlayer.size} />
            ) : (
              <Play size={wConf.MusicPlayer.size} />
            )}
          </ControlButton>

          <ControlButton $opacity={wConf.MusicPlayer.opacity}>
            <SkipForward size={wConf.MusicPlayer.size} />
          </ControlButton>
        </ControlsContainer>
      </MusicInfo>
    </MusicWidget>
  );
}
