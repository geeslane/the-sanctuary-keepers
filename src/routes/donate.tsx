import { createFileRoute } from "@tanstack/react-router";
import { HandHeart, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/MinistryUI";
import { EMAIL, PHONE, PRESIDENT_NAME, WHATSAPP_URL } from "@/config/site";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/donate")({
  head: () => pageMeta("Donate", "Thank you very much for your interest to support TSK."),
  component: DonatePage,
});

function DonatePage() {
  return (
    <div className="page-enter">
      <PageHeader title="Donate" />
      <section className="content-band">
        <div className="container">
          <article className="donate-card">
            <div className="donate-icon"><HandHeart size={28} strokeWidth={1.55} /></div>
            <p>Thank you very much for your interest to support TSK.</p>
            <p>We appreciate your material and financial support</p>
            <p>Kindly contact our President through this email for details of your support</p>
            <h2>{PRESIDENT_NAME}</h2>
            <div className="donate-contact-list">
              <span>Tel no: {PHONE} (Also available on whatsapp)</span>
              <span>Email: {EMAIL}</span>
            </div>
            <div className="contact-actions">
              <Button asChild><a href={`tel:${PHONE}`}><Phone size={16} /> Call</a></Button>
              <Button asChild className="donate-button"><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp</a></Button>
              <Button asChild variant="outline"><a href={`mailto:${EMAIL}`}><Mail size={16} /> Email</a></Button>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
