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
} from "styled-components";
import { DotButton } from "./components/ui/DotButton";
import { GlobalConfig } from "./config/GlobalConfig";
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
  // 背景图设置
  const [currentBg, setCurrentBg] = useState(3);

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

  const currentTheme = theme.themes[currentBg];
  const combinedTheme = {
    ...currentTheme.colors,
    fontSizes: theme.fontSizes,
  };

  return (
    <>
      <Background $bg={currentTheme.bgImg} />
      <div className="ambient-orb"></div>

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
          {/* */}
          <Dots>
            {theme.themes.map((_: any, index: number) => (
              <DotButton
                key={index}
                active={currentBg === index}
                onClick={() => setCurrentBg(index)}
                label={theme.themes[index].name}
                labelAlign="left"
              />
            ))}
          </Dots>
        </Layout>
      </StyledThemeProvider>
    </>
  );
}

const Background = styled.div<{ $bg: string }>`
  position: fixed;
  inset: 0;
  z-index: -1;
  background: url(${({ $bg }) => $bg}) center / cover no-repeat;
`;

const Dots = styled.div`
  position: fixed;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);

  display: flex;
  flex-direction: column;
  gap: 12px;
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
