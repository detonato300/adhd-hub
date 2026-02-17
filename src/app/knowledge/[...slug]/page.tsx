import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ComponentType } from "react";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

// Mapowanie ścieżek na komponenty MDX
// W Next.js 15 App Router, dynamiczne importy z relatywnymi ścieżkami muszą być jawne
const mdxComponents: Record<string, ComponentType> = {
  "manual/mozh-adhd": dynamic(() => import("../manual/mozh-adhd.mdx")),
  "merytoryka/dopamina": dynamic(() => import("../merytoryka/dopamina.mdx")),
  "merytoryka/podatek-adhd": dynamic(() => import("../merytoryka/podatek-adhd.mdx")),
  "wiki/about": dynamic(() => import("../wiki/about.mdx")),
  "wiki/architecture": dynamic(() => import("../wiki/architecture.mdx")),
  "wiki/changelog": dynamic(() => import("../wiki/changelog.mdx")),
  "wiki/zero-to-hero": dynamic(() => import("../wiki/zero-to-hero.mdx")),
  "youtube/adhd-kariera": dynamic(() => import("../youtube/adhd-kariera.mdx")),
  "youtube/cudowna-metoda": dynamic(() => import("../youtube/cudowna-metoda.mdx")),
  "youtube/lista-todo": dynamic(() => import("../youtube/lista-todo.mdx")),
};

export function generateStaticParams() {
  return Object.keys(mdxComponents).map((key) => ({
    slug: key.split("/"),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const path = slug.join("/");
  
  return {
    title: `${path.split("/").pop()} - Wiedza ADHD HUB`,
  };
}

export default async function KnowledgePage({ params }: PageProps) {
  const { slug } = await params;
  const path = slug.join("/");
  
  const Content = mdxComponents[path];

  if (!Content) {
    notFound();
  }

  return (
    <div className="prose prose-slate dark:prose-invert max-w-none animate-in fade-in duration-500">
      <Content />
    </div>
  );
}
