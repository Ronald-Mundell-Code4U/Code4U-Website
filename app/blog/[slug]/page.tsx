import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { blogPosts, getPostBySlug, formatBlogDate } from "@/content/blog";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { siteConfig } from "@/lib/site-config";

interface PostPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PostPageProps): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: post.coverImage
        ? [{ url: `${siteConfig.url}${post.coverImage}` }]
        : undefined,
    },
  };
}

export default function BlogPostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  // Sibling navigation
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const idx = sorted.findIndex((p) => p.slug === post.slug);
  const prev = idx > 0 ? sorted[idx - 1] : undefined;
  const next = idx < sorted.length - 1 ? sorted[idx + 1] : undefined;

  return (
    <>
      <article>
        {/* Hero */}
        <section className="relative pt-32 md:pt-40 pb-12 overflow-hidden">
          <div
            className="absolute inset-0 -z-10 bg-mesh-light dark:bg-mesh-dark opacity-70"
            aria-hidden="true"
          />
          <div className="container-page">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 dark:text-accent hover:underline"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to all posts
            </Link>

            <div className="mt-8 max-w-3xl">
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <Badge variant="solid">{post.category}</Badge>
                <span className="inline-flex items-center gap-1.5 text-text-body dark:text-text-dark-b">
                  <Calendar className="h-3 w-3" aria-hidden="true" />
                  {formatBlogDate(post.date)}
                </span>
                <span className="inline-flex items-center gap-1.5 text-text-body dark:text-text-dark-b">
                  <User className="h-3 w-3" aria-hidden="true" />
                  {post.author}
                </span>
              </div>
              <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight">
                {post.title}
              </h1>
              <p className="mt-6 text-lg md:text-xl leading-relaxed text-text-body dark:text-text-dark-b">
                {post.excerpt}
              </p>
            </div>
          </div>
        </section>

        {/* Cover image */}
        {post.coverImage && (
          <div className="container-page mb-12">
            <SmartImage
              src={post.coverImage}
              alt={post.title}
              iconName="image"
              fallbackLabel={post.category}
              className="aspect-[21/9] rounded-card shadow-card"
              priority
            />
          </div>
        )}

        {/* Article body */}
        <section className="pb-16">
          <div className="container-page">
            <div className="mx-auto max-w-3xl prose-blog">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="mt-12 mb-6 text-3xl md:text-4xl font-extrabold tracking-tight text-text-heading dark:text-text-dark-h">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="mt-12 mb-5 text-2xl md:text-3xl font-extrabold tracking-tight text-text-heading dark:text-text-dark-h">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="mt-8 mb-4 text-xl md:text-2xl font-bold tracking-tight text-text-heading dark:text-text-dark-h">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="mt-5 text-base md:text-lg leading-[1.75] text-text-body dark:text-text-dark-b">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="mt-5 space-y-2.5 list-disc pl-6 text-base md:text-lg leading-[1.7] text-text-body dark:text-text-dark-b marker:text-accent">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="mt-5 space-y-2.5 list-decimal pl-6 text-base md:text-lg leading-[1.7] text-text-body dark:text-text-dark-b marker:text-accent marker:font-bold">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => <li className="pl-1">{children}</li>,
                  blockquote: ({ children }) => (
                    <blockquote className="mt-6 border-l-4 border-accent bg-accent/5 px-5 py-3 rounded-r-md italic text-text-body dark:text-text-dark-b">
                      {children}
                    </blockquote>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-bold text-text-heading dark:text-text-dark-h">
                      {children}
                    </strong>
                  ),
                  code: ({ children }) => (
                    <code className="rounded bg-primary-50 dark:bg-bg-dark-card px-1.5 py-0.5 text-sm font-mono text-primary-800 dark:text-accent">
                      {children}
                    </code>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      className="font-medium text-primary-700 dark:text-accent underline underline-offset-4 hover:no-underline"
                    >
                      {children}
                    </a>
                  ),
                  hr: () => (
                    <hr className="my-12 border-gray-200 dark:border-accent/15" />
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
        </section>

        {/* Prev / Next */}
        {(prev || next) && (
          <section className="pb-16">
            <div className="container-page">
              <div className="mx-auto max-w-3xl grid gap-4 sm:grid-cols-2">
                {prev ? (
                  <Link
                    href={`/blog/${prev.slug}`}
                    className="group rounded-card border border-gray-200/70 bg-bg-light-card p-5 shadow-card transition-all duration-300 hover:border-accent/40 hover:shadow-card-hover dark:border-accent/15 dark:bg-bg-dark-card"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent inline-flex items-center gap-1.5">
                      <ArrowLeft className="h-3 w-3" aria-hidden="true" />
                      Newer post
                    </p>
                    <p className="mt-2 font-bold text-text-heading dark:text-text-dark-h group-hover:text-primary-700 dark:group-hover:text-accent">
                      {prev.title}
                    </p>
                  </Link>
                ) : (
                  <div />
                )}
                {next ? (
                  <Link
                    href={`/blog/${next.slug}`}
                    className="group rounded-card border border-gray-200/70 bg-bg-light-card p-5 shadow-card transition-all duration-300 hover:border-accent/40 hover:shadow-card-hover dark:border-accent/15 dark:bg-bg-dark-card sm:text-right"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent inline-flex items-center gap-1.5 sm:justify-end">
                      Older post
                      <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </p>
                    <p className="mt-2 font-bold text-text-heading dark:text-text-dark-h group-hover:text-primary-700 dark:group-hover:text-accent">
                      {next.title}
                    </p>
                  </Link>
                ) : (
                  <div />
                )}
              </div>

              <div className="mt-10 text-center">
                <Button href="/blog" variant="outline" size="md" withArrow>
                  All articles
                </Button>
              </div>
            </div>
          </section>
        )}
      </article>

      <ContactCTA />
    </>
  );
}
