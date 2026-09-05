import { useState } from 'react';
import styled from 'styled-components';
import { CloudRain, Flame, Wind } from 'lucide-react';
import { WidgetBase, WidgetTitle } from './ui/Shared';

const AmbientWidget = styled(WidgetBase)`
  gap: 1rem;
  justify-content: center;
`;

const SoundsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const SoundButton = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  color: white;
  opacity: ${props => (props.$active ? 1 : 0.4)};
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    opacity: ${props => (props.$active ? 1 : 0.7)};
  }
`;

const StatusText = styled.div`
  text-align: center;
  font-size: 0.9rem;
  opacity: 0.7;
  margin-top: 0.5rem;
`;

export function AmbientSounds({ className = '' }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  const toggle = (sound: string) => setActive(active === sound ? null : sound);

  return (
    <AmbientWidget className={className}>
      <WidgetTitle>Ambient</WidgetTitle>
      <SoundsContainer>
        <SoundButton $active={active === 'rain'} onClick={() => toggle('rain')}>
          <CloudRain size={32} />
        </SoundButton>
        <SoundButton $active={active === 'fire'} onClick={() => toggle('fire')}>
          <Flame size={32} />
        </SoundButton>
        <SoundButton $active={active === 'wind'} onClick={() => toggle('wind')}>
          <Wind size={32} />
        </SoundButton>
      </SoundsContainer>
      <StatusText>
        {active ? `Playing: ${active}` : 'Off'}
      </StatusText>
    </AmbientWidget>
  );
}
