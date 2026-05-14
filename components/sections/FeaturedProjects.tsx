"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { projects } from "@/content/projects";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProjectCover } from "@/components/ui/ProjectCover";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FeaturedProjects() {
  const reduce = useReducedMotion();
  const featured = projects.filter((p) => p.featured);

  return (
    <section className="section-padding bg-bg-light dark:bg-bg-dark relative">
      {/* Soft accent at top edge */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
        aria-hidden="true"
      />

      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeading
            eyebrow="Selected Work"
            title="Recent projects."
            description="Production deployments — not concepts. Each project below is live or shipped to its target platform."
            className="max-w-2xl"
          />
          <Button href="/projects" variant="ghost" withArrow>
            All projects
          </Button>
        </div>

        <div className="mt-12 md:mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, idx) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: reduce ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: reduce ? 0 : idx * 0.08,
                ease: "easeOut",
              }}
              className="group flex h-full flex-col rounded-card border border-gray-200/70 bg-bg-light-card p-6 md:p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:border-primary-700/40 dark:border-accent/15 dark:bg-bg-dark-card dark:hover:border-accent/50"
            >
              <ProjectCover
                slug={project.slug}
                title={project.title}
                className="mb-5 aspect-[16/10]"
              />
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold text-text-heading dark:text-text-dark-h">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-accent font-medium">
                    {project.tagline}
                  </p>
                </div>
                <Badge variant="outline" className="shrink-0">
                  {project.status}
                </Badge>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-text-body dark:text-text-dark-b">
                {project.solution}
              </p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.stack.slice(0, 4).map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
                {project.stack.length > 4 && (
                  <Badge variant="outline">
                    +{project.stack.length - 4} more
                  </Badge>
                )}
              </div>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-800 dark:text-accent group/link"
                >
                  Visit live
                  <ExternalLink
                    className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
