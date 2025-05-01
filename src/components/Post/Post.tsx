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

      <div className="relative mt-16">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-2 text-sm text-gray-500">끝</span>
        </div>
      </div>
    </Container>
  );
};

export default Post;
