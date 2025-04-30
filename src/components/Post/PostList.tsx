import List from "@/components/List/List.tsx";
import ListItem from "@/components/List/ListItem.tsx";
import PostCard from "@/components/Post/PostCard.tsx";
import SimpleLayout from "@/components/Layout/SimpleLayout.tsx";
import type { Page } from "astro";
import Pagination from "@/components/Pagination/Pagination.tsx";

interface PostListProps {
  title: string;
  description?: string;
  page: Page;
}

const PostList = ({ title, description, page }: PostListProps) => {
  return (
    <SimpleLayout title={title} description={description}>
      <List>
        {page.data.map((post) => {
          return (
            <ListItem key={post.slug}>
              <PostCard
                collection={post.collection}
                slug={post.slug}
                title={post.data.title}
                pubDate={post.data.pubDate}
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
    </SimpleLayout>
  );
};

export default PostList;
