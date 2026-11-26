import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/MinistryUI";
import { APPLICATION_FORM_URL } from "@/config/site";
import { applicationIntro, membershipRequirements, romanNumerals } from "@/lib/ministry-content";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/membership")({
  head: () => pageMeta("Membership", membershipRequirements[0]),
  component: MembershipPage,
});

function MembershipPage() {
  return (
    <div className="page-enter">
      <PageHeader title="Membership" />
      <nav className="in-page-nav" aria-label="On this page">
        <a href="#requirements">Requirements</a>
        <a href="#application">Mode of Application</a>
      </nav>
      <div className="container">
        <section className="content-section" id="requirements">
          <h2>Membership Requirements</h2>
          <ol className="roman-list">
            {membershipRequirements.map((item, index) => (
              <li key={romanNumerals[index]}><span>{romanNumerals[index]}</span><p>{item}</p></li>
            ))}
          </ol>
        </section>
        <section className="content-section" id="application">
          <h2>Mode of Application</h2>
          <p>{applicationIntro}</p>
          <div className="article-cta">
            <Button asChild size="lg">
              <a href={APPLICATION_FORM_URL} target="_blank" rel="noopener noreferrer">Fill the Application Form</a>
            </Button>
          </div>
          {/* <p><a className="inline-link" href={APPLICATION_FORM_URL} target="_blank" rel="noopener noreferrer">bit.ly/TSKApplicationForm1</a></p> */}
        </section>
      </div>
    </div>
  );
}
