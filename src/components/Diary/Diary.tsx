import React from "react";
import type { CollectionEntry, CollectionKey } from "astro:content";
import SimpleLayout from "@/components/Layout/SimpleLayout.tsx";
import DiaryCard from "@/components/Diary/DiaryCard.tsx";

interface DiaryProps {
  title: string;
  description: string;
  posts: CollectionEntry<CollectionKey>[];
}

const Diary = ({ title, description, posts }: DiaryProps) => {
  return (
    <SimpleLayout title={title} description={description}>
      {posts.map((post) => (
        <DiaryCard
          title={post.data.title}
          pubDate={post.data.pubDate}
          body={post.body}
        />
      ))}
    </SimpleLayout>
  );
};

export default Diary;
