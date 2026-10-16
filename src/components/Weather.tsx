import { useEffect, useState } from "react";
import styled from "styled-components";
import { Cloud, CloudRain, Sun, CloudLightning, Snowflake, RefreshCw } from "lucide-react";
import { WidgetBase } from "./ui/Shared";

interface WeatherData {
  temp: number;
  code: number;
  location: string;
  updatedAt: number;
}
const DEFAULT_LOCATION = { latitude: 35.6895, longitude: 139.6917, label: "东京 · 默认位置" };
const REFRESH_INTERVAL = 30 * 60 * 1000;

function weatherCondition(code: number) {
  if (code === 0) return { label: "晴朗", Icon: Sun };
  if ([1, 2, 3].includes(code)) return { label: "多云", Icon: Cloud };
  if ([45, 48].includes(code)) return { label: "有雾", Icon: Cloud };
  if (code >= 51 && code <= 67) return { label: "下雨", Icon: CloudRain };
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return { label: "降雪", Icon: Snowflake };
  if (code >= 80 && code <= 82) return { label: "阵雨", Icon: CloudRain };
  if (code >= 95 && code <= 99) return { label: "雷雨", Icon: CloudLightning };
  return { label: "天气状况未知", Icon: Cloud };
}

export function Weather({ className = "" }: { className?: string }) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [request, setRequest] = useState(0);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const fetchWeather = async (latitude: number, longitude: number, location: string) => {
      if (!active) return;
      try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`, {
          signal: AbortSignal.any([controller.signal, AbortSignal.timeout(10000)]),
        });
        if (!response.ok) throw new Error("Weather request failed");
        const data = await response.json();
        const current = data.current_weather;
        if (!Number.isFinite(current?.temperature) || !Number.isFinite(current?.weathercode)) throw new Error("Invalid weather response");
        if (active) {
          setWeather({ temp: current.temperature, code: current.weathercode, location, updatedAt: Date.now() });
          setError(null);
        }
      } catch {
        if (active) setError("暂时无法更新天气");
      }
    };
    const refresh = () => {
      const fallback = () => { void fetchWeather(DEFAULT_LOCATION.latitude, DEFAULT_LOCATION.longitude, DEFAULT_LOCATION.label); };
      if (!navigator.geolocation) { fallback(); return; }
      navigator.geolocation.getCurrentPosition(
        position => { void fetchWeather(position.coords.latitude, position.coords.longitude, "当前位置"); },
        fallback,
        { timeout: 10000, maximumAge: 300000 },
      );
    };
    refresh();
    const interval = setInterval(refresh, REFRESH_INTERVAL);
    return () => {
      active = false;
      clearInterval(interval);
      controller.abort();
    };
  }, [request]);

  const condition = weather ? weatherCondition(weather.code) : null;
  const Icon = condition?.Icon || Cloud;
  return (
    <WeatherWidget className={className}>
      {weather ? <>
        <small>{weather.location}</small>
        <div className="conditions"><Icon size={44} strokeWidth={1.25} /><strong>{Math.round(weather.temp)}°<span>C</span></strong></div>
        <p>{condition?.label}</p>
        <small>{new Date(weather.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} 更新</small>
      </> : !error && <p role="status">正在获取天气…</p>}
      {error && <div role="status"><p>{error}{weather ? "，保留上次结果。" : "，稍后再试。"}</p><button type="button" onClick={() => setRequest(value => value + 1)}><RefreshCw size={14} /> 重试</button></div>}
    </WeatherWidget>
  );
}

const WeatherWidget = styled(WidgetBase)`
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-align: center;
  padding: 20px;
  animation: none;
  opacity: 1;
  width: 100%;
  color: ${({ theme }) => theme.ink};
  small { color: ${({ theme }) => theme.muted}; font-size: 11px; }
  p { font-size: 13px; line-height: 1.8; }
  .conditions { display: flex; align-items: center; justify-content: center; gap: 16px; }
  strong { font-size: 48px; font-weight: 300; line-height: 1.2; }
  strong span { font-size: 24px; }
  button { display: inline-flex; align-items: center; gap: 6px; min-height: 44px; padding: 8px 12px; border: 1px solid ${({ theme }) => theme.line}; border-radius: 10px; background: transparent; color: inherit; cursor: pointer; }
`;
