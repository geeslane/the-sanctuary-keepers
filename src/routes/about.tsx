import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHeader, ScriptureBlock } from "@/components/MinistryUI";
import {
  aboutAlongside, aboutClosing, aboutFamily, aboutHoliness, aboutInspired, aboutNotCondemn,
  aboutParagraphs, aboutRooted, matthewDeclaration, matthewVerse, peterReminder, peterVerse,
} from "@/lib/ministry-content";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => pageMeta("About Us", aboutParagraphs[0]),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="page-enter">
      <PageHeader title="About Us" crumb="About Us" />
      <section className="content-band">
        <div className="container">
          <article className="reading-column article-copy">
          <h2>The Sanctuary Keepers</h2>
          <blockquote className="pull-quote article-lead">{aboutParagraphs[0]}</blockquote>
          <p>{aboutParagraphs[1]}</p>
          <p>{aboutParagraphs[2]}</p>
          <p>{matthewDeclaration}</p>
          <ScriptureBlock reference="Matthew 16:18 (NKJV)">{matthewVerse}</ScriptureBlock>
          <p>{aboutInspired}</p>
          <div className="timeline-strip">
            <div className="timeline-item"><span className="timeline-dot" />May 2022: Conceived</div>
            <div className="timeline-item"><span className="timeline-dot" />November 2022: Registered</div>
          </div>
          <p>{aboutAlongside}</p>
          <p>{aboutRooted}</p>
          <p>{aboutNotCondemn}</p>
          <p>{aboutFamily}</p>
          <p>{aboutHoliness}</p>
          <p>{peterReminder}</p>
          <ScriptureBlock reference="1 Peter 1:16 (NKJV)">{peterVerse}</ScriptureBlock>
          <p>{aboutClosing}</p>
          <div className="article-cta">
            <Button asChild><Link to="/membership">Become a Member</Link></Button>
            <Button asChild variant="outline"><Link to="/contact">Contact Us</Link></Button>
          </div>
          </article>
        </div>
      </section>
    </div>
  );
}
