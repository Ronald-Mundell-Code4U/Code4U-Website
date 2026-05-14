export interface Project {
  slug: string;
  title: string;
  role?: string;
  tagline: string;
  problem: string;
  solution: string;
  outcome: string;
  story?: string;
  mission?: string;
  stack: string[];
  liveUrl?: string;
  webUrl?: string;
  status: "Live" | "In Development" | "Production";
  featured: boolean;
}

export interface ClientWork {
  name: string;
  url: string;
  description: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    slug: "timeyourwod",
    title: "TimeYourWOD",
    role: "Product, design & full-stack engineering",
    tagline: "A workout timer built by athletes, for athletes.",
    problem:
      "CrossFit and Hyrox athletes needed a precise, dedicated interval timer that worked seamlessly across phone, tablet, and gym display — without the rough edges of generic timer apps.",
    solution:
      "Code4U built a cross-platform app in React Native with native iOS polish, plus a web version on Vercel. Covers AMRAP, For Time, EMOM, TABATA, and Complex timers — all the standard WOD formats — with saveable favourite timers and mobile-first ergonomics for gym environments.",
    outcome:
      "Live on the Apple App Store with the web version at timeyourwod.code4u.app. Continually improved based on gym-owner and member feedback.",
    story:
      "TimeYourWOD started from the founder's own experience as a passionate athlete and coach — understanding firsthand how precise timing and structure shape a good workout. Existing timers fell short, so we built the one we wished existed.",
    mission:
      "Founded with a personal connection to neurodiversity and the late-diagnosed autism community, a portion of TimeYourWOD platform proceeds is dedicated to raising awareness and supporting early diagnosis efforts for individuals with autism.",
    stack: ["React Native", "Expo", "TypeScript", "iOS", "Vercel"],
    liveUrl: "https://apps.apple.com/app/6698851328",
    webUrl: "https://timeyourwod.code4u.app",
    status: "Live",
    featured: true,
  },
  {
    slug: "letterforge",
    title: "Letter Forge",
    role: "End-to-end build + AWS deployment",
    tagline: "The ultimate word-crafting adventure.",
    problem:
      "After enjoying daily word games like Wordle, Spelling Bee, and Connections, we wanted something new — a word game with deeper mechanics, a daily challenge, and room to grow. Plus an honest production context to validate AWS deployment patterns at low cost.",
    solution:
      "We designed and launched an interactive word-forging game from concept to deployment. Seven letters glow like embers; players hammer them into five unique five-letter words, racing toward the elusive Final Word of the day. Built with HTML, CSS, JavaScript, and Node.js, hosted on AWS S3 + CloudFront with strict free-tier budgeting.",
    outcome:
      "Live at letterforge.code4u.app. Recently shipped a daily archive so players can revisit past puzzles, plus aesthetic polish on the finish screen. Stable and running well within AWS free-tier limits.",
    stack: ["JavaScript", "Node.js", "AWS S3", "CloudFront", "HTML/CSS"],
    liveUrl: "https://letterforge.code4u.app",
    status: "Live",
    featured: true,
  },
  {
    slug: "faiza-homes",
    title: "Faiza Homes",
    role: "AI strategy + full-stack platform build",
    tagline: "AI-powered rental platform.",
    problem:
      "Rental platforms typically depend on manual agent responses for every property inquiry and tenant screening — slow, inconsistent, and hard to scale across a growing portfolio.",
    solution:
      "Code4U architected a production React + Supabase platform with a RAG-based QA agent grounded in live listing data, and a hybrid tenant pre-screening agent pairing rule-based logic with the Claude Sonnet API for transparent qualification decisions. Hardened with Edge Functions, RLS policies, and integrated Stripe, SendGrid, and Twilio.",
    outcome:
      "End-to-end rental workflow deployed to production — from tenant discovery to lease signing — with automated AI handling inquiries and screening at scale.",
    stack: [
      "React",
      "Supabase",
      "Claude API",
      "PostgreSQL",
      "Stripe",
      "SendGrid",
      "Twilio",
    ],
    status: "Production",
    featured: true,
  },
];

export const clientWork: ClientWork[] = [
  {
    name: "Experience-IT",
    url: "https://experience-it.ca",
    description:
      "SEO-optimized business website with custom automation workflows including a Microsoft Power Automate calendar event system.",
    tags: ["WordPress", "SEO", "Power Automate"],
  },
  {
    name: "WorldSnorkel",
    url: "https://worldsnorkel.com",
    description:
      "Responsive travel and e-commerce site emphasizing SEO performance and modern, mobile-first design.",
    tags: ["Responsive", "SEO", "E-commerce"],
  },
  {
    name: "Function Health Club",
    url: "https://functionhealthclub.com",
    description:
      "Full WordPress redesign with a responsive layout and substantially improved page load speed.",
    tags: ["WordPress", "Performance", "Redesign"],
  },
];
