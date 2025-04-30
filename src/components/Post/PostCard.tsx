import { formatDate } from "@/utils/formatDate.ts";

interface PostCardProps {
  collection: string;
  slug: string;
  title: string;
  pubDate: Date;
  body: string;
}

const PostCard = ({
  collection,
  slug,
  title,
  pubDate,
  body,
}: PostCardProps) => {
  return (
    <article className="flex w-full flex-col items-start justify-between">
      <div className="flex items-center gap-x-4 text-xs">
        <time
          dateTime={new Date(pubDate).toISOString()}
          className="text-gray-500"
        >
          {formatDate(pubDate)}
        </time>
        {/*{category && (
          <a
            href={`/${category.toLowerCase()}`}
            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
          >
            {category}
          </a>
        )}*/}
      </div>
      <div className="group relative">
        <h3 className="mt-3 text-lg/6 font-semibold text-gray-900">
          <a href={`/${collection}/${slug}`}>
            <span className="absolute inset-0" />
            {title}
          </a>
        </h3>
        <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">{body}</p>
      </div>
    </article>
  );
};

export default PostCard;
