import { ContentPage, Description, Digest, EditorialGrid, Eyebrow, Feature, PageBody, PageHeader, PageTitle, Prose, Sidebar, Tags } from "../components/ui/PageLayout";
import { notesContent } from "../config/notesContent";

export function NotesPage({ isActive }: { isActive: boolean }) {
  const { featured, notes } = notesContent;
  return (
    <ContentPage className={`page ${isActive ? "active" : ""}`} id="notes" inert={!isActive} aria-hidden={!isActive}>
      <PageBody>
        <PageHeader>
          <Eyebrow>Notes / Selected thoughts</Eyebrow>
          <PageTitle>{notesContent.title}</PageTitle>
          <Description>{notesContent.description}</Description>
        </PageHeader>
        <EditorialGrid>
          <Feature>
            <Eyebrow>{featured.label} · {featured.category}</Eyebrow>
            <h2>{featured.title}</h2>
            <Prose>{featured.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}<p className="compact">{featured.summary}</p></Prose>
            <Tags aria-label="精选笔记标签">{featured.tags.map(tag => <li key={tag}>{tag}</li>)}</Tags>
          </Feature>
          <Sidebar aria-label="精选随记">
            {notes.slice(0, 3).map((note, index) => (
              <Digest key={note.id}>
                <Eyebrow>0{index + 1} / {note.category}</Eyebrow>
                <h3>{note.title}</h3>
                <p>{note.summary}</p>
              </Digest>
            ))}
          </Sidebar>
        </EditorialGrid>
      </PageBody>
    </ContentPage>
  );
}
