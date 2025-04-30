import React from "react";
import { cn } from "@/lib/cn";

interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
}

const List = ({ children, className, ...props }: ListProps) => {
  return (
    <ul
      role="list"
      className={cn("divide-y divide-gray-200", className)}
      {...props}
    >
      {children}
    </ul>
  );
};

export default List;
