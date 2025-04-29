import Container from "@/components/Container/Container.tsx";
import React from "react";
import type { CollectionEntry, CollectionKey } from "astro:content";
import { formatDate } from "@/utils/formatDate.ts";

interface DiaryProps {
  title: string;
  description: string;
  posts: CollectionEntry<CollectionKey>[];
}

const Diary = ({ title, description, posts }: DiaryProps) => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
            {title}
          </h2>
          <p className="mt-2 text-lg/8 text-gray-600">{description}</p>

          <div className="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
            <ul role="list" className="space-y-6">
              {posts.map((post) => (
                <li key={post.slug} className="relative flex gap-x-4">
                  <div className="flex-auto rounded-md p-3 ring-1 ring-gray-200 ring-inset">
                    <div className="flex justify-between gap-x-4">
                      <div className="py-0.5 text-xs/5 text-gray-500">
                        <span className="font-medium text-gray-900">
                          {post.data.title}
                        </span>
                      </div>
                      <time
                        dateTime={post.data.pubDate.toDateString()}
                        className="flex-none py-0.5 text-xs/5 text-gray-500"
                      >
                        {formatDate(post.data.pubDate)}
                      </time>
                    </div>
                    <pre className="mt-1 max-w-full overflow-x-auto text-sm/6 break-words whitespace-pre-wrap text-gray-500">
                      {post.body}
                    </pre>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Diary;
