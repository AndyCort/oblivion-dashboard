import { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, CloudLightning, Snowflake } from 'lucide-react';

interface WeatherData {
  temp: number;
  description: string;
  code: number;
}

export function Weather() {
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
    if (code === 0) return <Sun size={48} />;
    if (code === 1 || code === 2 || code === 3) return <Cloud size={48} />;
    if (code >= 51 && code <= 67) return <CloudRain size={48} />;
    if (code >= 71 && code <= 77) return <Snowflake size={48} />;
    if (code >= 80 && code <= 82) return <CloudRain size={48} />;
    if (code >= 85 && code <= 86) return <Snowflake size={48} />;
    if (code >= 95 && code <= 99) return <CloudLightning size={48} />;
    return <Cloud size={48} />;
  };

  if (error) {
    return <div className="widget">{error}</div>;
  }

  if (!weather) {
    return <div className="widget">Loading weather...</div>;
  }

  return (
    <div className="widget weather-widget">
      {getWeatherIcon(weather.code)}
      <div>
        <div className="weather-temp">{Math.round(weather.temp)}°C</div>
        <div className="weather-desc">{weather.description}</div>
      </div>
    </div>
  );
}
