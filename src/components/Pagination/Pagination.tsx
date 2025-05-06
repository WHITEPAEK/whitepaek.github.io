import React from "react";
import { cn } from "@/lib/cn";

/*
 * currentPage: 현재 페이지 번호
 * lastPage: 총 페이지 수
 * currentUrl: 현재 페이지의 URL
 * prevUrl: 이전 페이지의 URL (1페이지인 경우 undefined)
 * nextUrl: 다음 페이지의 URL (더 이상 페이지가 없는 경우 undefined)
 */
interface PaginationProps {
  currentPage: number;
  lastPage: number;
  currentUrl: string;
  prevUrl: string | undefined;
  nextUrl: string | undefined;
}

const Pagination = ({
  currentPage,
  lastPage,
  currentUrl,
  prevUrl,
  nextUrl,
}: PaginationProps) => {
  const basePath = currentUrl.split("/")[1];
  return (
    <nav className="mb-5 flex items-center justify-between border-t border-gray-200 sm:mb-10">
      <div className="-mt-px flex w-0 flex-1">
        {prevUrl && (
          <a
            href={prevUrl}
            className={cn(
              "inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500",
              prevUrl && "hover:border-gray-300 hover:text-gray-700",
            )}
          >
            <svg
              className="mr-3 size-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                fillRule="evenodd"
                d="M18 10a.75.75 0 0 1-.75.75H4.66l2.1 1.95a.75.75 0 1 1-1.02 1.1l-3.5-3.25a.75.75 0 0 1 0-1.1l3.5-3.25a.75.75 0 1 1 1.02 1.1l-2.1 1.95h12.59A.75.75 0 0 1 18 10Z"
                clipRule="evenodd"
              />
            </svg>
            이전
          </a>
        )}
      </div>

      <div className="hidden sm:-mt-px sm:flex">
        {Array.from({ length: lastPage }, (_, i) => {
          /* TODO: 추후 페이지 수가 증가하면 페이징 동작에 대한 기능 추가 필요.
           * Pagination UI Ref. https://tailwindcss.com/plus/ui-blocks/application-ui/navigation/pagination
           * Astro `paginate()` Ref. https://docs.astro.build/ko/reference/routing-reference/#paginate
           */
          const pageNum = i + 1;
          return (
            <a
              key={pageNum}
              href={pageNum === 1 ? `/${basePath}` : `/${basePath}/${pageNum}`}
              className={cn(
                "inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium",
                currentPage === pageNum
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
              )}
            >
              {i + 1}
            </a>
          );
        })}
      </div>

      <div className="-mt-px flex w-0 flex-1 justify-end">
        {nextUrl && (
          <a
            href={nextUrl}
            className={cn(
              "inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500",
              nextUrl && "hover:border-gray-300 hover:text-gray-700",
            )}
          >
            다음
            <svg
              className="ml-3 size-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                fillRule="evenodd"
                d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        )}
      </div>
    </nav>
  );
};

export default Pagination;
