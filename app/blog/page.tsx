import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { blogPosts, blogCategories, formatBlogDate } from "@/content/blog";
import { Badge } from "@/components/ui/Badge";
import { SmartImage } from "@/components/ui/SmartImage";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes and write-ups from the Code4U team on software development, mobile apps, AI, cloud, and the realities of shipping products.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const [featured, ...rest] = sorted;

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
            The Blog
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight max-w-3xl">
            Notes from{" "}
            <span className="text-gradient-green">building real software.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-text-body dark:text-text-dark-b">
            Write-ups on the things we actually run into — iOS deployment,
            AI tooling trade-offs, mobile UX, monitoring, and the gap between
            documentation and reality.
          </p>

          {/* Category chips */}
          <div className="mt-7 flex flex-wrap gap-2">
            {blogCategories.map((cat) => (
              <span
                key={cat}
                className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-primary-700 dark:text-accent"
              >
                <Tag className="h-3 w-3" aria-hidden="true" />
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured post */}
      <section className="pb-12">
        <div className="container-page">
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid gap-8 rounded-card border border-gray-200/70 bg-bg-light-card p-6 md:p-8 lg:p-10 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:border-accent/40 dark:border-accent/15 dark:bg-bg-dark-card lg:grid-cols-12"
          >
            <div className="lg:col-span-6">
              <SmartImage
                src={featured.coverImage ?? "/images/hero.jpg"}
                alt={featured.title}
                iconName="image"
                fallbackLabel={featured.category}
                className="aspect-[16/10] rounded-card"
                priority
              />
            </div>
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <Badge variant="solid">Latest</Badge>
                <Badge>{featured.category}</Badge>
                <span className="inline-flex items-center gap-1.5 text-text-body dark:text-text-dark-b">
                  <Calendar className="h-3 w-3" aria-hidden="true" />
                  {formatBlogDate(featured.date)}
                </span>
              </div>
              <h2 className="mt-4 text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-text-heading dark:text-text-dark-h group-hover:text-primary-700 dark:group-hover:text-accent transition-colors">
                {featured.title}
              </h2>
              <p className="mt-4 text-base md:text-lg leading-relaxed text-text-body dark:text-text-dark-b">
                {featured.excerpt}
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 dark:text-accent">
                Read article
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Remaining posts grid */}
      <section className="pb-24 md:pb-32">
        <div className="container-page">
          <h2 className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-accent mb-8">
            More articles
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-card border border-gray-200/70 bg-bg-light-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:border-accent/40 dark:border-accent/15 dark:bg-bg-dark-card overflow-hidden"
              >
                <SmartImage
                  src={post.coverImage ?? "/images/hero.jpg"}
                  alt={post.title}
                  iconName="image"
                  fallbackLabel={post.category}
                  className="aspect-[16/10]"
                />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 text-xs">
                    <Badge>{post.category}</Badge>
                    <span className="inline-flex items-center gap-1.5 text-text-body dark:text-text-dark-b">
                      <Calendar className="h-3 w-3" aria-hidden="true" />
                      {formatBlogDate(post.date)}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg md:text-xl font-bold leading-tight text-text-heading dark:text-text-dark-h group-hover:text-primary-700 dark:group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-body dark:text-text-dark-b flex-1">
                    {post.excerpt}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 dark:text-accent">
                    Read article
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
