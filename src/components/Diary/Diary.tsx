import React from "react";
import PageLayout from "@/components/Layout/PageLayout";
import DiaryCard from "@/components/Diary/DiaryCard";
import type { Page } from "astro";
import Pagination from "@/components/Pagination/Pagination";

interface DiaryProps {
  title: string;
  description: string;
  page: Page;
}

const Diary = ({ title, description, page }: DiaryProps) => {
  return (
    <PageLayout title={title} description={description}>
      {page.data.length === 0 && (
        <p className="py-12 text-center text-gray-400">
          아직 작성된 글이 없습니다.
        </p>
      )}

      {page.data.length > 0 && (
        <>
          {page.data.map((post) => (
            <DiaryCard
              key={post.id}
              title={post.data.title}
              created={post.data.created}
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
        </>
      )}
    </PageLayout>
  );
};

export default Diary;
