import styled from "styled-components";
import { SpaceCenter, Ring, RingText } from "../components/ui/SharedStyles";

interface Props {
  isActive: boolean;
}

export function NotesPage({ isActive }: Props) {
  return (
    <section className={`page ${isActive ? "active" : ""}`} id="notes">
      <NotesContainer>
        <QuickCard>
          <CardCategory>Quick Notes</CardCategory>
        </QuickCard>
        <TasksCard>
          <CardCategory>Tasks</CardCategory>
        </TasksCard>
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

  .ring-center {
    z-index: 1;
  }

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-top: 60px;
    padding-bottom: 80px;
    overflow-y: auto;

    .ring-center {
      order: -1;
      margin-bottom: 12px;
    }
  }
`;

const FloatingCard = styled.div`
  border: 1px solid ${({ theme }) => theme.line};
  background: rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.5);
  border-radius: 24px;
  padding: 24px;
  color: ${({ theme }) => theme.ink};
`;

const QuickCard = styled(FloatingCard)`
  position: absolute;
  left: 10%;
  top: 15%;
  width: 300px;
  transform: rotate(-2deg);

  @media (max-width: 900px) {
    position: relative;
    left: auto;
    top: auto;
    transform: none;
    width: 100%;
    max-width: 400px;
  }
`;

const TasksCard = styled(FloatingCard)`
  position: absolute;
  right: 10%;
  bottom: 15%;
  width: 350px;
  transform: rotate(1deg);

  @media (max-width: 900px) {
    position: relative;
    right: auto;
    bottom: auto;
    transform: none;
    width: 100%;
    max-width: 400px;
  }
`;

const CardCategory = styled.div`
  font-size: 9px;
  color: ${({ theme }) => theme.muted};
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: 10px;
`;
