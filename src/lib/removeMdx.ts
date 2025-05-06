import removeMarkdown from "remove-markdown";

export function removeMdx(raw: string): string {
  return removeMarkdown(
    raw
      .replace(/^import .*?$/gm, "")
      .replace(/<[^>]+>/g, "")
      .replace(/\{.*?}/gs, ""),
  ).trim();
}
