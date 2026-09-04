import { useEffect } from 'react';
import { Background } from './components/Background';
import { Clock } from './components/Clock';
import { Weather } from './components/Weather';
import { Quotes } from './components/Quotes';
import './App.css';

function App() {
  useEffect(() => {
    document.title = '哀恋/Sorrow Love';
  }, []);

  return (
    <div className="app-container">
      {/* 
        You can pass a video URL and type="video" to the Background component 
        Example: <Background url="https://example.com/video.mp4" type="video" /> 
      */}
      <Background 
        url="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2940&auto=format&fit=crop" 
        type="image" 
      />
      
      <div className="content-layer">
        <div className="top-bar">
          <Weather />
        </div>
        
        <Clock />
        
        <div className="bottom-bar">
          {/* Spacer to push Quotes to center-right or just let it align normally */}
          <div style={{ flex: 1 }}></div>
          <Quotes />
        </div>
      </div>
    </div>
  );
}

export default App;
