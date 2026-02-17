import type { MDXComponents } from 'mdx/types'
import { TTSPlayer } from '@/components/tts-player'
import { Mermaid } from '@/components/mermaid'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="text-3xl md:text-4xl font-bold mt-12 mb-6 tracking-tight">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-semibold mt-10 mb-4 text-primary tracking-tight">{children}</h2>,
    p: ({ children }) => <p className="leading-relaxed mb-6 text-foreground/90 text-lg">{children}</p>,
    ul: ({ children }) => <ul className="list-disc list-outside mb-6 space-y-3 ml-6">{children}</ul>,
    li: ({ children }) => <li className="pl-2">{children}</li>,
    hr: () => <hr className="my-12 border-primary/10" />,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary/50 bg-primary/5 pl-6 py-4 italic my-8 text-foreground/80 rounded-r-lg">
        {children}
      </blockquote>
    ),
    code: ({ children, className }) => {
      const isMermaid = className === 'language-mermaid';
      if (isMermaid) {
        return <Mermaid chart={String(children).trim()} />;
      }
      return <code className={className}>{children}</code>;
    },
    wrapper: ({ children }) => {
      return (
        <article id="mdx-article" className="max-w-3xl mx-auto pb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <header className="mb-8">
            <Link href="/" passHref>
              <Button variant="ghost" size="sm" className="gap-2 mb-8 -ml-2 text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft size={16} /> Powrót do HUBa
              </Button>
            </Link>
            <TTSPlayer />
          </header>
          {children}
        </article>
      );
    },
    ...components,
  }
}
