import { createFileRoute } from "@tanstack/react-router";
import { Facebook, Instagram, Phone, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MinistryImage, PageHeader } from "@/components/MinistryUI";
import { FACEBOOK_URL, GET_HELP_LINK, INSTAGRAM_URL, PHONE, SITE_NAME, WHATSAPP_URL, YOUTUBE_URL } from "@/config/site";
import { helpParagraphs } from "@/lib/ministry-content";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => pageMeta("Contact Us", `Contact ${SITE_NAME} by phone, WhatsApp, Facebook, Instagram, and YouTube.`),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="page-enter">
      <PageHeader title="Contact Us" />
      <section className="content-band">
        <div className="container">
          <article className="contact-lead">
            <h2>Phone</h2>
            <a className="contact-phone" href={`tel:${PHONE}`}>{PHONE}</a>
            <p>Also on WhatsApp</p>
            <div className="contact-actions">
              <Button asChild size="lg"><a href={`tel:${PHONE}`}>Call</a></Button>
              <Button asChild size="lg" className="donate-button"><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp</a></Button>
            </div>
            <div className="contact-socials">
              <Button asChild variant="outline"><a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer"><Facebook size={16} /> Facebook</a></Button>
              <Button asChild variant="outline"><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"><Instagram size={16} /> Instagram</a></Button>
              <Button asChild variant="outline"><a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer"><Youtube size={16} /> YouTube</a></Button>
            </div>
          </article>
        </div>
      </section>

      <section className="content-band band-lavender contact-anchor" id="get-help">
        <div className="container image-copy-grid">
          <MinistryImage name="help" />
          <div className="help-copy article-copy">
            <h2>Get Help</h2>
            <p>
              {helpParagraphs.opening}{" "}
              <span className="verse-mark">{helpParagraphs.romansVerse}.</span>{" "}
              {helpParagraphs.romansRest}
            </p>
            <p>
              {helpParagraphs.solutionLead}
              <span className="verse-mark">{helpParagraphs.galatiansVerse}</span>
              {helpParagraphs.solutionRest}
            </p>
            <Button asChild size="lg">
              <a href={GET_HELP_LINK} target="_blank" rel="noopener noreferrer">Get Connected</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
