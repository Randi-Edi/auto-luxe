"use client";

import { PortableText } from '@portabletext/react';

interface PortableTextRendererProps {
  content: any[];
}

export default function PortableTextRenderer({ content }: PortableTextRendererProps) {
  return (
    <div className="prose prose-invert max-w-none">
      <PortableText
        value={content}
        components={{
          block: {
            h2: ({ children }) => (
              <h2 className="font-display text-2xl font-bold text-foreground mb-4 mt-8 first:mt-0">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="font-semibold text-foreground text-lg mt-6 mb-3">
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h4 className="font-semibold text-foreground mt-4 mb-2">
                {children}
              </h4>
            ),
            normal: ({ children }) => (
              <p className="text-muted-foreground leading-relaxed mb-4">
                {children}
              </p>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-silver-light pl-6 py-4 my-6 italic text-lg text-foreground/90 bg-silver/5 rounded-r-lg">
                {children}
              </blockquote>
            ),
          },
          list: {
            bullet: ({ children }) => (
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
                {children}
              </ul>
            ),
            number: ({ children }) => (
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-4 mb-4">
                {children}
              </ol>
            ),
          },
          listItem: {
            bullet: ({ children }) => <li>{children}</li>,
            number: ({ children }) => <li>{children}</li>,
          },
          marks: {
            strong: ({ children }) => (
              <strong className="font-semibold text-foreground">{children}</strong>
            ),
            em: ({ children }) => (
              <em className="italic">{children}</em>
            ),
            link: ({ value, children }) => {
              const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
              return (
                <a
                  href={value?.href}
                  target={target}
                  rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                  className="text-silver-light hover:text-foreground underline transition-colors"
                >
                  {children}
                </a>
              );
            },
          },
        }}
      />
    </div>
  );
}

