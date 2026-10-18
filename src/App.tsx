import { useState, useEffect, useCallback, type ComponentType } from "react";
import { HomePage } from "./pages/HomePage";
import { NowPage } from "./pages/NowPage";
import { NavPage } from "./pages/NavPage";
import { NotesPage } from "./pages/NotesPage";
import { LibraryPage } from "./pages/LibraryPage";
import { SpacePage } from "./pages/SpacePage";
import { Sun, Moon, ChevronUp, ChevronDown } from "lucide-react";
import styled, {
  ThemeProvider as StyledThemeProvider,
  createGlobalStyle,
  keyframes,
} from "styled-components";
import { DotButton, DotNav } from "./components/ui/DotButton";
import { GlobalConfig } from "./config/GlobalConfig";
import { MusicProvider } from "./contexts/MusicContext";
import { MusicPlayer } from "./components/MusicPlayer";
import { usePointerActivity } from "./hooks/usePointerActivity";
import { backgroundImage, themes } from "./config/theme";
// 标题
const brand = `${GlobalConfig.siteName.zh} / ${GlobalConfig.siteName.en}`;

// 页面配置表（顺序即切换顺序）
const PAGES = [
  { id: "home", Component: HomePage },
  { id: "now", Component: NowPage },
  { id: "nav", Component: NavPage },
  { id: "notes", Component: NotesPage },
  { id: "library", Component: LibraryPage },
  { id: "moments", Component: SpacePage },
] as const satisfies readonly { id: string; Component: ComponentType<{ isActive: boolean }> }[];

type Page = (typeof PAGES)[number]["id"];

const GlobalBodyStyle = createGlobalStyle`
  body {
    color: ${({ theme }) => theme.ink};
  }
`;

function App() {
  const navigationVisible = usePointerActivity();
  const [activePage, setActivePage] = useState<Page>("home");

  useEffect(() => {
    document.title = `${GlobalConfig.siteName.zh} - ${activePage}`;
  }, [activePage]);

  const changePage = useCallback((direction: number) => {
    setActivePage((current) => {
      const currentIndex = PAGES.findIndex((p) => p.id === current);
      const nextIndex =
        (currentIndex + direction + PAGES.length) % PAGES.length;
      return PAGES[nextIndex].id;
    });
  }, []);
  const goNextPage = () => changePage(1);
  const goPrevPage = () => changePage(-1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.defaultPrevented ||
        e.altKey ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey
      )
        return;
      if (
        e.target instanceof Element &&
        e.target.closest(
          'input, textarea, select, button, a, video, audio, [contenteditable], [role="slider"]',
        )
      )
        return;
      if (["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(e.key)) {
        e.preventDefault();
        changePage(e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [changePage]);

  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem("oblivion-theme");
      if (saved === "dark" || saved === "light") return saved === "dark";
    } catch {
      /* Storage may be unavailable in private browsers. */
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  useEffect(() => {
    document.documentElement.style.colorScheme = darkMode ? "dark" : "light";
    try {
      localStorage.setItem("oblivion-theme", darkMode ? "dark" : "light");
    } catch {
      /* Keep the in-memory preference. */
    }
  }, [darkMode]);

  const combinedTheme = themes[darkMode ? "dark" : "light"];

  return (
    <>
      <Background $bg={backgroundImage} $overlay={combinedTheme.overlay} />
      <AmbientOrb />

      <MusicProvider>
        <StyledThemeProvider theme={combinedTheme}>
          <GlobalBodyStyle />
          <Layout>
            <DotNav
              className={navigationVisible ? "is-visible" : ""}
              $visible={navigationVisible}
              aria-label="Page navigation"
            >
              {PAGES.map(({ id }) => (
                <DotButton
                  key={id}
                  active={activePage === id}
                  onClick={() => setActivePage(id)}
                  ariaLabel={id}
                />
              ))}
            </DotNav>

            <header className="top">
              <div className="brand">{brand}</div>
              <div className="top-right">
                <div className="dark-mode">
                  <button
                    aria-label={darkMode ? "切换浅色主题" : "切换深色主题"}
                    aria-pressed={darkMode}
                    onClick={() => setDarkMode((value) => !value)}
                  >
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
              {PAGES.map(({ id, Component }) => (
                <Component key={id} isActive={activePage === id} />
              ))}
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
              <div>{activePage}</div>
            </div>

            <MusicPlayer className="global-player" />
          </Layout>
        </StyledThemeProvider>
      </MusicProvider>
    </>
  );
}

const Background = styled.div<{ $bg: string; $overlay: string }>`
  position: fixed;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(
      ${({ $overlay }) => $overlay},
      ${({ $overlay }) => $overlay}
    ),
    url(${({ $bg }) => $bg}) center / cover no-repeat;
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

const pulseStatusDot = keyframes`
  0%, 100% {
    opacity: 1;
    box-shadow: 0 0 6px #22c55e, 0 0 12px rgba(34, 197, 94, 0.6);
  }
  50% {
    opacity: 0.75;
    box-shadow: 0 0 3px #22c55e, 0 0 6px rgba(34, 197, 94, 0.35);
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
  width: 100%;
  height: 100dvh;
  min-height: 0;
  z-index: 1;

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
          width: 44px;
          height: 44px;
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
      visibility: hidden;
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
      visibility: visible;
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
    width: 120px;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    color: ${({ theme }) => theme.muted};
    cursor: pointer;
    opacity: 0;
    transform: translateX(-50%);
    transition:
      opacity 0.3s ease,
      color 0.3s ease,
      transform 0.3s ease;

    &:hover,
    &:focus-visible {
      opacity: 1;
      color: ${({ theme }) => theme.ink};
      transform: translateX(-50%) scale(1.1);
    }

    &.prev {
      top: 0;
      padding-top: 12px;
    }
    &.next {
      bottom: 0;
      padding-bottom: 12px;
    }
  }

  /* Cleaned up page specific components */
  /* Bottom Status */
  .bottom-status {
    position: absolute;
    z-index: 10;
    left: 92px;
    bottom: 34px;
    right: 92px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${({ theme }) => theme.muted};
    font-size: 9px;
    letter-spacing: 0.16em;
    text-transform: uppercase;

    > div {
      display: inline-flex;
      align-items: center;
    }
  }
  .status-dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #22c55e;
    box-shadow:
      0 0 6px #22c55e,
      0 0 12px rgba(34, 197, 94, 0.6);
    margin-right: 7px;
    flex-shrink: 0;
    animation: ${pulseStatusDot} 2.5s ease-in-out infinite;
  }

  @media (max-width: 720px) {
    .top {
      left: 58px;
      right: 22px;
      top: 22px;
    }
    .bottom-status {
      left: 58px;
      right: 58px;
      bottom: max(20px, env(safe-area-inset-bottom));
    }
    .pages .page {
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
