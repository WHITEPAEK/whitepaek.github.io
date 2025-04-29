import React from "react";
import Container from "@/components/Container/Container";
import { formatDate } from "@/utils/formatDate";

import type { CollectionEntry, CollectionKey } from "astro:content";

interface PostProps {
  frontmatter: CollectionEntry<CollectionKey>["data"];
  children: React.ReactNode;
}

const Post = ({ frontmatter, children }: PostProps) => {
  return (
    <Container className="mt-16 mb-16 lg:mt-32 lg:mb-32">
      <div className="lg:relative">
        <div className="mx-auto max-w-2xl">
          <article>
            <header className="flex flex-col">
              <h1 className="mt-6 text-4xl font-bold tracking-tight break-words text-zinc-800 sm:text-5xl">
                {frontmatter.title}
              </h1>
              <time
                dateTime={frontmatter.pubDate.toString()}
                className="order-first flex items-center text-base text-zinc-400"
              >
                <span className="h-4 w-0.5 rounded-full bg-zinc-200" />
                <span className="ml-3">{formatDate(frontmatter.pubDate)}</span>
              </time>
            </header>
            <div className="prose prose-sm lg:prose-base mt-8">{children}</div>
          </article>
        </div>
      </div>
    </Container>
  );
};

export default Post;
