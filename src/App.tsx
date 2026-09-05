import { useEffect } from "react";
import styled from "styled-components";
import { Background } from "./components/Background";
import { Clock } from "./components/Clock";
import { Weather } from "./components/Weather";
import { MusicPlayer } from "./components/MusicPlayer";
import { Quotes } from "./components/Quotes";
import { GlobalConfig } from "./config/GlobalConfig";

const AppContainer = styled.div`
  --line-height: 150px;
  width: 100vw;
  height: 100vh;
  position: relative;
  z-index: 0;
  overflow: hidden;
  color: #f8fafc;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  font-family: "Inter", sans-serif;
`;

const ContentLayer = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 4rem;
  gap: 4rem;
`;

const LeftBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;

  .w-clock {
    animation-delay: 0.1s;
    height: var(--line-height);
  }

  .w-quote {
    align-items: center;
    justify-content: center;
    animation-delay: 0.1s;
    height: calc(var(--line-height) * 0.3);
  }
`;

const RightBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;

  .w-weather {
    animation-delay: 0.2s;
    width: var(--line-height);
    height: var(--line-height);
    flex-shrink: 0;
  }
  .w-music {
    animation-delay: 0.3s;
    flex: 1;
    height: var(--line-height);
    padding: 0 24px;
  }
`;

function App() {
  useEffect(() => {
    document.title = "哀恋/Sorrow Love";
  }, []);

  return (
    <AppContainer>
      <Background url={GlobalConfig.BgUrl} type="image" />

      <ContentLayer>
        {/* 左侧区域：顶部时间，底部留空 */}
        <LeftBlock>
          <Clock className="w-clock" />
          <Quotes className="w-quote" />
        </LeftBlock>

        {/* 右侧区域：顶部天气、音乐 */}
        <RightBlock>
          <Weather className="w-weather" />
          <MusicPlayer className="w-music" />
        </RightBlock>
      </ContentLayer>
    </AppContainer>
  );
}

export default App;
