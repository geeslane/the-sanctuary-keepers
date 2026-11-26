import { createFileRoute } from "@tanstack/react-router";
import { MinistryImage, PageHeader, ScriptureBlock, TopicIcon } from "@/components/MinistryUI";
import { aidScripture, committees } from "@/lib/ministry-content";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/committees")({
  head: () => pageMeta("Committees", committees[0].intro),
  component: CommitteesPage,
});

function CommitteesPage() {
  return (
    <div className="page-enter">
      <PageHeader title="Committees" />
      <div className="container split-layout content-band">
        <nav className="sticky-list" aria-label="Committees">
          {committees.map((committee) => <a key={committee.slug} href={`#${committee.slug}`}>{committee.title}</a>)}
        </nav>
        <div className="details-column">
          {committees.map((committee) => (
            <article className="committee-detail" id={committee.slug} key={committee.slug}>
              <div className="committee-detail-copy">
                <div className="committee-detail-title">
                  <span className="committee-icon"><TopicIcon name={committee.icon} /></span>
                  <h2>{committee.title}</h2>
                </div>
                <p>{committee.intro}</p>
                {"image" in committee && committee.image ? (
                  <ScriptureBlock compact reference="Matthew 25:40 (NIV)">{aidScripture}</ScriptureBlock>
                ) : null}
                {committee.functions.length > 0 && (
                  <ol className="function-list">
                    {committee.functions.map((item, index) => (
                      <li key={committee.labels[index]}><span>{committee.labels[index]}</span><p>{item}</p></li>
                    ))}
                  </ol>
                )}
              </div>
              {"image" in committee && committee.image ? <MinistryImage name="aid" className="committee-photo" /> : null}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
