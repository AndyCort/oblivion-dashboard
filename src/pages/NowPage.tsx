import styled from "styled-components";

import { MusicPlayer } from "../components/MusicPlayer";
import { Weather } from "../components/Weather";

interface Props {
  isActive: boolean;
}

export function NowPage({ isActive }: Props) {
  return (
    <section className={`page ${isActive ? "active" : ""}`} id="now">
      <GlassPanel style={{ width: "min(1200px, 86vw)" }}>
        <div className="eyebrow">Currently</div>
        <h2>Focus & Environment.</h2>
        <p>
          A snapshot of the present moment. Managing tasks, music, and
          environment.
        </p>
        <div
          style={{
            display: "flex",
            gap: "2rem",
            marginTop: "2rem",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <MusicPlayer className="ambient-component" />
          <Weather className="ambient-component" />
        </div>
      </GlassPanel>
    </section>
  );
}

const GlassPanel = styled.div`
  width: min(1000px, 76vw);
  padding: 42px 48px;
  border: 1px solid ${({ theme }) => theme.line};
  border-radius: 34px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.11)
  );
  box-shadow:
    inset 0 1px rgba(255, 255, 255, 0.65),
    0 25px 80px rgba(80, 65, 80, 0.08);
  backdrop-filter: blur(25px) saturate(120%);
  -webkit-backdrop-filter: blur(25px) saturate(120%);
  display: flex;
  flex-direction: column;

  h2 {
    margin: 0 0 18px;
    font-family: "Playfair Display", Georgia, serif;
    font-size: clamp(38px, 5vw, 64px);
    font-weight: 400;
  }
  p {
    margin: 0;
    max-width: 520px;
    color: rgba(40, 37, 42, 0.62);
    line-height: 1.8;
    font-size: 14px;
  @media (max-width: 720px) {
    padding: 24px 20px;
    
    h2 {
      font-size: clamp(32px, 8vw, 42px);
    }
  }
`;
