import styled from "styled-components";

interface Props {
  isActive: boolean;
}

export function LibraryPage({ isActive }: Props) {
  return (
    <section className={`page ${isActive ? "active" : ""}`} id="library">
      <LibraryContainer>
        <ReadingBookCard>
          <BookCategory>Reading</BookCategory>
          <BookTitle>
            The
            <br />
            Design
            <br />
            of Everyday
            <br />
            Things
          </BookTitle>
          <BookAuthor>DON NORMAN</BookAuthor>
        </ReadingBookCard>
        <ListeningBookCard>
          <BookCategory>Listening</BookCategory>
          <BookTitle>
            A quiet
            <br />
            afternoon.
          </BookTitle>
          <BookAuthor>NOW PLAYING</BookAuthor>
        </ListeningBookCard>
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
`;

const ReadingBookCard = styled(BookCard)`
  height: 270px;
`;

const ListeningBookCard = styled(BookCard)`
  height: 235px;
  transform: translateY(25px) rotate(4deg);

  @media (max-width: 720px) {
    transform: none;
  }
`;

const BookCategory = styled.div`
  font-size: 9px;
  color: ${({ theme }) => theme.muted};
  text-transform: uppercase;
  letter-spacing: 0.2em;
`;

const BookTitle = styled.div`
  font-family: "Playfair Display", Georgia, serif;
  font-size: 27px;
  line-height: 1.1;
`;

const BookAuthor = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.muted};
  letter-spacing: 0.1em;
`;