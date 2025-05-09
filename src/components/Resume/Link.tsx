import React from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

const Link = ({ children, ...props }: LinkProps) => {
  return (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-x-1 hover:underline"
    >
      {children}
      <ArrowTopRightOnSquareIcon className="size-4" aria-hidden="true" />
    </a>
  );
};

export default Link;
