import React from "react";
import SimpleLayout from "@/components/Layout/SimpleLayout.tsx";
import DiaryCard from "@/components/Diary/DiaryCard.tsx";
import type { Page } from "astro";
import Pagination from "@/components/Pagination/Pagination.tsx";

interface DiaryProps {
  title: string;
  description: string;
  page: Page;
}

const Diary = ({ title, description, page }: DiaryProps) => {
  return (
    <SimpleLayout title={title} description={description}>
      {page.data.map((post) => (
        <DiaryCard
          key={post.slug}
          title={post.data.title}
          pubDate={post.data.pubDate}
          body={post.body}
        />
      ))}
      <Pagination
        currentPage={page.currentPage}
        lastPage={page.lastPage}
        currentUrl={page.url.current}
        prevUrl={page.url.prev}
        nextUrl={page.url.next}
      />
    </SimpleLayout>
  );
};

export default Diary;
