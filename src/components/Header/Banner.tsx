import React, { useState } from "react";
import { cn } from "@/lib/cn";

interface BannerProps {
  message: string;
  className?: string;
}

const Banner = ({ message, className }: BannerProps) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed top-0 z-50 w-full bg-gray-900 px-6 py-2.5 sm:px-3.5",
        className,
      )}
    >
      <div className="flex items-center gap-x-6 sm:before:flex-1">
        <p className="text-sm/6 text-white">{message}</p>
        <div className="flex flex-1 justify-end">
          <button
            type="button"
            onClick={() => setVisible(false)}
            className="-m-3 p-3 focus-visible:-outline-offset-4"
          >
            <span className="sr-only">Dismiss</span>
            <svg
              className="size-5 cursor-pointer text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
