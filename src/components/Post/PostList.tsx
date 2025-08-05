import List from "@/components/List/List";
import ListItem from "@/components/List/ListItem";
import PostCard from "@/components/Post/PostCard";
import PageLayout from "@/components/Layout/PageLayout";
import type { Page } from "astro";
import Pagination from "@/components/Pagination/Pagination";

interface PostListProps {
  title: string;
  description?: string;
  page: Page;
}

const PostList = ({ title, description, page }: PostListProps) => {
  return (
    <PageLayout title={title} description={description}>
      {page.data.length === 0 && (
        <p className="py-12 text-center text-gray-400">
          아직 작성된 글이 없습니다.
        </p>
      )}

      {page.data.length > 0 && (
        <>
          <List>
            {page.data.map((post) => {
              return (
                <ListItem key={post.id}>
                  <PostCard
                    collection={post.collection}
                    id={post.id}
                    headline={post.data.headline}
                    datePublished={post.data.datePublished}
                    body={post.body}
                  />
                </ListItem>
              );
            })}
          </List>
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

export default PostList;
