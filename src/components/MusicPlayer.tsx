import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { Play, Pause, Music2, LoaderCircle, Minus, RotateCcw, RotateCw, Repeat1, Volume2, VolumeX } from "lucide-react";
import { useMusic } from "../hooks/musicContext";
import { wConf } from "../config/GlobalConfig";

function timeLabel(seconds: number) {
  const value = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
  return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, "0")}`;
}

export function MusicPlayer({ className = "" }: { className?: string }) {
  const [collapsed, setCollapsed] = useState(true);
  const [draftTime, setDraftTime] = useState<{ url: string; seconds: number } | null>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const collapseRef = useRef<HTMLButtonElement>(null);
  const interacted = useRef(false);
  const music = useMusic();
  const { track, isPlaying, isLoading, currentTime, duration, volume, muted, loop, error, togglePlay, seek, setVolume, toggleMute, toggleLoop } = music;
  const title = track?.title || wConf.MusicPlayer.title || "随身听";
  const cover = track?.cover || wConf.MusicPlayer.cover;
  const pendingTime = draftTime?.url === track?.url ? draftTime?.seconds : undefined;
  const shownTime = pendingTime ?? currentTime;
  const canSeek = !!track && duration > 0;
  const status = error ? "播放失败 · 可重试" : isLoading ? "缓冲中" : !track ? "暂无曲目" : isPlaying ? "正在播放" : "已暂停";

  useEffect(() => {
    if (interacted.current) (collapsed ? launcherRef : collapseRef).current?.focus();
  }, [collapsed]);
  const setVisibility = (value: boolean) => {
    interacted.current = true;
    setCollapsed(value);
  };
  const commitSeek = () => {
    if (pendingTime !== undefined) seek(pendingTime);
    setDraftTime(null);
  };

  if (collapsed) {
    return (
      <Launcher ref={launcherRef} type="button" onClick={() => setVisibility(false)} aria-label="展开音乐播放器" aria-expanded={false} title={`${title} · ${status}`} $playing={isPlaying}>
        <Music2 size={21} />
        {(isPlaying || error) && <span className="indicator" aria-hidden="true" />}
      </Launcher>
    );
  }

  return (
    <Player className={className} aria-label="音乐播放器" onKeyDown={event => {
      if (event.key === "Escape") { event.stopPropagation(); setVisibility(true); }
    }}>
      <Header>
        <span><Music2 size={13} /> 随身听 <i /> {status}</span>
        <Button ref={collapseRef} type="button" onClick={() => setVisibility(true)} aria-label="收起音乐播放器" title="收起"><Minus size={18} /></Button>
      </Header>
      <TrackRow>
        <Cover>{cover ? <img key={cover} src={cover} alt="" onError={event => { event.currentTarget.style.display = "none"; }} /> : null}<Music2 size={26} /></Cover>
        <div className="track-info">
          <h2 title={title}>{title}</h2>
          <p>{track?.artist || "留一点时间给音乐"}</p>
        </div>
      </TrackRow>
      <Range aria-label="播放进度" type="range" min={0} max={duration || 1} step={0.1} value={Math.min(shownTime, duration || 1)} disabled={!canSeek}
        aria-valuetext={`${timeLabel(shownTime)} / ${timeLabel(duration)}`}
        onChange={event => setDraftTime({ url: track?.url || "", seconds: Number(event.target.value) })}
        onPointerUp={commitSeek} onPointerCancel={() => setDraftTime(null)} onKeyUp={commitSeek} onBlur={commitSeek}
      />
      <Times><span>{timeLabel(shownTime)}</span><span>{duration ? timeLabel(duration) : "--:--"}</span></Times>
      <Controls>
        <Button type="button" onClick={() => seek(currentTime - 10)} disabled={!canSeek} aria-label="后退 10 秒" title="后退 10 秒"><RotateCcw size={19} /><small>10</small></Button>
        <PlayButton type="button" onClick={togglePlay} disabled={!track} aria-label={isPlaying ? "暂停音乐" : "播放音乐"}>
          {isLoading ? <LoaderCircle className="loading" size={24} /> : isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
        </PlayButton>
        <Button type="button" onClick={() => seek(currentTime + 10)} disabled={!canSeek} aria-label="快进 10 秒" title="快进 10 秒"><RotateCw size={19} /><small>10</small></Button>
      </Controls>
      <Footer>
        <Button type="button" onClick={toggleMute} aria-label={muted || volume === 0 ? "取消静音" : "静音"} title={muted ? "取消静音" : "静音"}>{muted || volume === 0 ? <VolumeX size={17} /> : <Volume2 size={17} />}</Button>
        <Range aria-label="音量" type="range" min={0} max={1} step={0.01} value={muted ? 0 : volume} onChange={event => setVolume(Number(event.target.value))} aria-valuetext={`${Math.round((muted ? 0 : volume) * 100)}%`} />
        <Button type="button" onClick={toggleLoop} aria-label="单曲循环" aria-pressed={loop} title={loop ? "关闭单曲循环" : "开启单曲循环"}><Repeat1 size={18} /></Button>
      </Footer>
      {error && <ErrorText role="status">{error}</ErrorText>}
    </Player>
  );
}

const floating = css`
  position: fixed;
  z-index: 1000;
  right: max(24px, env(safe-area-inset-right));
  bottom: calc(64px + env(safe-area-inset-bottom));
  color: ${({ theme }) => theme.ink};
  background: ${({ theme }) => theme.glass};
  border: 1px solid ${({ theme }) => theme.line};
  backdrop-filter: blur(32px) saturate(130%);
  -webkit-backdrop-filter: blur(32px) saturate(130%);
  box-shadow: 0 18px 60px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.12);
  @media (max-width: 720px) { right: max(16px, env(safe-area-inset-right)); }
`;
const Player = styled.aside`
  ${floating}
  width: min(328px, calc(100vw - 32px));
  padding: 12px 20px 10px;
  border-radius: 24px;
  max-height: calc(100dvh - 100px - env(safe-area-inset-bottom));
  overflow-y: auto;
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading { animation: spin 1.2s linear infinite; }
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: inherit;
  cursor: pointer;
  transition: background 0.2s ease;
  &:hover:not(:disabled), &[aria-pressed="true"] { background: ${({ theme }) => theme.line}; }
  &:disabled { opacity: 0.3; cursor: default; }
  small { font-size: 9px; }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: -4px -8px 8px 0;
  > span { display: flex; align-items: center; gap: 7px; font-size: 10px; color: ${({ theme }) => theme.muted}; }
  i { width: 3px; height: 3px; border-radius: 50%; background: currentColor; }
`;
const TrackRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 18px;
  .track-info { min-width: 0; }
  h2 { font-size: 17px; font-weight: 500; line-height: 1.5; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  p { font-size: 12px; line-height: 1.5; color: ${({ theme }) => theme.muted}; margin-top: 5px; overflow-wrap: anywhere; }
`;
const Cover = styled.div`
  position: relative;
  width: 68px;
  height: 68px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 16px;
  background: ${({ theme }) => theme.line};
  overflow: hidden;
  img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
`;
const Range = styled.input`
  display: block;
  width: 100%;
  min-width: 0;
  height: 24px;
  margin: 0;
  accent-color: ${({ theme }) => theme.ink};
  cursor: pointer;
  &:disabled { opacity: 0.35; cursor: default; }
`;
const Times = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.muted};
`;
const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 22px;
  padding: 12px 0;
`;
const PlayButton = styled(Button)`
  width: 56px;
  height: 56px;
  background: ${({ theme }) => theme.line};
  box-shadow: 0 4px 14px rgba(0,0,0,0.1);
`;
const Footer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border-top: 1px solid ${({ theme }) => theme.line};
  padding-top: 6px;
  margin-top: 4px;
`;
const ErrorText = styled.p`
  margin: 6px 0;
  font-size: 12px;
  line-height: 1.5;
`;
const Launcher = styled.button<{ $playing: boolean }>`
  ${floating}
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  cursor: pointer;
  .indicator { position: absolute; right: 5px; top: 4px; width: 7px; height: 7px; border-radius: 50%; background: ${({ $playing }) => $playing ? "#83bca4" : "#dfaa7a"}; }
`;
