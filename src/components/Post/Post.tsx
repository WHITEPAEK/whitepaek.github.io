import React from "react";
import Container from "@/components/Container/Container";
import { cn } from "@/lib/cn";
import { formatDate } from "@/utils/formatDate";

import type { CollectionEntry, CollectionKey } from "astro:content";

interface PostProps {
  frontmatter: CollectionEntry<CollectionKey>["data"];
  children: React.ReactNode;
}

const Post = ({ frontmatter, children }: PostProps) => {
  return (
    <Container className="py-16">
      <header className="mb-12">
        <p className="mb-2 text-sm text-gray-500">
          {formatDate(frontmatter.pubDate)}
        </p>
        <h1 className="text-4xl font-bold tracking-tight break-words text-gray-900">
          {frontmatter.title}
        </h1>
      </header>

      <div
        className={cn(
          "prose prose-base max-w-none text-gray-800",
          "prose-headings:scroll-mt-24 prose-img:rounded-xl",
        )}
      >
        {children}
      </div>
    </Container>
  );
};

export default Post;
