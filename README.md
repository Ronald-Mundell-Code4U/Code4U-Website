# Code4U — Official Website

The official website for Code4U — a software development and AI consultancy run by Ronald (Ronnie) Mundell. Built as a production-grade portfolio, company showcase, and client acquisition platform.

Live at **[code4u.app](https://code4u.app)**.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Hosting | Vercel |
| Forms | React Hook Form + Zod |
| Email | Resend |
| Analytics | Google Analytics 4 (`@next/third-parties`) |
| Theme | `next-themes` (dark default, system preference) |
| Fonts | Syne (display) + DM Sans (body), self-hosted via `next/font` |
| Icons | Lucide React |

---

## Local Setup

### Prerequisites

- Node.js 18.17+ (Next.js 14 requirement)
- npm 9+ (or pnpm / yarn — adjust commands accordingly)

### Install

```bash
git clone https://github.com/RonaldMundell/code4u.git
cd code4u
npm install
```

### Environment variables

Copy the example file and fill in real values:

```bash
cp .env.local.example .env.local
```

Required for the contact form to work:

| Variable | Notes |
|---|---|
| `RESEND_API_KEY` | Get from [resend.com/api-keys](https://resend.com/api-keys). |
| `CONTACT_TO_EMAIL` | Where contact form submissions are delivered. Defaults to `Ronald@code4u.app`. |
| `CONTACT_FROM_EMAIL` | Verified sender — must match a domain configured in Resend. Defaults to `noreply@code4u.app`. |

Optional:

| Variable | Notes |
|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 measurement ID (e.g. `G-XXXXXXXXXX`). Analytics is disabled if absent. |
| `NEXT_PUBLIC_SITE_URL` | Used for canonical URLs, sitemap, and structured data. Defaults to `https://code4u.app`. |

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
npm run start
```

---

## Project Structure

```
.
├── app/
│   ├── layout.tsx              # Root layout: fonts, theme, nav, footer, analytics, JSON-LD
│   ├── page.tsx                # Homepage
│   ├── about/page.tsx
│   ├── services/page.tsx
│   ├── projects/page.tsx
│   ├── experience/page.tsx
│   ├── contact/page.tsx
│   ├── not-found.tsx           # 404 page
│   ├── sitemap.ts              # Dynamic sitemap.xml
│   ├── robots.ts               # Dynamic robots.txt
│   ├── globals.css             # Tailwind layers + base styles
│   └── api/
│       └── contact/route.ts    # POST → Resend (rate-limited + Zod-validated)
├── components/
│   ├── layout/                 # Navbar, Footer, ThemeProvider, ThemeToggle, CookieBanner
│   ├── ui/                     # Button, Badge, Card, SectionHeading
│   └── sections/               # Hero, ServicesStrip, FeaturedProjects, TechMarquee,
│                               # Testimonials, ContactCTA, ContactForm, ExperienceTimeline
├── content/                    # Static data (projects, experience, services, tech stack)
├── lib/                        # utils, Zod schema, site config
├── public/                     # Logos, photo, resume PDF
└── ...config files
```

### Where to edit content

- **Projects** → `content/projects.ts`
- **Work experience** → `content/experience.ts`
- **Services** → `content/services.ts`
- **Technology marquee** → `content/tech-stack.ts`
- **Bio, education, philosophy** → `app/about/page.tsx`
- **Author info, nav, social links** → `lib/site-config.ts`

All copy lives in data files or page components — no CMS yet.

---

## Deployment (Vercel)

1. Push this repository to GitHub.
2. Import it in the [Vercel dashboard](https://vercel.com/new).
3. Add environment variables in **Project Settings → Environment Variables**.
4. Configure the `code4u.app` custom domain.
5. Verify the sender domain in [Resend](https://resend.com) (add DKIM/SPF records to the `code4u.app` zone) so the contact form can deliver.

Vercel auto-deploys every push to `main`. Branch pushes get preview deployments.

### Post-deploy checklist

- [ ] Submit `https://code4u.app/sitemap.xml` to Google Search Console
- [ ] Verify GA4 events are flowing
- [ ] Test the contact form end-to-end (submission → inbox)
- [ ] Lighthouse audit on production URL
- [ ] Open Graph preview check ([opengraph.xyz](https://www.opengraph.xyz/))

---

## Quality & Standards

- **Lighthouse target**: 90+ across Performance, Accessibility, SEO, Best Practices
- **Accessibility**: WCAG 2.1 AA. All interactive elements keyboard-focusable with visible focus rings. Semantic HTML. Reduced-motion respected.
- **Security headers**: configured in `vercel.json` and mirrored in `next.config.js`
- **Rate limiting**: in-memory per-IP limiter on `/api/contact` (3 / 10 min). For multi-region scale, swap to Upstash Redis.
- **Bot protection**: honeypot field on the contact form
- **No client-side data fetching for static content** — everything is statically generated at build time

---

## Roadmap

### Phase 2 (post-launch)

- [ ] Blog with MDX support
- [ ] CMS integration (Sanity or Contentlayer) for projects/services
- [ ] Calendly embed on contact page for consultation booking
- [ ] Real testimonial content from Clint Hull and Rob Goehring
- [ ] Google Play listing for TimeYourWOD once live
- [ ] Case study deep-dives with architecture diagrams and outcome metrics
- [ ] Animated project demo GIFs / videos
- [ ] Project screenshots / mockups in featured cards
- [ ] OG (Open Graph) cover image (1200×630) for social sharing

### Phase 3 (long-term)

- Client portal / authenticated dashboard
- Payment processing for retained engagements
- Multi-language support (English + French for Canadian market)

---

## License

Proprietary. © Code4U. All rights reserved.

---

## Contact

Ronald Mundell — [Ronald@code4u.app](mailto:Ronald@code4u.app) — 778-872-3866 — Coquitlam, BC
