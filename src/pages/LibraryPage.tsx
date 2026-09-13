import styled from "styled-components";

interface Props {
  isActive: boolean;
}

export function LibraryPage({ isActive }: Props) {
  return (
    <section className={`page ${isActive ? "active" : ""}`} id="library">
      <LibraryContainer>
        <BookCard className="book-reading">
          <div className="book-category">Reading</div>
          <div className="book-title">
            The
            <br />
            Design
            <br />
            of Everyday
            <br />
            Things
          </div>
          <div className="book-author">DON NORMAN</div>
        </BookCard>
        <BookCard className="book-listening">
          <div className="book-category">Listening</div>
          <div className="book-title">
            A quiet
            <br />
            afternoon.
          </div>
          <div className="book-author">NOW PLAYING</div>
        </BookCard>
      </LibraryContainer>
    </section>
  );
}

const LibraryContainer = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: center;

  @media (max-width: 720px) {
    flex-direction: column;
    gap: 32px;
  }
`;

const BookCard = styled.div`
  width: 185px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 7px 18px 18px 7px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.38), rgba(255, 255, 255, 0.12));
  box-shadow: 12px 22px 50px rgba(70, 55, 70, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &.book-reading {
    height: 270px;
  }

  &.book-listening {
    height: 235px;
    transform: translateY(25px) rotate(4deg);
  }

  .book-category {
    font-size: 9px;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.2em;
  }

  .book-title {
    font-family: "Playfair Display", Georgia, serif;
    font-size: 27px;
    line-height: 1.1;
  }

  .book-author {
    font-size: 10px;
    color: var(--muted);
    letter-spacing: 0.1em;
  }

  @media (max-width: 720px) {
    &.book-listening {
      transform: none;
    }
  }
`;