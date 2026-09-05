import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { WidgetBase, WidgetTitle } from './ui/Shared';

const WorldClockWidget = styled(WidgetBase)``;

const ClocksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  justify-content: center;
`;

const CityRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CityName = styled.span`
  opacity: 0.8;
`;

const CityTime = styled.span`
  font-size: 1.2rem;
  font-weight: 300;
`;

export function WorldClock({ className = '' }: { className?: string }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (tz: string) => time.toLocaleTimeString([], { timeZone: tz, hour: '2-digit', minute: '2-digit' });

  return (
    <WorldClockWidget className={className}>
      <WidgetTitle>World</WidgetTitle>
      <ClocksContainer>
        <CityRow>
          <CityName>Tokyo</CityName>
          <CityTime>{format('Asia/Tokyo')}</CityTime>
        </CityRow>
        <CityRow>
          <CityName>London</CityName>
          <CityTime>{format('Europe/London')}</CityTime>
        </CityRow>
        <CityRow>
          <CityName>New York</CityName>
          <CityTime>{format('America/New_York')}</CityTime>
        </CityRow>
      </ClocksContainer>
    </WorldClockWidget>
  );
}
