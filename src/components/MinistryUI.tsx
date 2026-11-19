import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowDown, ArrowRight, Bird, BookOpen, ChevronDown, Church, Cross, Facebook,
  Flame, HandHeart, Heart, Mail, Menu, Music2, Phone, Shield, Sprout, Users,
  X, type LucideIcon,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { images, imageAlt } from "@/config/images";
import { EMAIL, FACEBOOK_URL, PHONE, PRESIDENT_NAME, SITE_NAME, SITE_SHORT, TAGLINE, WHATSAPP_URL } from "@/config/site";
import type { Article, TeamMember } from "@/components/ArticleDataProvider";

const menu = [
  { label: "Home", to: "/" as const },
  { label: "About Us", children: [{ label: "Our Story", to: "/about" as const }, { label: "Vision, Mission & Objectives", to: "/vision-mission" as const }] },
  { label: "Management", to: "/management" as const },
  { label: "Membership", children: [{ label: "Requirements", to: "/membership#requirements" as const }, { label: "Mode of Application", to: "/membership#application" as const }, { label: "Membership Development", to: "/membership#development" as const }] },
  { label: "Committees", to: "/committees" as const },
  { label: "Gospel", to: "/gospel" as const },
  { label: "Articles", to: "/articles" as const },
  { label: "More", children: [{ label: "Report an Issue", to: "/report-an-issue" as const }, { label: "Get Help", to: "/get-help" as const }, { label: "Contact", to: "/contact" as const }] },
] as const;

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <Link to="/" className={`brand group inline-flex items-center gap-2.5 ${footer ? "brand-footer" : ""}`} aria-label={`${SITE_NAME} home`}>
      <span className="brand-seal" aria-hidden="true"><Cross size={21} strokeWidth={1.55} /></span>
      <span className="brand-copy"><span className="brand-name">{SITE_NAME}</span><span className="brand-tagline">{TAGLINE}</span></span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {menu.map((item) => item.children ? (
            <div className="nav-dropdown" key={item.label}>
              <button className="nav-link" type="button">{item.label}<ChevronDown size={14} /></button>
              <div className="dropdown-panel">{item.children.map((child) => <Link key={child.to} to={child.to} className="dropdown-link">{child.label}</Link>)}</div>
            </div>
          ) : <Link key={item.to} to={item.to} className="nav-link">{item.label}</Link>)}
        </nav>
        <div className="header-actions">
          <Button asChild className="donate-button hidden sm:inline-flex"><Link to="/donate">Donate <Heart size={15} /></Link></Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild><Button variant="outline" size="icon" className="mobile-menu-button lg:hidden" aria-label="Open navigation menu"><Menu /></Button></SheetTrigger>
            <SheetContent side="right" className="mobile-drawer">
              <div className="drawer-heading"><SheetTitle><Brand /></SheetTitle></div>
              <nav className="mobile-nav" aria-label="Mobile navigation">
                {menu.map((item, index) => item.children ? (
                  <Accordion key={item.label} type="single" collapsible>
                    <AccordionItem value={item.label} className="mobile-accordion-item">
                      <AccordionTrigger>{item.label}</AccordionTrigger>
                      <AccordionContent><div className="mobile-subnav">{item.children.map((child) => <Link key={child.to} to={child.to} onClick={() => setOpen(false)}>{child.label}</Link>)}</div></AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="mobile-nav-link">{item.label}</Link>)}
                <Button asChild className="donate-button drawer-donate"><Link to="/donate" onClick={() => setOpen(false)}>Donate <Heart size={15} /></Link></Button>
              </nav>
              <p className="drawer-caption">{SITE_SHORT} · {TAGLINE}</p>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand-column"><Brand footer /><p>We support Christian elects and re-disciple backsliders in accordance with Christ's love and biblical principles.</p><a className="footer-social" href={FACEBOOK_URL} target="_blank" rel="noreferrer" aria-label="Visit The Sanctuary Keepers on Facebook"><Facebook size={17} /></a></div>
        <div className="footer-column"><h2>Quick Links</h2><Link to="/about">Our Story</Link><Link to="/vision-mission">Vision, Mission & Objectives</Link><Link to="/membership">Membership</Link><Link to="/articles">Articles</Link><Link to="/contact">Contact Us</Link></div>
        <div className="footer-column"><h2>Committees</h2><Link to="/committees#membership-committee">Membership Committee</Link><Link to="/committees#media-and-editorial-service-committee">Media and Editorial Service</Link><Link to="/committees#christian-aid-service-committee">Christian Aid Service</Link><Link to="/committees#christian-mediation-committee">Christian Mediation</Link><Link to="/committees#disciplinary-committee">Disciplinary Committee</Link></div>
        <div className="footer-column footer-contact"><h2>Contact</h2><a href={`tel:${PHONE}`}>{PHONE}</a><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">WhatsApp</a><a href={`mailto:${EMAIL}`}>{EMAIL}</a><p className="footer-scripture">“Be holy, for I am holy.”<br /><span>1 Peter 1:16 (NKJV)</span></p><Link to="/admin" className="admin-link">Admin</Link></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</span><span>{TAGLINE}</span></div>
    </footer>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const update = () => setShowTop(window.scrollY > 600);
    update(); window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <><SiteHeader /><main id="main-content">{children}</main><SiteFooter />
    <a className="floating-whatsapp" href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Chat with The Sanctuary Keepers on WhatsApp"><Phone size={20} /><span>WhatsApp</span></a>
    {showTop && <button className="back-to-top" type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><ArrowDown size={18} /></button>}
  </>;
}

export function CrossDivider() { return <div className="cross-divider" aria-hidden="true"><span /><Cross size={14} strokeWidth={1.7} /><span /></div>; }
export function SectionTitle({ eyebrow, children, centered = true }: { eyebrow?: string; children: ReactNode; centered?: boolean }) { return <div className={`section-title ${centered ? "text-center" : ""}`}>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2>{children}</h2><CrossDivider /></div>; }

export function PageHeader({ title, crumb }: { title: string; crumb?: string }) {
  return <section className="page-header"><div className="page-header-motif" aria-hidden="true">✝</div><div className="container page-header-inner"><nav aria-label="Breadcrumb" className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>{crumb ?? title}</span></nav><p className="page-header-kicker">The Sanctuary Keepers</p><h1>{title}</h1></div></section>;
}

export function ScriptureBlock({ children, reference, compact = false }: { children: ReactNode; reference?: string; compact?: boolean }) { return <blockquote className={`scripture-block ${compact ? "scripture-compact" : ""}`}><Cross className="scripture-cross" size={18} /><p>{children}</p>{reference && <cite>{reference}</cite>}</blockquote>; }

export function SectionBand({ children, className = "" }: { children: ReactNode; className?: string }) { return <section className={`content-band ${className}`}><div className="container">{children}</div></section>; }

const iconMap: Record<string, LucideIcon> = { users: Users, book: BookOpen, hands: HandHeart, heart: Heart, shield: Shield, church: Church, flame: Flame, bird: Bird, sprout: Sprout, music: Music2 };
export function TopicIcon({ name, size = 22 }: { name: string; size?: number }) { const Icon = iconMap[name] ?? Cross; return <Icon size={size} strokeWidth={1.55} aria-hidden="true" />; }

export function ObjectiveCard({ numeral, text, compact = false }: { numeral: string; text: string; compact?: boolean }) { return <article className={`objective-card ${compact ? "objective-card-compact" : ""}`}><span className="objective-number">{numeral}</span><p>{text}</p></article>; }

export function CommitteeCard({ committee }: { committee: (typeof import("@/lib/ministry-content"))["committees"][number] }) {
  return <article className="committee-card" id={committee.slug}><div className="committee-icon"><TopicIcon name={committee.icon} /></div><h2>{committee.title}</h2><p>{committee.summary}</p><Link to="/committees" hash={committee.slug} className="text-link">Explore committee <ArrowRight size={14} /></Link></article>;
}

export function ArticleCard({ article, compact = false }: { article: Article; compact?: boolean }) {
  return <article className={`post-card ${compact ? "post-card-compact" : ""}`}>
    <Link to="/articles/$slug" params={{ slug: article.slug }} className="post-image-link" aria-label={`Read ${article.title}`}>
      {article.cover_image ? <img className="post-image" src={article.cover_image} alt={article.title} loading="lazy" /> : <div className="post-image-placeholder"><BookOpen size={28} /></div>}
      <span className="category-badge">{article.category}</span>
    </Link>
    <div className="post-copy"><p className="post-date">{article.published_at ? new Date(article.published_at).toLocaleDateString("en", { year: "numeric", month: "long", day: "numeric" }) : ""}{article.author ? ` · ${article.author}` : ""}</p>
      <h3><Link to="/articles/$slug" params={{ slug: article.slug }}>{article.title}</Link></h3><p className="post-excerpt">{article.excerpt}</p><Link to="/articles/$slug" params={{ slug: article.slug }} className="text-link">Read more <ArrowRight size={15} /></Link></div>
  </article>;
}

export function PostSkeletons() { return <div className="post-grid">{[0, 1, 2].map((item) => <div className="post-skeleton" key={item}><div /><span /><span /></div>)}</div>; }
export function EmptyState({ children }: { children: ReactNode }) { return <div className="empty-state"><BookOpen size={27} strokeWidth={1.5} /><p>{children}</p></div>; }

export function TeamCard({ member }: { member?: TeamMember }) {
  const name = member?.name ?? PRESIDENT_NAME;
  const initials = name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  return <article className="team-card">{member?.photo_url ? <img src={member.photo_url} alt={name} loading="lazy" className="team-photo" /> : <div className="team-avatar" aria-hidden="true">{initials}</div>}<h2>{name}</h2><p>{member?.position ?? "President"}</p>{member?.bio && <span>{member.bio}</span>}</article>;
}

export function CTABand({ title, children, actions }: { title: string; children?: ReactNode; actions?: ReactNode }) { return <section className="cta-band"><div className="container cta-band-inner"><div><p className="eyebrow">{SITE_SHORT}</p><h2>{title}</h2>{children && <p className="cta-copy">{children}</p>}</div>{actions && <div className="cta-actions">{actions}</div>}</div></section>; }

export function MinistryImage({ name, className = "" }: { name: keyof typeof images; className?: string }) { return <img className={className} src={images[name]} alt={imageAlt[name]} loading="lazy" />; }

export const contactIcons = { Phone, Mail, Facebook, Heart, HandHeart, X, ArrowRight };
