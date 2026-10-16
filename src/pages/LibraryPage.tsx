import styled from "styled-components";
import { ContentPage, Description, Digest, EditorialGrid, Eyebrow, PageBody, PageHeader, PageTitle, Sidebar } from "../components/ui/PageLayout";
import { libraryContent } from "../config/libraryContent";

export function LibraryPage({ isActive }: { isActive: boolean }) {
  return (
    <ContentPage className={`page ${isActive ? "active" : ""}`} id="library" inert={!isActive} aria-hidden={!isActive}>
      <PageBody>
        <PageHeader>
          <Eyebrow>Library / Selected collection</Eyebrow>
          <PageTitle>{libraryContent.title}</PageTitle>
          <Description>{libraryContent.description}</Description>
        </PageHeader>
        <CollectionGrid>
          <BookGrid aria-label="精选书籍">
            {libraryContent.books.slice(0, 3).map((book, index) => <Book key={book.id}>
              <Cover $color={book.color} $ink={book.ink} aria-hidden="true">
                <span>0{index + 1} / Selected</span>
                <CoverTitle>{book.originalTitle}</CoverTitle>
                <ShortCoverTitle>{book.title}</ShortCoverTitle>
                <Motif $arch={book.motif === "arch"} />
                <CoverFooter>{book.category}</CoverFooter>
              </Cover>
              <BookText><h2>{book.title}</h2><Author>{book.author}</Author><BookNote>{book.summary}</BookNote></BookText>
            </Book>)}
          </BookGrid>
          <MediaSidebar aria-label="精选影乐">
            {libraryContent.media.slice(0, 2).map(item => <Digest key={item.id}>
              <Eyebrow>{item.category}</Eyebrow><h3>{item.title}</h3><p>{item.subtitle}</p><MediaNote>{item.note}</MediaNote>
            </Digest>)}
          </MediaSidebar>
        </CollectionGrid>
      </PageBody>
    </ContentPage>
  );
}
const CollectionGrid = styled(EditorialGrid)`align-items: stretch; @media (max-width: 720px) { align-content: center; }`;
const BookGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(14px, 2vw, 28px);
  min-height: 0;
  @media (max-width: 720px) { grid-template-columns: minmax(0, 1fr); }
`;
const Book = styled.article`
  min-width: 0;
  min-height: 0;
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  gap: 20px;
  @media (max-width: 720px) {
    &:nth-child(n+2) { display: none; }
    grid-template-columns: 90px minmax(0, 1fr);
    grid-template-rows: auto;
    gap: 16px;
    align-items: center;
  }
  @container editorial (height < 320px) { gap: 10px; }
`;
const Cover = styled.div<{ $color: string; $ink: string }>`
  position: relative;
  min-height: 0;
  max-height: 360px;
  padding: clamp(16px, 2vw, 26px);
  border-radius: 2px 7px 7px 2px;
  color: ${({ $ink }) => $ink};
  background: linear-gradient(135deg, rgba(255,255,255,.2), transparent), ${({ $color }) => $color};
  box-shadow: inset 5px 0 0 rgba(255,255,255,.14), 6px 10px 22px rgba(0,0,0,.1);
  display: flex;
  flex-direction: column;
  > span { font-size: 8px; letter-spacing: .1em; }
  @media (max-width: 720px) { height: 150px; padding: 12px; > span { font-size: 7px; } }
`;
const CoverTitle = styled.p`
  position: relative;
  z-index: 1;
  font-family: "Playfair Display", Georgia, serif;
  font-size: clamp(18px, 2vw, 29px);
  line-height: 1.2;
  white-space: pre-line;
  margin-top: 22px;
  @media (max-width: 720px) { font-size: 16px; margin-top: 15px; }
  @container editorial (height < 320px) { font-size: 16px; margin-top: 10px; }
  @container editorial (height < 320px) { display: none; }
`;
const Motif = styled.div<{ $arch: boolean }>`
  position: absolute;
  right: 15%;
  bottom: 15%;
  width: 45%;
  aspect-ratio: 1;
  border: 1px solid currentColor;
  border-radius: ${({ $arch }) => $arch ? "50% 50% 0 0" : "50%"};
  opacity: .25;
  &::after { content: ""; position: absolute; inset: 15%; border: 1px solid currentColor; border-radius: inherit; }
  @media (max-width: 720px) { display: none; }
  @container editorial (height < 320px) { display: none; }
`;
const ShortCoverTitle = styled.p`
  display: none;
  @container editorial (height < 320px) { display: block; font-family: "Songti SC", Georgia, serif; font-size: 14px; line-height: 1.6; margin-top: 12px; }
`;
const CoverFooter = styled.p`
  margin-top: auto;
  padding-top: 12px;
  font-size: 7px;
  letter-spacing: .1em;
  text-transform: uppercase;
  @media (max-width: 720px) { display: none; }
  @container editorial (height < 450px) { display: none; }
`;
const BookText = styled.div`
  min-width: 0;
  h2 { font-family: "Songti SC", Georgia, serif; font-size: 19px; line-height: 1.5; font-weight: 400; margin-bottom: 6px; }
  @container editorial (height < 450px) { h2 { font-size: 16px; } }
`;
const Author = styled.p`font-size: 10px; line-height: 1.6; color: ${({ theme }) => theme.muted};`;
const BookNote = styled.p`
  margin-top: 10px;
  font-size: 12px;
  line-height: 1.9;
  color: ${({ theme }) => theme.muted};
  @container editorial (height < 320px) { display: none; }
`;
const MediaSidebar = styled(Sidebar)`
  align-self: center;
  @container editorial (height < 320px) { > article:nth-child(n+2) { display: none; } }
`;
const MediaNote = styled.p`
  margin-top: 14px;
  @media (max-width: 720px) { display: none; }
  @container editorial (height < 450px) { display: none; }
`;
