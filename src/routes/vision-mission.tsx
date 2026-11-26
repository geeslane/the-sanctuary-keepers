import { createFileRoute } from "@tanstack/react-router";
import { Heart, Shield } from "lucide-react";
import { ObjectiveCard, PageHeader } from "@/components/MinistryUI";
import { missionText, objectives, romanNumerals, visionText } from "@/lib/ministry-content";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/vision-mission")({
  head: () => pageMeta("Vision, Mission & Objectives", visionText),
  component: VisionPage,
});

function VisionPage() {
  return (
    <div className="page-enter">
      <PageHeader title="Vision, Mission & Objectives" />
      <nav className="in-page-nav" aria-label="On this page">
        <a href="#vision">Vision</a>
        <a href="#mission">Mission</a>
        <a href="#objectives">Objectives</a>
      </nav>
      <div className="container">
        <section className="content-section" id="vision">
          <h2>Vision</h2>
          <article className="vision-card">
            <span className="vision-card-icon"><Shield size={22} strokeWidth={1.55} /></span>
            <p>{visionText}</p>
          </article>
        </section>
        <section className="content-section" id="mission">
          <h2>Mission</h2>
          <article className="vision-card">
            <span className="vision-card-icon"><Heart size={22} strokeWidth={1.55} /></span>
            <p>{missionText}</p>
          </article>
        </section>
        <section className="content-section" id="objectives">
          <h2>Objectives</h2>
          <div className="objectives-stack">
            {objectives.map((text, index) => (
              <ObjectiveCard key={romanNumerals[index]} numeral={romanNumerals[index]} text={text} open />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
