import { useState, useEffect } from 'react';
import styled from 'styled-components';

interface BackgroundProps {
  url?: string;
  type?: 'image' | 'video';
}

const BackgroundLayer = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

const BackgroundVideoLayer = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 0.1) 0%, rgba(0, 0, 0, 0.7) 100%);
  backdrop-filter: saturate(110%);
  z-index: -1;
`;

export function Background({ url, type = 'image' }: BackgroundProps) {
  const [currentUrl, setCurrentUrl] = useState<string>(
    url || 'https://images.unsplash.com/photo-1534081333815-ae5019106622?q=80&w=2940&auto=format&fit=crop'
  );

  useEffect(() => {
    if (url) setCurrentUrl(url);
  }, [url]);

  return (
    <>
      {type === 'video' ? (
        <BackgroundVideoLayer 
          src={currentUrl}
          autoPlay 
          loop 
          muted 
          playsInline
        />
      ) : (
        <BackgroundLayer 
          src={currentUrl}
          alt="background"
        />
      )}
      <Overlay />
    </>
  );
}
