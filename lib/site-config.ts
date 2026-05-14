export const siteConfig = {
  name: "Code4U",
  tagline: "Software development & mobile solutions.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://code4u.app",
  description:
    "Code4U is a Vancouver-based software studio. We build websites, mobile apps, and IT solutions for growing businesses across Canada and remote worldwide.",
  ogImage: "/og-image.png",
  author: {
    name: "Ronald Mundell",
    nickname: "Ronnie",
    title: "Founder, Code4U",
    email: "Ronald@code4u.app",
    phone: "778-872-3866",
    location: "Coquitlam, BC, Canada",
    linkedin: "https://linkedin.com/in/ronald-mundell",
    github: "https://github.com/Ronald-Mundell-Code4U",
  },
  company: {
    founded: "2023",
    hq: "Vancouver, BC",
    serviceArea: "Canada & remote worldwide",
    mission: "To make technology easy and accessible for all businesses.",
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
};

export type SiteConfig = typeof siteConfig;
