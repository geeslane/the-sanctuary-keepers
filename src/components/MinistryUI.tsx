import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  ArrowDown, ArrowRight, Bird, BookOpen, ChevronDown, Church, Cross, Facebook,
  Flame, HandHeart, Heart, Instagram, Mail, Menu, Music2, Phone, Shield, Sprout, Users,
  X, Youtube, type LucideIcon,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { images, imageAlt } from "@/config/images";
import { APPLICATION_FORM_URL, FACEBOOK_URL, INSTAGRAM_URL, PHONE, PRESIDENT_NAME, SITE_NAME, SITE_SHORT, TAGLINE, WHATSAPP_URL, YOUTUBE_URL } from "@/config/site";
import type { Article, TeamMember } from "@/components/ArticleDataProvider";
const logoSrc = "/favicon.png";

const menu = [
  { label: "Home", to: "/" as const },
  { label: "About Us", children: [{ label: "Our Story", to: "/about" as const }, { label: "Vision, Mission & Objectives", to: "/vision-mission" as const }] },
  { label: "Membership", children: [{ label: "Requirements", to: "/membership" as const, hash: "requirements" }, { label: "Mode of Application", to: "/membership" as const, hash: "application" }, { label: "Committees", to: "/committees" as const }] },
  { label: "Articles", to: "/articles" as const },
  { label: "Contact", to: "/contact" as const },
] as const;

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <Link to="/" className={`brand group inline-flex items-center gap-2.5 ${footer ? "brand-footer" : ""}`} aria-label={`${SITE_NAME} home`}>
      <img className="brand-logo" src={logoSrc} alt="" width={44} height={44} />
      <span className="brand-copy"><span className="brand-name">{SITE_NAME}</span><span className="brand-tagline">{TAGLINE}</span></span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  const active = (to: string) => (to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`));
  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {menu.map((item) => item.children ? (
            <div className="nav-dropdown" key={item.label}>
              <button className={`nav-link${item.children.some((child) => active(child.to)) ? " is-active" : ""}`} type="button" aria-haspopup="true">{item.label}<ChevronDown size={14} /></button>
              <div className="dropdown-panel">{item.children.map((child) => <Link key={child.label} to={child.to} {...("hash" in child ? { hash: child.hash } : {})} className={`dropdown-link${active(child.to) ? " is-active" : ""}`} aria-current={active(child.to) ? "page" : undefined}>{child.label}</Link>)}</div>
            </div>
          ) : <Link key={item.to} to={item.to} className={`nav-link${active(item.to) ? " is-active" : ""}`} aria-current={active(item.to) ? "page" : undefined}>{item.label}</Link>)}
        </nav>
        <div className="header-actions">
          <Button asChild variant="outline" className="hidden sm:inline-flex"><a href={APPLICATION_FORM_URL} target="_blank" rel="noopener noreferrer">Join Us</a></Button>
          <Button asChild className="donate-button hidden sm:inline-flex"><Link to="/donate">Donate <Heart size={15} /></Link></Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild><Button variant="outline" size="icon" className="mobile-menu-button lg:hidden" aria-label="Open navigation menu"><Menu /></Button></SheetTrigger>
            <SheetContent side="right" className="mobile-drawer">
              <div className="drawer-heading"><SheetTitle><Brand /></SheetTitle></div>
              <nav className="mobile-nav" aria-label="Mobile navigation">
                {menu.map((item) => item.children ? (
                    <Accordion key={item.label} type="single" collapsible>
                    <AccordionItem value={item.label} className="mobile-accordion-item">
                      <AccordionTrigger>{item.label}</AccordionTrigger>
                      <AccordionContent><div className="mobile-subnav">{item.children.map((child) => <Link key={child.label} to={child.to} {...("hash" in child ? { hash: child.hash } : {})} onClick={() => setOpen(false)}>{child.label}</Link>)}</div></AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="mobile-nav-link">{item.label}</Link>)}
                <Button asChild variant="outline" className="drawer-donate"><a href={APPLICATION_FORM_URL} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Join Us</a></Button>
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
        <div className="footer-brand-column">
          <Brand footer />
          <p>We support Christian elects and re-disciple backsliders in accordance with Christ's love and biblical principles.</p>
          <div className="footer-socials">
            <a className="footer-social" href={FACEBOOK_URL} target="_blank" rel="noreferrer" aria-label="Visit The Sanctuary Keepers on Facebook"><Facebook size={17} /></a>
            <a className="footer-social" href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Visit The Sanctuary Keepers on Instagram"><Instagram size={17} /></a>
            <a className="footer-social" href={YOUTUBE_URL} target="_blank" rel="noreferrer" aria-label="Visit The Sanctuary Keepers on YouTube"><Youtube size={17} /></a>
          </div>
        </div>
        <div className="footer-column"><h2>Quick Links</h2><Link to="/about">Our Story</Link><Link to="/vision-mission">Vision, Mission & Objectives</Link><Link to="/membership">Membership</Link><Link to="/articles">Articles</Link><Link to="/contact">Contact Us</Link></div>
        <div className="footer-column"><h2>Committees</h2><Link to="/committees" hash="membership-committee">Membership Committee</Link><Link to="/committees" hash="media-and-editorial-service-committee">Media and Editorial Service</Link><Link to="/committees" hash="christian-aid-service-committee">Christian Aid Service</Link><Link to="/committees" hash="christian-mediation-committee">Christian Mediation</Link><Link to="/committees" hash="disciplinary-committee">Disciplinary Committee</Link></div>
        <div className="footer-column footer-contact"><h2>Contact</h2><a href={`tel:${PHONE}`}>{PHONE}</a><p className="footer-scripture">“Be holy, for I am holy.”<br /><span>1 Peter 1:16 (NKJV)</span></p><Link to="/admin" className="admin-link">Admin</Link></div>
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
    <a className="floating-whatsapp" href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Chat with The Sanctuary Keepers on WhatsApp"><WhatsAppIcon /></a>
    {showTop && <button className="back-to-top" type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><ArrowDown size={18} /></button>}
  </>;
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M20.52 3.48A11.8 11.8 0 0 0 12.06 0C5.5 0 .16 5.33.16 11.89c0 2.1.55 4.15 1.59 5.96L0 24l6.3-1.65a11.9 11.9 0 0 0 5.76 1.47h.01c6.55 0 11.89-5.33 11.89-11.89 0-3.18-1.24-6.16-3.44-8.45ZM12.07 21.3h-.01a9.9 9.9 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.64-.24-.38a9.86 9.86 0 0 1-1.51-5.27c0-5.46 4.45-9.9 9.92-9.9 2.65 0 5.14 1.03 7.01 2.9a9.84 9.84 0 0 1 2.9 7.01c0 5.46-4.45 9.89-9.94 9.89Zm5.44-7.41c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.3-.02-.46.13-.6.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
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

export function ObjectiveCard({ numeral, text, icon, open = false }: { numeral: string; text: string; icon?: string; open?: boolean }) {
  return <article className={`objective-card${open ? " objective-card-open" : ""}`}>{icon && <span className="committee-icon"><TopicIcon name={icon} size={18} /></span>}<span className="objective-number">{numeral}</span><p>{text}</p></article>;
}

export function CommitteeCard({ committee }: { committee: (typeof import("@/lib/ministry-content"))["committees"][number] }) {
  return <article className="committee-card" id={committee.slug}><div className="committee-icon"><TopicIcon name={committee.icon} /></div><h2>{committee.title}</h2><p>{committee.summary}</p><Link to="/committees" hash={committee.slug} className="text-link">Explore committee <ArrowRight size={14} /></Link></article>;
}

export function ArticleCard({ article, readingTime, authorLabel, action = "Read more" }: { article: Article; readingTime?: string; authorLabel?: string; action?: string }) {
  const author = authorLabel ?? article.author;
  return <article className="post-card">
    <Link to="/articles/$slug" params={{ slug: article.slug }} className="post-image-link">
      {article.cover_image ? <img className="post-image" src={article.cover_image} alt={article.title} loading="lazy" /> : <div className="post-image-placeholder"><BookOpen size={28} /></div>}
      <span className="category-badge">{article.category}</span>
    </Link>
    <div className="post-copy"><p className="post-date">{article.published_at ? new Date(article.published_at).toLocaleDateString("en", { year: "numeric", month: "long", day: "numeric" }) : ""}{author ? ` · ${author}` : ""}{readingTime ? ` · ${readingTime}` : ""}</p>
      <h3><Link to="/articles/$slug" params={{ slug: article.slug }}>{article.title}</Link></h3><p className="post-excerpt">{article.excerpt}</p><Link to="/articles/$slug" params={{ slug: article.slug }} className="text-link">{action} <ArrowRight size={15} /></Link></div>
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
