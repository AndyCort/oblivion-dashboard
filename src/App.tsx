import { useState, useEffect } from "react";
import { HomePage } from "./pages/HomePage";
import { NowPage } from "./pages/NowPage";
import { NotesPage } from "./pages/NotesPage";
import { LibraryPage } from "./pages/LibraryPage";
import { SpacePage } from "./pages/SpacePage";
import { Sun, Moon, ChevronUp, ChevronDown } from "lucide-react";
import styled, {
  useTheme,
  ThemeProvider as StyledThemeProvider,
  createGlobalStyle,
  keyframes,
} from "styled-components";
import { DotButton } from "./components/ui/DotButton";
import { GlobalConfig } from "./config/GlobalConfig";
import { MusicProvider } from "./contexts/MusicContext";
import { MusicPlayer } from "./components/MusicPlayer";
// 标题
const brand = `${GlobalConfig.siteName.zh} / ${GlobalConfig.siteName.en}`;

const pagesList = ["home", "now", "notes", "library", "moments"] as const;
type Page = (typeof pagesList)[number];

const GlobalBodyStyle = createGlobalStyle`
  body {
    color: ${({ theme }: any) => theme.ink};
  }
`;

function App() {
  const theme = useTheme() as any;
  const [activePage, setActivePage] = useState<Page>("home");

  useEffect(() => {
    document.title = `${GlobalConfig.siteName.zh} - ${activePage}`;
  }, [activePage]);

  const goNextPage = () => {
    const currentIndex = pagesList.indexOf(activePage);
    setActivePage(pagesList[(currentIndex + 1) % pagesList.length]);
  };

  const goPrevPage = () => {
    const currentIndex = pagesList.indexOf(activePage);
    setActivePage(
      pagesList[(currentIndex - 1 + pagesList.length) % pagesList.length],
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        goNextPage();
      }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        goPrevPage();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activePage]);

  const [timeStr, setTimeStr] = useState("");
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const currentTheme = theme.themes[0];
  const combinedTheme = {
    ...currentTheme.colors,
    fontSizes: theme.fontSizes,
  };

  return (
    <>
      <Background $bg={currentTheme.bgImg} />
      <AmbientOrb />

      <MusicProvider>
        <StyledThemeProvider theme={combinedTheme}>
          <GlobalBodyStyle />
          <Layout>
            <nav className="nav" aria-label="Page navigation">
              {pagesList.map((page) => (
                <DotButton
                  key={page}
                  active={activePage === page}
                  onClick={() => setActivePage(page)}
                  label={page}
                  labelAlign="right"
                />
              ))}
            </nav>

            <header className="top">
              <div className="brand">{brand}</div>
              <div className="top-right">
                <div className="dark-mode">
                  <button onClick={() => setDarkMode(!darkMode)}>
                    {darkMode ? (
                      <Sun size={16} strokeWidth={1.5} />
                    ) : (
                      <Moon size={16} strokeWidth={1.5} />
                    )}
                  </button>
                </div>
              </div>
            </header>

            <main className="pages">
              <HomePage isActive={activePage === "home"} />
              <NowPage isActive={activePage === "now"} />
              <NotesPage isActive={activePage === "notes"} />
              <LibraryPage isActive={activePage === "library"} />
              <SpacePage isActive={activePage === "moments"} />
            </main>

            <button
              className="nav-arrow prev"
              onClick={goPrevPage}
              aria-label="Previous page"
            >
              <ChevronUp size={24} strokeWidth={1.5} />
            </button>
            <button
              className="nav-arrow next"
              onClick={goNextPage}
              aria-label="Next page"
            >
              <ChevronDown size={24} strokeWidth={1.5} />
            </button>

            <div className="bottom-status">
              <div>
                <span className="status-dot"></span>
                <strong>Online</strong>
              </div>
              <div>{timeStr}</div>
            </div>
            
            <MusicPlayer className="global-player" />

          </Layout>
        </StyledThemeProvider>
      </MusicProvider>
    </>
  );
}

const Background = styled.div<{ $bg: string }>`
  position: fixed;
  inset: 0;
  z-index: -1;
  background: url(${({ $bg }) => $bg}) center / cover no-repeat;
`;

const breathe = keyframes`
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.08);
  }
`;

const AmbientOrb = styled.div`
  position: fixed;
  width: 42vw;
  height: 42vw;
  max-width: 620px;
  max-height: 620px;
  border-radius: 50%;
  left: 58%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(
    circle at 35% 30%,
    rgba(255, 255, 255, 0.5),
    rgba(214, 195, 220, 0.14) 45%,
    transparent 70%
  );
  filter: blur(8px);
  pointer-events: none;
  animation: ${breathe} 9s ease-in-out infinite;
  z-index: 0;
`;

const Layout = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  min-height: 560px;
  z-index: 1;

  /* Nav */
  .nav {
    position: fixed;
    z-index: 20;
    left: 34px;
    top: 50%;
    transform: translateY(-50%);
    width: 28px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 19px;

    &::before {
      content: "";
      position: absolute;
      top: 3px;
      bottom: 3px;
      width: 1px;
      background: rgba(40, 37, 42, 0.13);
    }
  }
  /* Top Header */
  .top {
    position: absolute;
    z-index: 10;
    top: 34px;
    left: 92px;
    right: 56px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .brand {
      font-size: 11px;
      letter-spacing: 0.28em;
      text-transform: uppercase;
    }
    .top-right {
      display: flex;
      align-items: center;
      gap: 13px;

      font-size: 12px;
      .dark-mode {
        display: flex;
        align-items: center;
        justify-content: center;
        button {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: transparent;
          border: none;
          color: ${({ theme }) => theme.ink};
        }
      }
    }
  }
  /* Pages */
  .pages {
    position: absolute;
    inset: 0;

    .page {
      position: absolute;
      inset: 0;
      padding: 0 8vw 0 10vw;
      display: grid;
      place-items: center;
      opacity: 0;
      pointer-events: none;
      transform: translateY(18px) scale(0.985);
      filter: blur(8px);
      transition:
        opacity 0.65s ease,
        transform 0.8s cubic-bezier(0.2, 0.75, 0.2, 1),
        filter 0.65s ease;
    }
    .page.active {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0) scale(1);
      filter: blur(0);
    }
  }

  /* Up/Down Arrows */
  .nav-arrow {
    position: fixed;
    left: 50%;
    z-index: 20;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    color: ${({ theme }) => theme.muted};
    cursor: pointer;
    transition: 0.3s ease;
    transform: translateX(-50%);

    &:hover {
      color: ${({ theme }) => theme.ink};
      transform: translateX(-50%) scale(1.1);
    }

    &.prev {
      top: 24px;
    }
    &.next {
      bottom: 24px;
    }
  }

  /* Cleaned up page specific components */
  /* Bottom Status */
  .bottom-status {
    position: absolute;
    z-index: 10;
    left: 92px;
    bottom: 34px;
    right: 56px;
    display: flex;
    justify-content: space-between;
    align-items: end;
    color: ${({ theme }) => theme.muted};
    font-size: 9px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }
  .status-dot {
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: rgba(40, 37, 42, 0.5);
    margin-right: 7px;
  }

  .global-player {
    position: fixed;
    z-index: 50;
    right: 30px;
    bottom: 30px;
    width: 280px;
    padding: 16px;
    border-radius: 16px;
    background: rgba(0, 0, 0, 0.65);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    color: #fff;
    transform: scale(0.9);
    transform-origin: bottom right;
    transition: 0.3s ease;

    &:hover {
      transform: scale(1);
    }
  }

  @media (max-width: 720px) {
    .nav {
      left: 18px;
    }
    .top {
      left: 58px;
      right: 22px;
      top: 22px;
    }
    .bottom-status {
      left: 58px;
      right: 22px;
      bottom: 20px;
    }
    .global-player {
      width: calc(100vw - 40px);
      right: 20px;
      bottom: 80px;
      transform: scale(1);
    }
    .page {
      padding: 80px 7vw 80px 12vw;
    }
  }

  /* React Component Overrides inside the new design */
  .ambient-component {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    backdrop-filter: none !important;
  }
  .ambient-component * {
    color: ${({ theme }) => theme.ink} !important;
    text-shadow: none !important;
  }
`;

export default App;
