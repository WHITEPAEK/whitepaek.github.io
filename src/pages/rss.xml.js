import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const logs = await getCollection("logs");
  const posts = await getCollection("posts");
  const diary = await getCollection("diary");

  const allItems = [...logs, ...posts, ...diary];
  allItems.sort((a, b) => b.data.pubDate - a.data.pubDate);

  return rss({
    title: "WHITEPAEK 블로그",
    description:
      "소프트웨어 기술 지식과 깊이 있는 경험을 공유하는 블로그입니다.",
    site: context.site,
    items: allItems.map((item) => ({
      title: item.data.title,
      pubDate: item.data.pubDate,
      link: `/${item.collection}/${item.id}/`,
    })),
  });
}
