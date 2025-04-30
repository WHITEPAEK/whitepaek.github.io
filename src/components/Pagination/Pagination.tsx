import React from "react";
import { cn } from "@/lib/cn";

/*
 * currentPage: 현재 페이지 번호
 * totalPages: 전체 페이지 수
 * onPageChange: 페이지 변경 시 콜백
 * visibleRange: 표시할 페이지 수 범위
 */
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  visibleRange?: number;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  visibleRange = 5,
}: PaginationProps) => {
  const start = Math.max(1, currentPage - Math.floor(visibleRange / 2));
  const end = Math.min(totalPages, start + visibleRange - 1);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <nav
      className="mt-5 flex items-center justify-between border-t border-gray-200 sm:mt-10"
      aria-label="Pagination"
    >
      {/* Previous */}
      <div className="-mt-px flex w-0 flex-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            "inline-flex items-center border-t-2 pt-4 pr-1 text-sm font-medium",
            currentPage === 1
              ? "cursor-not-allowed text-gray-300"
              : "text-gray-500 hover:border-gray-300 hover:text-gray-700",
          )}
        >
          <svg
            className="mr-3 size-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M18 10a.75.75 0 0 1-.75.75H4.66l2.1 1.95a.75.75 0 1 1-1.02 1.1l-3.5-3.25a.75.75 0 0 1 0-1.1l3.5-3.25a.75.75 0 1 1 1.02 1.1l-2.1 1.95h12.59A.75.75 0 0 1 18 10Z"
              clipRule="evenodd"
            />
          </svg>
          이전
        </button>
      </div>

      {/* Page Numbers */}
      <div className="hidden md:-mt-px md:flex">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={cn(
              "inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium",
              page === currentPage
                ? "border-red-600 text-red-600"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
            )}
          >
            {page}
          </button>
        ))}
        {end < totalPages && (
          <>
            <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
              ...
            </span>
            <button
              onClick={() => onPageChange(totalPages)}
              className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      {/* Next */}
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            "inline-flex items-center border-t-2 pt-4 pl-1 text-sm font-medium",
            currentPage === totalPages
              ? "cursor-not-allowed text-gray-300"
              : "text-gray-500 hover:border-gray-300 hover:text-gray-700",
          )}
        >
          다음
          <svg
            className="ml-3 size-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
