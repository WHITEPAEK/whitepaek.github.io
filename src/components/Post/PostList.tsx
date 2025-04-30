import type { CollectionEntry, CollectionKey } from "astro:content";
import List from "@/components/List/List.tsx";
import ListItem from "@/components/List/ListItem.tsx";
import PostCard from "@/components/Post/PostCard.tsx";
import SimpleLayout from "@/components/Layout/SimpleLayout.tsx";

interface PostListProps {
  title: string;
  description?: string;
  posts: CollectionEntry<CollectionKey>[];
}

const PostList = ({ title, description, posts }: PostListProps) => {
  return (
    <SimpleLayout title={title} description={description}>
      <List>
        {posts.map((post) => {
          return (
            <ListItem>
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
    </SimpleLayout>
  );
};

export default PostList;
