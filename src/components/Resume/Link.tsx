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
      className="inline hover:underline"
    >
      <span className="break-words">{children}</span>
      <ArrowTopRightOnSquareIcon
        className="ml-1 inline size-4 align-text-top"
        aria-hidden="true"
      />
    </a>
  );
};

export default Link;
