import removeMarkdown from "remove-markdown";

export function removeMdx(raw: string): string {
  return removeMarkdown(
    raw
      .replace(/^import .*?$/gm, "") // import 제거
      .replace(/<[^>]+>/g, "") // JSX 태그 제거
      .replace(/\{.*?}/gs, "") // 중괄호 내 JS 제거
      .replace(/```[\s\S]*?```/g, "") // 코드 블록 제거
      .replace(/!\[\[([^|]+?)(?:\|([^|]*?))?(?:\|([^|]*?))?\]]/g, ""), // Wiki 이미지 구문 제거
  ).trim();
}
