import React from "react";
import Container from "@/components/Container/Container";
import Card from "@/components/Posts/Card.tsx";
import type { CollectionEntry, CollectionKey } from "astro:content";

interface PostsProps {
  title: string;
  description: string;
  posts: CollectionEntry<CollectionKey>[];
}

const Posts = ({ title, description, posts }: PostsProps) => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
            {title}
          </h2>
          <p className="mt-2 text-base/8 text-gray-600">{description}</p>

          <div className="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-12 sm:pt-12">
            {posts.map((post) => (
              <Card key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Posts;
