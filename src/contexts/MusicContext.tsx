import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { MusicContext, type Track } from "../hooks/musicContext";
import { wConf } from "../config/GlobalConfig";
import { parseAudioUrl } from "../utils/audioUrl";

function getConfiguredTrack(): Track | null {
  const config = wConf.MusicPlayer;
  if (!config.url.trim()) return null;
  try {
    const parsed = parseAudioUrl(config.url);
    return {
      url: parsed.url,
      title: config.title || parsed.title,
      artist: config.artist,
      cover: config.cover,
    };
  } catch {
    return null;
  }
}

export function MusicProvider({ children }: { children: ReactNode }) {
  const [track, setTrack] = useState<Track | null>(getConfiguredTrack);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1);
  const [muted, setMuted] = useState(false);
  const [loop, setLoop] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const requestRef = useRef(0);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    const updateProgress = () => {
      const length = Number.isFinite(audio.duration) ? audio.duration : 0;
      setDuration(length);
      setCurrentTime(audio.currentTime);
      setProgress(length > 0 ? Math.min(100, audio.currentTime / length * 100) : 0);
    };
    const onVolume = () => { setVolumeState(audio.volume); setMuted(audio.muted); };
    const onPlay = () => { setIsPlaying(true); setError(null); };
    const onPause = () => { setIsPlaying(false); setIsLoading(false); };
    const onWaiting = () => setIsLoading(true);
    const onPlaying = () => { setIsPlaying(true); setIsLoading(false); };
    const onEnded = () => { setIsLoading(false); setIsPlaying(false); updateProgress(); };
    const onError = () => { setIsLoading(false); setIsPlaying(false); setProgress(0); setError("无法播放此音频，请重试或选择其他曲目。"); };
    audio.addEventListener("loadedmetadata", updateProgress);
    audio.addEventListener("durationchange", updateProgress);
    audio.addEventListener("volumechange", onVolume);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);
    return () => {
      audio.removeEventListener("loadedmetadata", updateProgress);
      audio.removeEventListener("durationchange", updateProgress);
      audio.removeEventListener("volumechange", onVolume);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      audioRef.current = null;
    };
  }, []);

  const play = (audio: HTMLAudioElement) => {
    const request = ++requestRef.current;
    setError(null);
    setIsLoading(true);
    if (audio.error) audio.load();
    void audio.play().catch(() => {
      if (audioRef.current === audio && request === requestRef.current) {
        setIsPlaying(false);
        setIsLoading(false);
        setError("播放未能开始，请点击播放重试。");
      }
    });
  };
  const playTrack = (newTrack: Track) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.getAttribute("src") !== newTrack.url) {
      audio.src = newTrack.url;
      setProgress(0);
      setCurrentTime(0);
      setDuration(0);
    }
    setTrack(newTrack);
    play(audio);
  };
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio || !track) return;
    if (!audio.paused) { requestRef.current++; audio.pause(); }
    else {
      if (audio.getAttribute("src") !== track.url) audio.src = track.url;
      play(audio);
    }
  };

  const seek = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(seconds) || !Number.isFinite(audio.duration) || audio.duration <= 0) return;
    audio.currentTime = Math.max(0, Math.min(seconds, audio.duration));
    setCurrentTime(audio.currentTime);
    setProgress(audio.currentTime / audio.duration * 100);
  };
  const setVolume = (value: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(value)) return;
    audio.volume = Math.max(0, Math.min(value, 1));
    audio.muted = value === 0;
    setVolumeState(audio.volume);
    setMuted(audio.muted);
  };
  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.muted || audio.volume === 0) {
      if (audio.volume === 0) audio.volume = 0.5;
      audio.muted = false;
    } else audio.muted = true;
    setMuted(audio.muted);
    setVolumeState(audio.volume);
  };
  const toggleLoop = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = !audio.loop;
    setLoop(audio.loop);
  };

  return <MusicContext.Provider value={{ track, isPlaying, isLoading, progress, currentTime, duration, volume, muted, loop, seek, setVolume, toggleMute, toggleLoop, error, playTrack, togglePlay }}>{children}</MusicContext.Provider>;
}
