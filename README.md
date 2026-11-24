# The Sanctuary Keepers

Build a professional, beautiful, reverent, mobile-first multi-page website for "The Sanctuary Keepers (TSK International)", a Christian ministry. Use React + Vite + TypeScript + Tailwind + shadcn/ui + React Router. The look should feel warm, peaceful, trustworthy and unmistakably Christian: calm, spacious, uplifting. Not flashy, not corporate-cold.

IMPORTANT CONTENT RULE
All text in the CONTENT sections below is the client's real copy. Use it VERBATIM. Do not rewrite, shorten, "improve" or correct the wording (including capitalisation, spelling and scripture references). Only layout and styling are yours to design. Keep all external links exactly as given.

=====================================================
1. BRAND & DESIGN SYSTEM
=====================================================
Use the attached logo in the header, footer and as the favicon. Define everything as design tokens (CSS variables in index.css + Tailwind theme). No hard-coded colors in components.

Colors (derived from the logo):
- Primary: royal blue #1636B8 (buttons, links, headings accents, active nav)
- Secondary: violet #9A0FC9 (accents, highlights, badges, hover states, Donate button)
- Deep navy: #0B1B5E (hero overlays, footer, dark sections)
- Ivory background: #FBF9F4 (main page background, gives a warm, gentle feel)
- Soft blue-lavender: #F4F5FC (alternate section background)
- Text: #1F2937, muted text #6B7280, white surfaces
Convert these into HSL tokens for shadcn. Ensure WCAG AA contrast on all text.

Typography:
- Headings: "Playfair Display" (serif, elegant)
- Body/UI: "Inter"
- Article body: "Lora" at 18px / line-height 1.8 for comfortable reading
- Scripture quotes: Playfair Display italic, large, with a thin violet vertical rule or soft quote marks

"Christian" visual language (use tastefully):
- A soft radial "rays of light" gradient behind hero and scripture banners
- A small cross divider (line, cross, line) between major sections
- Gentle rounded cards (rounded-2xl), soft shadows, generous whitespace
- Thin-line icons (lucide-react): BookOpen, Cross-like icons (Plus/Church), Heart, HandHeart, Users, Flame, Dove-like (Bird), Sprout, Music, Shield
- Subtle fade-up on-scroll animations (respect prefers-reduced-motion)
- Scripture banners on a navy-to-blue gradient with the verse in large italic serif

Imagery: use free online photos from Unsplash and Pexels (hotlink the image URLs; do not use broken links, test that every image loads). Themes to search for: open Bible with soft light, church interior with sunlight through windows, hands raised in worship, cross at sunrise or sunset, hymn book and candle, choir singing, community helping hands / food distribution / charity, people praying together, wooden cross on hill, calm sanctuary. Put ALL image URLs in one file src/config/images.ts so they are easy to swap later. Every image needs meaningful alt text, lazy loading, and an object-cover crop.

Site constants: create src/config/site.ts exporting:
- SITE_NAME = "The Sanctuary Keepers"
- SITE_SHORT = "TSK International"
- TAGLINE = "For Kingdom of God"
- PRESIDENT_NAME = "Brother Sunday Okotie"
- PHONE = "+2348032072216"
- WHATSAPP_URL = "https://wa.me/2348032072216"
- EMAIL = "president@tskinternational.org"
- FACEBOOK_URL = "https://www.facebook.com/thesanctuarykeepers/"
- APPLICATION_FORM_URL = "http://bit.ly/TSKApplicationForm1"
- REPORT_ISSUE_URL = "https://bit.ly/tsk-Report-an-issue"
- GET_HELP_URL = "" (the client has not supplied this link yet; while empty, the Get Help button opens WHATSAPP_URL. Add a code comment: "TODO: replace with the Get Help connection link")

=====================================================
2. NAVIGATION & GLOBAL LAYOUT
=====================================================
Sticky header (white/ivory with subtle blur and shadow on scroll): logo on the left, nav, and a violet "Donate" button on the right. Mobile: hamburger opening a full-height slide-in menu with the same items (dropdowns become accordions).

Nav structure:
- Home  (/)
- About Us (dropdown): Our Story (/about), Vision, Mission & Objectives (/vision-mission)
- Management (/management)
- Membership (dropdown): Requirements, Mode of Application, Membership Development (all on /membership with anchor links #requirements, #application, #development)
- Committees (/committees)
- Gospel (/gospel)
- Articles (/articles)
- More (dropdown): Report an Issue (/report-an-issue), Get Help (/get-help), Contact (/contact)
- Donate button (/donate)

Footer (deep navy): logo and tagline "For Kingdom of God"; one-sentence description; quick links; Committees list; contact (phone, WhatsApp, email); Facebook icon link; scripture line "Be holy, for I am holy." 1 Peter 1:16 (NKJV); copyright line "© [current year] The Sanctuary Keepers. All rights reserved."; a very small, discreet "Admin" link in the footer to /admin.

Floating WhatsApp button (bottom-right, all public pages) linking to WHATSAPP_URL. Add a "back to top" button. Add SEO (title, meta description, Open Graph) to every page using react-helmet-async, plus a 404 page, and a shared PageHeader component (navy-blue gradient banner with page title, breadcrumb and a faint cross motif).

=====================================================
3. PAGES AND CONTENT
=====================================================

---- HOME (/) ----
Sections in this order, separated with the small cross divider:

3.1 HERO: full-screen-ish, background photo (open Bible / sanctuary light) with a navy gradient overlay and rays-of-light effect. Small label: "Our Vision". Large headline: "We support Christian elects and re-disciple backsliders in accordance with Christ's love and biblical principles." Two buttons: "Become a Member" (/membership) and "Our Story" (/about). Show the logo mark subtly.

3.2 SCRIPTURE BANNER: "I will build My church, and the gates of Hades shall not prevail against it." Matthew 16:18 (NKJV)

3.3 WHO WE ARE: image on one side, text on the other. Use the first three paragraphs of the About text below, then a "Read Our Story" button to /about.

3.4 VISION & MISSION: two side-by-side cards.
Vision: "To support Christian elects and re-disciple backsliders in accordance with Christ’s love and biblical principles."
Mission: "To promote the Gospel of Christ by teaching scriptural principles, living the gospel, and partnering with relevant organizations"

3.5 OUR OBJECTIVES: grid of 7 numbered cards (i to vii) with an icon each, text clamped to 3 lines with the full text on /vision-mission; button "See All Objectives".

3.6 CORE VALUES STRIP: Holiness · Love · Humility · Restoration (icon + one word each).

3.7 MEMBERSHIP CALL-TO-ACTION BAND (blue-to-violet gradient): "Membership is open to the elects who have committed themselves to the purity of sanctuary." Buttons: "Membership Requirements" (/membership#requirements) and "Apply Now" (external APPLICATION_FORM_URL, new tab).

3.8 OUR COMMITTEES: 5 cards (icon, name, one-line summary taken from the first words of each committee's text), each linking to /committees#slug.

3.9 LATEST ARTICLES: the 3 most recent published posts from the database (cover image, category badge, title, excerpt, date, "Read more"). Button "View all articles". Show skeleton loaders and an empty-state message if no posts.

3.10 REPORT AN ISSUE + GET HELP: two side-by-side cards.
Report an Issue: "Together we can keep the sanctuary. If you see something, please say something." Button to REPORT_ISSUE_URL (new tab).
Get Help: "You might be struggling to live above sin. There are passionate, Spirit-filled children of God willing to walk with you." Button "Get Connected" to /get-help.

3.11 DONATE BAND: "Thank you very much for your interest to support TSK. We appreciate your material and financial support." Button "Support TSK" to /donate.

---- ABOUT US / OUR STORY (/about) ----
PageHeader "About Us". Beautiful long-form layout: narrow reading column (max-w-3xl), first paragraph in larger lead style, the "church na scam" opening as a styled pull-quote, the Matthew 16:18 verse and the 1 Peter 1:16 verse as highlighted scripture blocks, and a small timeline strip: "May 2022: Conceived" then "November 2022: Registered". Text (verbatim):

"The Sanctuary Keepers

Have you ever heard someone say, “I stopped going to church because of the things I saw people doing there”? Or perhaps you've heard the popular expression among young people, “church na scam.”

Sadly, many people have become discouraged by behaviors and practices within the Church that do not reflect the teachings of Jesus Christ. Some have walked away from the faith, while others have gradually accepted sinful practices because they see fellow believers doing the same. The church is not a scam and will never be.

But this was never God's intention for His Church, which Christ purchased with His precious blood.

In Matthew 16:18 (NKJV), Jesus declared, “I will build My church, and the gates of Hades shall not prevail against it.”

Inspired by this promise, The Sanctuary Keepers was conceived in May 2022 and registered in November 2022 as a Christian ministry dedicated to promoting biblical values, encouraging holiness, and restoring godly conduct within the body of Christ.

We work alongside churches, Christian organizations, and fellow believers to uphold Christian ethics, strengthen the faith of God's children, support new converts, and lovingly guide those who have fallen away back to Christ.

Our mission is rooted in Scripture. Just as Jesus cleansed the temple (Matthew 21:12) and the Apostle Paul addressed wrongdoing among believers (1 Corinthians 5:1–13; Galatians 2:11–14), we believe Christians have a responsibility to uphold God's standards. However, we must always do this with love, humility, and gentleness, as instructed in Galatians 6:1.

We are not here to condemn, but to remind ourselves of who we are, encourage spiritual growth, and help one another remain faithful to Christ.

The Sanctuary Keepers is a family of devoted Christian brothers and sisters from around the world, united by a shared desire to live holy lives and encourage others to do the same.

We believe that holiness should not end at the church door. It must be reflected in our words, actions, relationships, and private lives, even when no one is watching.

As Scripture reminds us in 1 Peter 1:16 (NKJV), “Be holy, for I am holy.”

Our teachings and activities are firmly rooted in the Word of God and the gospel of Jesus Christ. Through His grace, we seek to build a community where believers support one another, the fallen find restoration, and the Church reflects the true character of Christ."

End with a CTA: "Become a Member" and "Contact Us".

---- VISION, MISSION & OBJECTIVES (/vision-mission) ----
PageHeader "Vision, Mission & Objectives". Three clearly separated sections with anchors #vision, #mission, #objectives (sticky in-page tab links at the top).

Vision: "To support Christian elects and re-disciple backsliders in accordance with Christ’s love and biblical principles."

Mission: "To promote the Gospel of Christ by teaching scriptural principles, living the gospel, and partnering with relevant organizations"

Objectives (a vertical list of 7 elegant cards, Roman numerals as large violet numerals):
i. To uphold Christian ethics, teachings, and integrity among members and non-members, and to foster the healthy development of Christian values worldwide
ii. To guide and support Christians on moral and scriptural ethical matters, and sustain a public example of probity, equity, good character, peace, and good governance in their individual and collective affairs.
iii. To identify, and re-disciple backsliders in faith to Christ the Lord.
iv. To contribute to the purity of the Sanctuary in every ramification and disciple believers who will exhibit the nature of God and reflect the life of Christ the Savior in every facet of their lives.
v. To promote the gospel of Christ through collaboration with relevant organizations worldwide
vi. To contribute to social, economic, and healthcare support for the vulnerable Christians and non-Christians acceptable within the community contexts
vii. To publish, edit and distribute books, magazines, pamphlets which may help to fulfill the objectives of the organization

---- MANAGEMENT (/management) ----
PageHeader "Management". Grid of team member cards (photo or initials avatar, name, position, optional short bio). Data comes from the database table team_members (see Part 2), ordered by sort_order. Seed one record: name "Brother Sunday Okotie", position "President", no photo (show initials avatar). Add an empty-state message "Management profiles will be published soon." Include a line under the grid: "To reach our President, see the Contact page." (link).

---- MEMBERSHIP (/membership) ----
PageHeader "Membership". Sticky in-page tabs/anchors: Requirements | Mode of Application | Membership Development.

#requirements, "Membership Requirements" (numbered list with Roman numerals, each as a card row):
i. Membership is open to the elects who have committed themselves to the purity of sanctuary.
ii. The membership shall be limited to all elects (the followers of Christ) from any part of the World, who have taken the steps to duly register and are willing to abide with the rules and regulations as enshrined in the Constitution of TSK
iii. Qualified members shall not be less than 18 years of age
iv. A member of TSK must belong to a church or denomination and must be confirmed by the official representative of the Church. Any member of the TSK can as well confirm the suitability of prospective members to join the membership of TSK
v. Both male and female elects (the followers of Christ) are qualified to become members of the Society and shall be called BROTHERS AND SISTERS

#application, "Mode of Application":
"Application for membership shall be made on a prescribed form as approved by the Executive Committee of TSK. It will be obtainable at no cost by filling and completing application form via this link:" followed by a prominent button "Fill the Application Form" linking to http://bit.ly/TSKApplicationForm1 (new tab, rel noopener) and also showing the link text bit.ly/TSKApplicationForm1.

#development, "Membership Development":
"This page is dedicated for training programmes for members to grow them spiritually, socially and economically."
"Trainings will be announced soon" (style as a friendly "Coming soon" notice card with a sprout icon).

---- COMMITTEES (/committees) ----
PageHeader "Committees". An intro-less page: sticky left/top list of the 5 committees (anchors by slug) and one section per committee, each a card with an icon, the title, the text and its numbered/lettered functions styled as a clean list. Text verbatim:

(1) slug membership-committee: "Membership Committee"
"Membership Committee was established to perform the following functions"
i. Scrutinize any intending members for the purpose of admission into the Organisation.
ii. Recommend admission of members to the Organisation
iii. Visit from time to time the Members during their meetings.
iv. Generate and collate ideas on the welfare, growth, and development of Members.
v. Recommend strategies for the development of Members; and
vi. Produce and update database of all members

(2) slug media-and-editorial-service-committee: "Media and Editorial Service Committee"
"The Media and Editorial Service Committee was established to perform the following functions"
i. responsible for the overall quality and quantity of the publications and implements policy decisions approved by Council.
ii. oversee procedures for manuscript submission, acceptance, release, and publication, as well as the criteria for review
iii. Provide content by writing and publishing occasional editorials and other short articles.

(3) slug christian-aid-service-committee: "Christian Aid Service Committee"
"Some scriptures encourage us to care for the poor in the land. For instance, Proverb 19:17, Deuteronomy 15:11, and Leviticus 25:35. Jesus said in Matthew 25:40 NIV that “the king will reply, truly I tell you, whatever you did for one of the least of these brothers and sisters of mine, you did for me” Therefore, the Christian Aid Service Committee was established to perform the following functions"
a. protect and promote the identity and values of the charity
b. to expose poverty throughout the world and help in practical ways to end it.
c. provide social and economic empowerment initiatives for the poor worldwide
d. distribute food, clothing, medicines, mostly to needy orphans and Christian families.
(Feature the Matthew 25:40 quote as a highlighted scripture block and use a charity/helping-hands photo.)

(4) slug christian-mediation-committee: "Christian Mediation Committee"
"The Christian Mediation Committee was established to provide conciliation on disputed matters amongst the members and or that affect the elects which had resulted to dispute. The Committee shall do everything possible within her power and in line with the provisions of the Bible to provide amicable solutions to the disputed matters."

(5) slug disciplinary-committee: "Disciplinary Committee"
"Disciplinary Committee was established"
a) To receive petitions or complaints against members/and officers.
b) To ensure compliance with and where appropriate enforce the provisions of the code of conduct, the memorandum/articles and bye-law of the Organisation for the time being in force.
c) To examine all petitions and recommend to the Council disciplinary measures or sanctions to be imposed on erring members PROVIDED always that the right of a defaulting member to be notified in writing of allegations made against him and the right to be heard in his defense is preserved and guaranteed.
d) To generally exercise disciplinary control over members and officers.
e) To do such other things as may be conferred on it by Council and or the Organization.

---- GOSPEL (/gospel) ----
PageHeader "Hymns and Gospel Songs". Intro with scripture block:
"Ephesians 5:19 says, Speaking to one another with psalms, hymns, and songs from the Spirit. Sing and make music from your heart to the Lord (NKJV). One of the ways God laid in our heart as an organization to bless people’s soul and spirit is through hymns and gospel songs. Listen to hymns and gospel songs here and be blessed."

Section "Listen & Be Blessed": responsive grid of posts from category "Gospel Songs" (each card shows its embedded YouTube video or cover image, title, date). Friendly empty state: "Songs will be added soon."

Section "Hymns and their Stories": grid of published posts from category "Hymns and Their Stories" (cover image, title, author "Admin" if no author set, date, excerpt, "Read More"). These come from the database (seeded in Part 2).

---- ARTICLES (/articles) and ARTICLE PAGE (/articles/:slug) ----
Articles list: PageHeader "Articles". Category filter pills (All + each category), search box, paginated or "Load more" grid of published posts (cover, category badge, title, excerpt, optional author, date). Reading time estimate on each card.
Article page: large cover image, category badge, title (Playfair, large), meta row (optional author with avatar initials, date, reading time), then the article body rendered as sanitized HTML inside a styled "prose" container (install @tailwindcss/typography, customise with the brand: Lora body, Playfair headings, violet blockquote rule, rounded images with captions, responsive YouTube iframes at 16:9). Below: share buttons (WhatsApp, Facebook, copy link), "Related articles" (same category), previous/next. Add per-post SEO and Open Graph image from the cover image. Use DOMPurify to sanitize and allow only <iframe> from youtube-nocookie.com and youtube.com.

---- REPORT AN ISSUE (/report-an-issue) ----
PageHeader "Report an Issue". Large, calm card: "Together we can keep the sanctuary. If you see something, please say something." Button "Report an Issue" linking to https://bit.ly/tsk-Report-an-issue (new tab).

---- GET HELP (/get-help) ----
PageHeader "Get Help". Gentle, compassionate design (soft background, dove or open-hands imagery). Text verbatim, in two paragraphs with the verses highlighted:

"In the book of Romans 7:24, O wretched man that I am! Who will deliver me from this body of death? (NKJV). Apostle Paul expressed his concerns and frustrations of being unable to live above sin or do the right thing, no matter how hard he tried. He wanted to ACT RIGHT, but reverse is the case- most likely before he was converted as believed by many scholars. He definitely needs help! It is a Safe Our Soul (SOS) cry."

"He got the solution in verse 25 and Galatians 5:16 (So I say, walk by the Spirit, and you will not gratify desires of the flesh – NKJV). You might be struggling as well to live above sins of anger, lying, stealing, hatred, pornography, sexual immoralities, pride, unforgiving, unthankful, unholy, lack of self-control and others not mentioned here but you were unable to achieve it alone. Through Jesus Christ, there are passionate and Spirit-filled children of God that are willing to talk and work with you until you both grow and live to please Jesus Christ, our savior. Click the link below to get connected."

Button "Get Connected" using GET_HELP_URL (falls back to WHATSAPP_URL when empty).

---- DONATE (/donate) ----
PageHeader "Donate". No payment gateway and no bank details. Content verbatim:
"Thank you very much for your interest to support TSK."
"We appreciate your material and financial support"
"Kindly contact our President through this email for details of your support"
"Brother Sunday Okotie"
"Tel no: +2348032072216 (Also available on whatsapp)"
"Email: president@tskinternational.org"
Design: a warm centred card with a heart/hand icon, the three contact actions as buttons (Call, WhatsApp, Email), with tel:, wa.me and mailto: links.

---- CONTACT (/contact) ----
PageHeader "Contact Us". Contact cards: President "Brother Sunday Okotie"; Phone +2348032072216 (also on WhatsApp); Email president@tskinternational.org; Facebook "The Sanctuary Keepers" linking to https://www.facebook.com/thesanctuarykeepers/. Buttons for Call, WhatsApp, Email, Facebook. No contact form.

=====================================================
4. QUALITY BAR
=====================================================
- Fully responsive (test at 375px, 768px, 1280px), fast, accessible (keyboard nav, focus rings, aria labels, skip-to-content link), semantic HTML.
- Consistent spacing: sections py-16 md:py-24, container max-w-6xl.
- Smooth page transitions, hover lift on cards, no layout shift.
- Create reusable components: PageHeader, ScriptureBlock, SectionTitle (with cross divider), CommitteeCard, ObjectiveCard, PostCard, TeamCard, CTABand.
- Do not add features not listed here (no public sign-up, no booking, no online payments, no newsletter).

Build a professional, beautiful, reverent, mobile-first multi-page website for "The Sanctuary Keepers (TSK International)", a Christian ministry. Use React + Vite + TypeScript + Tailwind + shadcn/ui + React Router. The look should feel warm, peaceful, trustworthy and unmistakably Christian: calm, spacious, uplifting. Not flashy, not corporate-cold.

IMPORTANT CONTENT RULE
All text in the CONTENT sections below is the client's real copy. Use it VERBATIM. Do not rewrite, shorten, "improve" or correct the wording (including capitalisation, spelling and scripture references). Only layout and styling are yours to design. Keep all external links exactly as given.

=====================================================
1. BRAND & DESIGN SYSTEM
=====================================================
Use the attached logo in the header, footer and as the favicon. Define everything as design tokens (CSS variables in index.css + Tailwind theme). No hard-coded colors in components.

Colors (derived from the logo):
- Primary: royal blue #1636B8 (buttons, links, headings accents, active nav)
- Secondary: violet #9A0FC9 (accents, highlights, badges, hover states, Donate button)
- Deep navy: #0B1B5E (hero overlays, footer, dark sections)
- Ivory background: #FBF9F4 (main page background, gives a warm, gentle feel)
- Soft blue-lavender: #F4F5FC (alternate section background)
- Text: #1F2937, muted text #6B7280, white surfaces
Convert these into HSL tokens for shadcn. Ensure WCAG AA contrast on all text.

Typography:
- Headings: "Playfair Display" (serif, elegant)
- Body/UI: "Inter"
- Article body: "Lora" at 18px / line-height 1.8 for comfortable reading
- Scripture quotes: Playfair Display italic, large, with a thin violet vertical rule or soft quote marks

"Christian" visual language (use tastefully):
- A soft radial "rays of light" gradient behind hero and scripture banners
- A small cross divider (line, cross, line) between major sections
- Gentle rounded cards (rounded-2xl), soft shadows, generous whitespace
- Thin-line icons (lucide-react): BookOpen, Cross-like icons (Plus/Church), Heart, HandHeart, Users, Flame, Dove-like (Bird), Sprout, Music, Shield
- Subtle fade-up on-scroll animations (respect prefers-reduced-motion)
- Scripture banners on a navy-to-blue gradient with the verse in large italic serif

Imagery: use free online photos from Unsplash and Pexels (hotlink the image URLs; do not use broken links, test that every image loads). Themes to search for: open Bible with soft light, church interior with sunlight through windows, hands raised in worship, cross at sunrise or sunset, hymn book and candle, choir singing, community helping hands / food distribution / charity, people praying together, wooden cross on hill, calm sanctuary. Put ALL image URLs in one file src/config/images.ts so they are easy to swap later. Every image needs meaningful alt text, lazy loading, and an object-cover crop.

Site constants: create src/config/site.ts exporting:
- SITE_NAME = "The Sanctuary Keepers"
- SITE_SHORT = "TSK International"
- TAGLINE = "For Kingdom of God"
- PRESIDENT_NAME = "Brother Sunday Okotie"
- PHONE = "+2348032072216"
- WHATSAPP_URL = "https://wa.me/2348032072216"
- EMAIL = "president@tskinternational.org"
- FACEBOOK_URL = "https://www.facebook.com/thesanctuarykeepers/"
- APPLICATION_FORM_URL = "http://bit.ly/TSKApplicationForm1"
- REPORT_ISSUE_URL = "https://bit.ly/tsk-Report-an-issue"
- GET_HELP_URL = "" (the client has not supplied this link yet; while empty, the Get Help button opens WHATSAPP_URL. Add a code comment: "TODO: replace with the Get Help connection link")

=====================================================
2. NAVIGATION & GLOBAL LAYOUT
=====================================================
Sticky header (white/ivory with subtle blur and shadow on scroll): logo on the left, nav, and a violet "Donate" button on the right. Mobile: hamburger opening a full-height slide-in menu with the same items (dropdowns become accordions).

Nav structure:
- Home  (/)
- About Us (dropdown): Our Story (/about), Vision, Mission & Objectives (/vision-mission)
- Management (/management)
- Membership (dropdown): Requirements, Mode of Application, Membership Development (all on /membership with anchor links #requirements, #application, #development)
- Committees (/committees)
- Gospel (/gospel)
- Articles (/articles)
- More (dropdown): Report an Issue (/report-an-issue), Get Help (/get-help), Contact (/contact)
- Donate button (/donate)

Footer (deep navy): logo and tagline "For Kingdom of God"; one-sentence description; quick links; Committees list; contact (phone, WhatsApp, email); Facebook icon link; scripture line "Be holy, for I am holy." 1 Peter 1:16 (NKJV); copyright line "© [current year] The Sanctuary Keepers. All rights reserved."; a very small, discreet "Admin" link in the footer to /admin.

Floating WhatsApp button (bottom-right, all public pages) linking to WHATSAPP_URL. Add a "back to top" button. Add SEO (title, meta description, Open Graph) to every page using react-helmet-async, plus a 404 page, and a shared PageHeader component (navy-blue gradient banner with page title, breadcrumb and a faint cross motif).

=====================================================
3. PAGES AND CONTENT
=====================================================

---- HOME (/) ----
Sections in this order, separated with the small cross divider:

3.1 HERO: full-screen-ish, background photo (open Bible / sanctuary light) with a navy gradient overlay and rays-of-light effect. Small label: "Our Vision". Large headline: "We support Christian elects and re-disciple backsliders in accordance with Christ's love and biblical principles." Two buttons: "Become a Member" (/membership) and "Our Story" (/about). Show the logo mark subtly.

3.2 SCRIPTURE BANNER: "I will build My church, and the gates of Hades shall not prevail against it." Matthew 16:18 (NKJV)

3.3 WHO WE ARE: image on one side, text on the other. Use the first three paragraphs of the About text below, then a "Read Our Story" button to /about.

3.4 VISION & MISSION: two side-by-side cards.
Vision: "To support Christian elects and re-disciple backsliders in accordance with Christ’s love and biblical principles."
Mission: "To promote the Gospel of Christ by teaching scriptural principles, living the gospel, and partnering with relevant organizations"

3.5 OUR OBJECTIVES: grid of 7 numbered cards (i to vii) with an icon each, text clamped to 3 lines with the full text on /vision-mission; button "See All Objectives".

3.6 CORE VALUES STRIP: Holiness · Love · Humility · Restoration (icon + one word each).

3.7 MEMBERSHIP CALL-TO-ACTION BAND (blue-to-violet gradient): "Membership is open to the elects who have committed themselves to the purity of sanctuary." Buttons: "Membership Requirements" (/membership#requirements) and "Apply Now" (external APPLICATION_FORM_URL, new tab).

3.8 OUR COMMITTEES: 5 cards (icon, name, one-line summary taken from the first words of each committee's text), each linking to /committees#slug.

3.9 LATEST ARTICLES: the 3 most recent published posts from the database (cover image, category badge, title, excerpt, date, "Read more"). Button "View all articles". Show skeleton loaders and an empty-state message if no posts.

3.10 REPORT AN ISSUE + GET HELP: two side-by-side cards.
Report an Issue: "Together we can keep the sanctuary. If you see something, please say something." Button to REPORT_ISSUE_URL (new tab).
Get Help: "You might be struggling to live above sin. There are passionate, Spirit-filled children of God willing to walk with you." Button "Get Connected" to /get-help.

3.11 DONATE BAND: "Thank you very much for your interest to support TSK. We appreciate your material and financial support." Button "Support TSK" to /donate.

---- ABOUT US / OUR STORY (/about) ----
PageHeader "About Us". Beautiful long-form layout: narrow reading column (max-w-3xl), first paragraph in larger lead style, the "church na scam" opening as a styled pull-quote, the Matthew 16:18 verse and the 1 Peter 1:16 verse as highlighted scripture blocks, and a small timeline strip: "May 2022: Conceived" then "November 2022: Registered". Text (verbatim):

"The Sanctuary Keepers

Have you ever heard someone say, “I stopped going to church because of the things I saw people doing there”? Or perhaps you've heard the popular expression among young people, “church na scam.”

Sadly, many people have become discouraged by behaviors and practices within the Church that do not reflect the teachings of Jesus Christ. Some have walked away from the faith, while others have gradually accepted sinful practices because they see fellow believers doing the same. The church is not a scam and will never be.

But this was never God's intention for His Church, which Christ purchased with His precious blood.

In Matthew 16:18 (NKJV), Jesus declared, “I will build My church, and the gates of Hades shall not prevail against it.”

Inspired by this promise, The Sanctuary Keepers was conceived in May 2022 and registered in November 2022 as a Christian ministry dedicated to promoting biblical values, encouraging holiness, and restoring godly conduct within the body of Christ.

We work alongside churches, Christian organizations, and fellow believers to uphold Christian ethics, strengthen the faith of God's children, support new converts, and lovingly guide those who have fallen away back to Christ.

Our mission is rooted in Scripture. Just as Jesus cleansed the temple (Matthew 21:12) and the Apostle Paul addressed wrongdoing among believers (1 Corinthians 5:1–13; Galatians 2:11–14), we believe Christians have a responsibility to uphold God's standards. However, we must always do this with love, humility, and gentleness, as instructed in Galatians 6:1.

We are not here to condemn, but to remind ourselves of who we are, encourage spiritual growth, and help one another remain faithful to Christ.

The Sanctuary Keepers is a family of devoted Christian brothers and sisters from around the world, united by a shared desire to live holy lives and encourage others to do the same.

We believe that holiness should not end at the church door. It must be reflected in our words, actions, relationships, and private lives, even when no one is watching.

As Scripture reminds us in 1 Peter 1:16 (NKJV), “Be holy, for I am holy.”

Our teachings and activities are firmly rooted in the Word of God and the gospel of Jesus Christ. Through His grace, we seek to build a community where believers support one another, the fallen find restoration, and the Church reflects the true character of Christ."

End with a CTA: "Become a Member" and "Contact Us".

---- VISION, MISSION & OBJECTIVES (/vision-mission) ----
PageHeader "Vision, Mission & Objectives". Three clearly separated sections with anchors #vision, #mission, #objectives (sticky in-page tab links at the top).

Vision: "To support Christian elects and re-disciple backsliders in accordance with Christ’s love and biblical principles."

Mission: "To promote the Gospel of Christ by teaching scriptural principles, living the gospel, and partnering with relevant organizations"

Objectives (a vertical list of 7 elegant cards, Roman numerals as large violet numerals):
i. To uphold Christian ethics, teachings, and integrity among members and non-members, and to foster the healthy development of Christian values worldwide
ii. To guide and support Christians on moral and scriptural ethical matters, and sustain a public example of probity, equity, good character, peace, and good governance in their individual and collective affairs.
iii. To identify, and re-disciple backsliders in faith to Christ the Lord.
iv. To contribute to the purity of the Sanctuary in every ramification and disciple believers who will exhibit the nature of God and reflect the life of Christ the Savior in every facet of their lives.
v. To promote the gospel of Christ through collaboration with relevant organizations worldwide
vi. To contribute to social, economic, and healthcare support for the vulnerable Christians and non-Christians acceptable within the community contexts
vii. To publish, edit and distribute books, magazines, pamphlets which may help to fulfill the objectives of the organization

---- MANAGEMENT (/management) ----
PageHeader "Management". Grid of team member cards (photo or initials avatar, name, position, optional short bio). Data comes from the database table team_members (see Part 2), ordered by sort_order. Seed one record: name "Brother Sunday Okotie", position "President", no photo (show initials avatar). Add an empty-state message "Management profiles will be published soon." Include a line under the grid: "To reach our President, see the Contact page." (link).

---- MEMBERSHIP (/membership) ----
PageHeader "Membership". Sticky in-page tabs/anchors: Requirements | Mode of Application | Membership Development.

#requirements, "Membership Requirements" (numbered list with Roman numerals, each as a card row):
i. Membership is open to the elects who have committed themselves to the purity of sanctuary.
ii. The membership shall be limited to all elects (the followers of Christ) from any part of the World, who have taken the steps to duly register and are willing to abide with the rules and regulations as enshrined in the Constitution of TSK
iii. Qualified members shall not be less than 18 years of age
iv. A member of TSK must belong to a church or denomination and must be confirmed by the official representative of the Church. Any member of the TSK can as well confirm the suitability of prospective members to join the membership of TSK
v. Both male and female elects (the followers of Christ) are qualified to become members of the Society and shall be called BROTHERS AND SISTERS

#application, "Mode of Application":
"Application for membership shall be made on a prescribed form as approved by the Executive Committee of TSK. It will be obtainable at no cost by filling and completing application form via this link:" followed by a prominent button "Fill the Application Form" linking to http://bit.ly/TSKApplicationForm1 (new tab, rel noopener) and also showing the link text bit.ly/TSKApplicationForm1.

#development, "Membership Development":
"This page is dedicated for training programmes for members to grow them spiritually, socially and economically."
"Trainings will be announced soon" (style as a friendly "Coming soon" notice card with a sprout icon).

---- COMMITTEES (/committees) ----
PageHeader "Committees". An intro-less page: sticky left/top list of the 5 committees (anchors by slug) and one section per committee, each a card with an icon, the title, the text and its numbered/lettered functions styled as a clean list. Text verbatim:

(1) slug membership-committee: "Membership Committee"
"Membership Committee was established to perform the following functions"
i. Scrutinize any intending members for the purpose of admission into the Organisation.
ii. Recommend admission of members to the Organisation
iii. Visit from time to time the Members during their meetings.
iv. Generate and collate ideas on the welfare, growth, and development of Members.
v. Recommend strategies for the development of Members; and
vi. Produce and update database of all members

(2) slug media-and-editorial-service-committee: "Media and Editorial Service Committee"
"The Media and Editorial Service Committee was established to perform the following functions"
i. responsible for the overall quality and quantity of the publications and implements policy decisions approved by Council.
ii. oversee procedures for manuscript submission, acceptance, release, and publication, as well as the criteria for review
iii. Provide content by writing and publishing occasional editorials and other short articles.

(3) slug christian-aid-service-committee: "Christian Aid Service Committee"
"Some scriptures encourage us to care for the poor in the land. For instance, Proverb 19:17, Deuteronomy 15:11, and Leviticus 25:35. Jesus said in Matthew 25:40 NIV that “the king will reply, truly I tell you, whatever you did for one of the least of these brothers and sisters of mine, you did for me” Therefore, the Christian Aid Service Committee was established to perform the following functions"
a. protect and promote the identity and values of the charity
b. to expose poverty throughout the world and help in practical ways to end it.
c. provide social and economic empowerment initiatives for the poor worldwide
d. distribute food, clothing, medicines, mostly to needy orphans and Christian families.
(Feature the Matthew 25:40 quote as a highlighted scripture block and use a charity/helping-hands photo.)

(4) slug christian-mediation-committee: "Christian Mediation Committee"
"The Christian Mediation Committee was established to provide conciliation on disputed matters amongst the members and or that affect the elects which had resulted to dispute. The Committee shall do everything possible within her power and in line with the provisions of the Bible to provide amicable solutions to the disputed matters."

(5) slug disciplinary-committee: "Disciplinary Committee"
"Disciplinary Committee was established"
a) To receive petitions or complaints against members/and officers.
b) To ensure compliance with and where appropriate enforce the provisions of the code of conduct, the memorandum/articles and bye-law of the Organisation for the time being in force.
c) To examine all petitions and recommend to the Council disciplinary measures or sanctions to be imposed on erring members PROVIDED always that the right of a defaulting member to be notified in writing of allegations made against him and the right to be heard in his defense is preserved and guaranteed.
d) To generally exercise disciplinary control over members and officers.
e) To do such other things as may be conferred on it by Council and or the Organization.

---- GOSPEL (/gospel) ----
PageHeader "Hymns and Gospel Songs". Intro with scripture block:
"Ephesians 5:19 says, Speaking to one another with psalms, hymns, and songs from the Spirit. Sing and make music from your heart to the Lord (NKJV). One of the ways God laid in our heart as an organization to bless people’s soul and spirit is through hymns and gospel songs. Listen to hymns and gospel songs here and be blessed."

Section "Listen & Be Blessed": responsive grid of posts from category "Gospel Songs" (each card shows its embedded YouTube video or cover image, title, date). Friendly empty state: "Songs will be added soon."

Section "Hymns and their Stories": grid of published posts from category "Hymns and Their Stories" (cover image, title, author "Admin" if no author set, date, excerpt, "Read More"). These come from the database (seeded in Part 2).

---- ARTICLES (/articles) and ARTICLE PAGE (/articles/:slug) ----
Articles list: PageHeader "Articles". Category filter pills (All + each category), search box, paginated or "Load more" grid of published posts (cover, category badge, title, excerpt, optional author, date). Reading time estimate on each card.
Article page: large cover image, category badge, title (Playfair, large), meta row (optional author with avatar initials, date, reading time), then the article body rendered as sanitized HTML inside a styled "prose" container (install @tailwindcss/typography, customise with the brand: Lora body, Playfair headings, violet blockquote rule, rounded images with captions, responsive YouTube iframes at 16:9). Below: share buttons (WhatsApp, Facebook, copy link), "Related articles" (same category), previous/next. Add per-post SEO and Open Graph image from the cover image. Use DOMPurify to sanitize and allow only <iframe> from youtube-nocookie.com and youtube.com.

---- REPORT AN ISSUE (/report-an-issue) ----
PageHeader "Report an Issue". Large, calm card: "Together we can keep the sanctuary. If you see something, please say something." Button "Report an Issue" linking to https://bit.ly/tsk-Report-an-issue (new tab).

---- GET HELP (/get-help) ----
PageHeader "Get Help". Gentle, compassionate design (soft background, dove or open-hands imagery). Text verbatim, in two paragraphs with the verses highlighted:

"In the book of Romans 7:24, O wretched man that I am! Who will deliver me from this body of death? (NKJV). Apostle Paul expressed his concerns and frustrations of being unable to live above sin or do the right thing, no matter how hard he tried. He wanted to ACT RIGHT, but reverse is the case- most likely before he was converted as believed by many scholars. He definitely needs help! It is a Safe Our Soul (SOS) cry."

"He got the solution in verse 25 and Galatians 5:16 (So I say, walk by the Spirit, and you will not gratify desires of the flesh – NKJV). You might be struggling as well to live above sins of anger, lying, stealing, hatred, pornography, sexual immoralities, pride, unforgiving, unthankful, unholy, lack of self-control and others not mentioned here but you were unable to achieve it alone. Through Jesus Christ, there are passionate and Spirit-filled children of God that are willing to talk and work with you until you both grow and live to please Jesus Christ, our savior. Click the link below to get connected."

Button "Get Connected" using GET_HELP_URL (falls back to WHATSAPP_URL when empty).

---- DONATE (/donate) ----
PageHeader "Donate". No payment gateway and no bank details. Content verbatim:
"Thank you very much for your interest to support TSK."
"We appreciate your material and financial support"
"Kindly contact our President through this email for details of your support"
"Brother Sunday Okotie"
"Tel no: +2348032072216 (Also available on whatsapp)"
"Email: president@tskinternational.org"
Design: a warm centred card with a heart/hand icon, the three contact actions as buttons (Call, WhatsApp, Email), with tel:, wa.me and mailto: links.

---- CONTACT (/contact) ----
PageHeader "Contact Us". Contact cards: President "Brother Sunday Okotie"; Phone +2348032072216 (also on WhatsApp); Email president@tskinternational.org; Facebook "The Sanctuary Keepers" linking to https://www.facebook.com/thesanctuarykeepers/. Buttons for Call, WhatsApp, Email, Facebook. No contact form.

=====================================================
4. QUALITY BAR
=====================================================
- Fully responsive (test at 375px, 768px, 1280px), fast, accessible (keyboard nav, focus rings, aria labels, skip-to-content link), semantic HTML.
- Consistent spacing: sections py-16 md:py-24, container max-w-6xl.
- Smooth page transitions, hover lift on cards, no layout shift.
- Create reusable components: PageHeader, ScriptureBlock, SectionTitle (with cross divider), CommitteeCard, ObjectiveCard, PostCard, TeamCard, CTABand.
- Do not add features not listed here (no public sign-up, no booking, no online payments, no newsletter).

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a06ea0b5-03e2-4f87-8d22-ae834d12ed7a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
