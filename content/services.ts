import {
  Code2,
  Smartphone,
  Compass,
  BrainCircuit,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: LucideIcon;
  tags: string[];
  offerings: string[];
  image?: string;
}

export const services: Service[] = [
  {
    slug: "consulting",
    title: "Consulting",
    short: "Expert advice on the right IT solution for your business.",
    description:
      "Whether you're sizing up a new project, weighing the feasibility of an idea, or just want a second opinion before committing — sit down with one of our experts and walk out with a clear next step. General consults to scope direction, or specialized consults that go deep on a specific problem.",
    icon: Compass,
    image: "/images/service-consulting.jpg",
    tags: ["Discovery", "Feasibility", "Strategy", "Architecture"],
    offerings: [
      "General consultation — sit down, share your goals, leave with a plan.",
      "Specialized consult — deep-dive review on a specific app, website, or technical question.",
      "Architecture and stack review for in-flight projects.",
      "AI feasibility and scoping for teams considering Claude, RAG, or chat agents.",
    ],
  },
  {
    slug: "website-development",
    title: "Website Development",
    short: "Build, modify, or completely overhaul your business website.",
    description:
      "From a first website to a complete overhaul — we build sites that look the part and load fast. Already have a site? We'll plug in seamless updates, add new pages, fix what's slow, and handle ongoing maintenance so you don't have to.",
    icon: Code2,
    image: "/images/service-web.jpg",
    tags: ["Next.js", "WordPress", "SEO", "Performance", "Maintenance"],
    offerings: [
      "New websites from scratch — design through deployment.",
      "Redesigns and overhauls of existing sites that have stopped pulling weight.",
      "New pages, features, and integrations on your current stack.",
      "Ongoing maintenance — hosting, updates, uptime, and monthly check-ins.",
    ],
  },
  {
    slug: "mobile-development",
    title: "Mobile Development",
    short: "iOS and Android apps built with React Native at the core.",
    description:
      "Got an app idea or want to take your business mobile? We build custom cross-platform apps with React Native — one codebase, two app stores. Already shipped? We handle updates, maintenance, and the readable logistics that keep your app healthy.",
    icon: Smartphone,
    image: "/images/service-mobile.jpg",
    tags: ["React Native", "Expo", "iOS", "Google Play", "Maintenance"],
    offerings: [
      "New mobile apps — iOS and Android, one codebase, real native polish.",
      "Custom builds tailored to your business workflows and brand.",
      "Maintenance and updates for apps already in the stores.",
      "Mobile strategy and feasibility for teams unsure whether to go native or web.",
    ],
  },
  {
    slug: "ai-solutions",
    title: "AI Solutions",
    short: "Add real AI to your product — chat agents, RAG, and automations.",
    description:
      "Practical AI that ships, not demos that die in a sandbox. We integrate Claude and other LLMs into your product to handle real workflows — customer-facing chat agents, RAG-powered Q&A grounded in your data, document processing, and behind-the-scenes automations that save your team hours every week.",
    icon: BrainCircuit,
    image: "/images/service-ai.jpg",
    tags: ["Claude API", "RAG", "Chat Agents", "Automation", "AI Strategy"],
    offerings: [
      "Custom chat and voice agents wired into your product or workflow.",
      "RAG pipelines — answers grounded in your own docs, listings, or data.",
      "AI strategy and feasibility — what to build, what to skip, what it'll cost.",
      "Automations using Claude API + your existing stack (Supabase, n8n, etc.).",
    ],
  },
];
