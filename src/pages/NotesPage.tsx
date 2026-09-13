import styled from "styled-components";
import { SpaceCenter, Ring, RingText } from "../components/ui/SharedStyles";

interface Props {
  isActive: boolean;
}

export function NotesPage({ isActive }: Props) {
  return (
    <section className={`page ${isActive ? "active" : ""}`} id="notes">
      <NotesContainer>
        <FloatingCard className="card-quick">
          <div
            style={{
              fontSize: "9px",
              color: "var(--muted)",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              marginBottom: "10px",
            }}
          >
            Quick Notes
          </div>
        </FloatingCard>
        <FloatingCard className="card-tasks">
          <div
            style={{
              fontSize: "9px",
              color: "var(--muted)",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              marginBottom: "10px",
            }}
          >
            Tasks
          </div>
        </FloatingCard>
        <SpaceCenter className="ring-center">
          <Ring>
            <RingText>Notes</RingText>
          </Ring>
          <p>Memory / fragments / tasks</p>
        </SpaceCenter>
      </NotesContainer>
    </section>
  );
}

const NotesContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;

  .card-quick {
    left: 10%;
    top: 15%;
    width: 300px;
    transform: rotate(-2deg);
  }
  .card-tasks {
    right: 10%;
    bottom: 15%;
    width: 350px;
    transform: rotate(1deg);
  }

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-top: 60px;
    padding-bottom: 80px;
    overflow-y: auto;

    .card-quick,
    .card-tasks {
      position: relative;
      left: auto;
      right: auto;
      top: auto;
      bottom: auto;
      transform: none;
      width: 100%;
      max-width: 400px;
    }

    .ring-center {
      order: -1;
      margin-bottom: 12px;
    }
  }
`;

const FloatingCard = styled.div`
  position: absolute;
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.5);
  border-radius: 24px;
  padding: 24px;
  color: var(--ink);
`;
