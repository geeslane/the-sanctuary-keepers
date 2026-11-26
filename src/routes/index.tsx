import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bird, Flame, HandHeart, Heart, Shield, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMinistryData } from "@/components/ArticleDataProvider";
import {
  ArticleCard, CommitteeCard, CTABand, EmptyState, MinistryImage, ObjectiveCard,
  PostSkeletons, ScriptureBlock, SectionBand, SectionTitle,
} from "@/components/MinistryUI";
import { images } from "@/config/images";
import { APPLICATION_FORM_URL } from "@/config/site";
import {
  aboutParagraphs, committees, matthewVerse, missionText, objectiveIcons, objectives, romanNumerals, visionText,
} from "@/lib/ministry-content";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => pageMeta(
    "Home",
    "We support Christian elects and re-disciple backsliders in accordance with Christ's love and biblical principles.",
  ),
  component: HomePage,
});

const values = [
  { label: "Holiness", icon: Flame },
  { label: "Love", icon: Heart },
  { label: "Humility", icon: Bird },
  { label: "Restoration", icon: Sprout },
];

function HomePage() {
  const { articles, loading } = useMinistryData();
  const latest = articles.slice(0, 3);

  return (
    <div className="page-enter">
      <section
        className="hero"
        style={{ ["--hero-photo" as string]: `url("${images.hero}")` }}
      >
        <div className="container hero-content">
          <p className="hero-kicker">Our Vision</p>
          <h1>We support Christian elects and re-disciple backsliders in accordance with Christ's love and biblical principles.</h1>
          <div className="hero-actions">
            <Button asChild size="lg"><Link to="/membership">Become a Member</Link></Button>
            <Button asChild size="lg" variant="outline" className="hero-secondary"><Link to="/about">Our Story</Link></Button>
          </div>
        </div>
        <img className="hero-mark" src="/favicon.png" alt="" />
      </section>

      <ScriptureBlock reference="Matthew 16:18 (NKJV)">{matthewVerse}</ScriptureBlock>

      <SectionBand>
        <div className="story-grid">
          <div className="story-image">
            <MinistryImage name="whoWeAre" />
          </div>
          <div className="story-copy">
            <SectionTitle centered={false}>Who We Are</SectionTitle>
            {aboutParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <Button asChild><Link to="/about">Read More <ArrowRight size={16} /></Link></Button>
          </div>
        </div>
      </SectionBand>

      <SectionBand className="band-lavender">
        <SectionTitle>Vision & Mission</SectionTitle>
        <div className="vision-cards">
          <article className="vision-card">
            <span className="vision-card-icon"><Shield size={22} strokeWidth={1.55} /></span>
            <h3>Vision</h3>
            <p>{visionText}</p>
          </article>
          <article className="vision-card">
            <span className="vision-card-icon"><Heart size={22} strokeWidth={1.55} /></span>
            <h3>Mission</h3>
            <p>{missionText}</p>
          </article>
        </div>
      </SectionBand>

      <SectionBand>
        <SectionTitle>Our Objectives</SectionTitle>
        <div className="objectives-grid">
          {objectives.map((text, index) => (
            <ObjectiveCard key={romanNumerals[index]} numeral={romanNumerals[index]} text={text} icon={objectiveIcons[index]} />
          ))}
        </div>
        {/* <div className="objectives-action">
          <Button asChild variant="outline"><Link to="/vision-mission" hash="objectives">See All Objectives</Link></Button>
        </div> */}
      </SectionBand>

      <SectionBand className="band-lavender">
        <SectionTitle>Core Values</SectionTitle>
        <div className="values-strip">
          {values.map(({ label, icon: Icon }) => (
            <div className="value-item" key={label}><Icon size={22} strokeWidth={1.55} aria-hidden="true" />{label}</div>
          ))}
        </div>
      </SectionBand>

      <CTABand
        title="Membership is open to the elects who have committed themselves to the purity of sanctuary."
        actions={
          <>
            <Button asChild className="cta-light"><Link to="/membership" hash="requirements">Membership Requirements</Link></Button>
            <Button asChild variant="outline" className="cta-outline">
              <a href={APPLICATION_FORM_URL} target="_blank" rel="noopener noreferrer">Apply Now</a>
            </Button>
          </>
        }
      />

      <SectionBand>
        <SectionTitle>Our Committees</SectionTitle>
        <div className="committee-grid">
          {committees.map((committee) => <CommitteeCard key={committee.slug} committee={committee} />)}
        </div>
      </SectionBand>

      <SectionBand className="band-lavender">
        <SectionTitle>Latest Articles</SectionTitle>
        {loading ? <PostSkeletons /> : latest.length === 0 ? <EmptyState>Articles will be published soon.</EmptyState> : (
          <div className="post-grid">{latest.map((article) => <ArticleCard key={article.id} article={article} />)}</div>
        )}
        <div className="objectives-action">
          <Button asChild variant="outline"><Link to="/articles">View all articles</Link></Button>
        </div>
      </SectionBand>

      <SectionBand>
        <article className="support-card support-card-solo">
          <HandHeart size={26} strokeWidth={1.55} />
          <h2>Get Help</h2>
          <p>You might be struggling to live above sin. There are passionate, Spirit-filled children of God willing to walk with you.</p>
          <Button asChild><Link to="/contact" hash="get-help">Get Connected</Link></Button>
        </article>
      </SectionBand>

      <CTABand
        title="Thank you very much for your interest to support TSK. We appreciate your material and financial support."
        actions={<Button asChild className="cta-light"><Link to="/donate">Support TSK</Link></Button>}
      />
    </div>
  );
}
