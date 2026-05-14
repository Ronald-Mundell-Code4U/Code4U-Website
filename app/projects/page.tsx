import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { projects, clientWork } from "@/content/projects";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProjectCover } from "@/components/ui/ProjectCover";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Recent work from Code4U — Faiza Homes (AI rental platform), TimeYourWOD (cross-platform fitness app), LetterForge (AWS-hosted word game), and client engagements.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      {/* Page header */}
      <section className="relative pt-32 md:pt-40 pb-12 md:pb-16 overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-mesh-light dark:bg-mesh-dark opacity-70"
          aria-hidden="true"
        />
        <div className="container-page">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Our Work
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight max-w-3xl">
            <span className="text-gradient-green">Case studies</span> across
            web, mobile, and AI.
          </h1>
          <p className="mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-text-body dark:text-text-dark-b">
            Every engagement below is live or has shipped to its target
            platform. No concept demos, no abandoned side projects — just the
            work Code4U has delivered into production.
          </p>
        </div>
      </section>

      {/* Featured projects */}
      <section className="pb-20 md:pb-24">
        <div className="container-page">
          <div className="space-y-8">
            {featured.map((project, idx) => (
              <article
                key={project.slug}
                className="group relative grid gap-8 rounded-card border border-gray-200/70 bg-bg-light-card p-8 md:p-10 lg:p-12 shadow-card transition-all duration-300 hover:border-primary-700/40 dark:border-accent/15 dark:bg-bg-dark-card dark:hover:border-accent/50 lg:grid-cols-12"
              >
                {/* Left meta */}
                <div className="lg:col-span-4">
                  <ProjectCover
                    slug={project.slug}
                    title={project.title}
                    className="mb-6 aspect-[16/10]"
                  />
                  <div className="flex items-center gap-3">
                    <span className="font-display text-3xl font-bold text-accent tabular-nums">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <Badge variant="outline">{project.status}</Badge>
                  </div>
                  <h2 className="mt-4 text-3xl md:text-4xl font-extrabold leading-tight text-text-heading dark:text-text-dark-h">
                    {project.title}
                  </h2>
                  <p className="mt-2 text-base font-medium text-accent">
                    {project.tagline}
                  </p>
                  {project.role && (
                    <p className="mt-3 text-sm text-text-body dark:text-text-dark-b">
                      <span className="font-semibold text-text-heading dark:text-text-dark-h">
                        Scope:
                      </span>{" "}
                      {project.role}
                    </p>
                  )}

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>

                  {(project.liveUrl || project.webUrl) && (
                    <div className="mt-6 flex flex-wrap gap-3">
                      {project.liveUrl && (
                        <Button
                          href={project.liveUrl}
                          external
                          size="md"
                          variant="outline"
                        >
                          {project.liveUrl.includes("apps.apple.com")
                            ? "Get App"
                            : "Visit Live"}
                          <ExternalLink
                            className="h-4 w-4"
                            aria-hidden="true"
                          />
                        </Button>
                      )}
                      {project.webUrl && (
                        <Button
                          href={project.webUrl}
                          external
                          size="md"
                          variant="outline"
                        >
                          Visit Website
                          <ExternalLink
                            className="h-4 w-4"
                            aria-hidden="true"
                          />
                        </Button>
                      )}
                    </div>
                  )}
                </div>

                {/* Right detail */}
                <div className="space-y-6 lg:col-span-8 lg:border-l lg:border-gray-200/60 dark:lg:border-accent/15 lg:pl-10">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                      Problem
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-text-body dark:text-text-dark-b">
                      {project.problem}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                      Solution
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-text-body dark:text-text-dark-b">
                      {project.solution}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                      Outcome
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-text-body dark:text-text-dark-b">
                      {project.outcome}
                    </p>
                  </div>
                  {project.story && (
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                        Our Story
                      </h3>
                      <p className="mt-2 text-base leading-relaxed text-text-body dark:text-text-dark-b">
                        {project.story}
                      </p>
                    </div>
                  )}
                  {project.mission && (
                    <div className="rounded-card border border-accent/20 bg-accent/5 p-5">
                      <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                        Our Mission
                      </h3>
                      <p className="mt-2 text-base leading-relaxed text-text-body dark:text-text-dark-b">
                        {project.mission}
                      </p>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Client work */}
      <section className="pb-24 md:pb-32 border-t border-gray-200/60 dark:border-accent/10 pt-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Client Engagements"
            title="Sites built for businesses."
            description="A selection of client work spanning small business, e-commerce, and IT services — delivered by Code4U from scoping to launch."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {clientWork.map((client) => (
              <a
                key={client.name}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-card border border-gray-200/70 bg-bg-light-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:border-primary-700/40 dark:border-accent/15 dark:bg-bg-dark-card dark:hover:border-accent/50"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-bold text-text-heading dark:text-text-dark-h">
                    {client.name}
                  </h3>
                  <ExternalLink
                    className="h-4 w-4 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-text-body dark:text-text-dark-b flex-1">
                  {client.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {client.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
