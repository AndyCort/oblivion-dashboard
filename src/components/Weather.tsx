import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Cloud, CloudRain, Sun, CloudLightning, Snowflake } from 'lucide-react';
import { WidgetBase } from './ui/Shared';

interface WeatherData {
  temp: number;
  description: string;
  code: number;
}

const WeatherWidget = styled(WidgetBase)`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
`;

const WeatherInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const WeatherTemp = styled.div`
  font-family: 'Outfit', sans-serif;
  font-size: 3.5rem;
  font-weight: 200;
  line-height: 1;
`;

const WeatherDesc = styled.div`
  font-size: 1.1rem;
  opacity: 0.9;
  margin-top: 0.5rem;
  font-weight: 300;
`;

export function Weather({ className = '' }: { className?: string }) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Default coordinates (Tokyo)
    let lat = 35.6895;
    let lon = 139.6917;

    const fetchWeather = async (latitude: number, longitude: number) => {
      try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        if (!res.ok) throw new Error('Failed to fetch weather');
        const data = await res.json();
        
        setWeather({
          temp: data.current_weather.temperature,
          description: getWeatherDescription(data.current_weather.weathercode),
          code: data.current_weather.weathercode
        });
      } catch (err) {
        setError('Weather unavailable');
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        () => {
          // Fallback to default if geolocation fails/denied
          fetchWeather(lat, lon);
        }
      );
    } else {
      fetchWeather(lat, lon);
    }
    
    // Refresh every 30 minutes
    const timer = setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
          () => fetchWeather(lat, lon)
        );
      } else {
        fetchWeather(lat, lon);
      }
    }, 30 * 60 * 1000);
    
    return () => clearInterval(timer);
  }, []);

  const getWeatherDescription = (code: number): string => {
    if (code === 0) return 'Clear sky';
    if (code === 1 || code === 2 || code === 3) return 'Partly cloudy';
    if (code === 45 || code === 48) return 'Fog';
    if (code >= 51 && code <= 67) return 'Rain';
    if (code >= 71 && code <= 77) return 'Snow';
    if (code >= 80 && code <= 82) return 'Rain showers';
    if (code >= 85 && code <= 86) return 'Snow showers';
    if (code >= 95 && code <= 99) return 'Thunderstorm';
    return 'Unknown';
  };

  const getWeatherIcon = (code: number) => {
    if (code === 0) return <Sun size={64} />;
    if (code === 1 || code === 2 || code === 3) return <Cloud size={64} />;
    if (code >= 51 && code <= 67) return <CloudRain size={64} />;
    if (code >= 71 && code <= 77) return <Snowflake size={64} />;
    if (code >= 80 && code <= 82) return <CloudRain size={64} />;
    if (code >= 85 && code <= 86) return <Snowflake size={64} />;
    if (code >= 95 && code <= 99) return <CloudLightning size={64} />;
    return <Cloud size={64} />;
  };

  if (error) {
    return <WidgetBase className={className}>{error}</WidgetBase>;
  }

  if (!weather) {
    return <WidgetBase className={className}>Loading weather...</WidgetBase>;
  }

  return (
    <WeatherWidget className={className}>
      {getWeatherIcon(weather.code)}
      <WeatherInfo>
        <WeatherTemp>{Math.round(weather.temp)}°C</WeatherTemp>
        <WeatherDesc>{weather.description}</WeatherDesc>
      </WeatherInfo>
    </WeatherWidget>
  );
}
