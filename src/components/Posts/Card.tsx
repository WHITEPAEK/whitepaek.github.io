import React from "react";
import { formatDate } from "@/utils/formatDate.ts";
import type { CollectionEntry, CollectionKey } from "astro:content";

interface CardProps {
  post: CollectionEntry<CollectionKey>;
}

const Card = ({ post }: CardProps) => {
  const frontmatter = post.data;

  return (
    <article className="flex max-w-full flex-col items-start justify-between">
      <div className="flex items-center gap-x-4 text-xs">
        <time
          dateTime={frontmatter.pubDate.toDateString()}
          className="text-gray-500"
        >
          {formatDate(frontmatter.pubDate)}
        </time>
        {/*<span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">
          태그
        </span>*/}
      </div>

      <div className="group relative">
        <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
          <a href={`/${post.collection}/${post.slug}`}>
            <span className="absolute inset-0" />
            {frontmatter.title}
          </a>
        </h3>
        <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">{post.body}</p>
      </div>
    </article>
  );
};

export default Card;
