import { useState, useEffect } from 'react';

interface BackgroundProps {
  url?: string;
  type?: 'image' | 'video';
}

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
        <video 
          className="background-layer"
          src={currentUrl}
          autoPlay 
          loop 
          muted 
          playsInline
        />
      ) : (
        <img 
          className="background-layer"
          src={currentUrl}
          alt="background"
        />
      )}
      <div className="overlay"></div>
    </>
  );
}
