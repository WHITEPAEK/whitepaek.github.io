import React from "react";
import { cn } from "@/lib/cn";

interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
}

const ListItem = ({ children, className, ...props }: ListItemProps) => {
  return (
    <li className={cn("py-4", className)} {...props}>
      <div className="-mx-4 px-4 py-4 transition-all duration-200 hover:rounded-xl hover:bg-gray-50">
        {children}
      </div>
    </li>
  );
};

export default ListItem;
