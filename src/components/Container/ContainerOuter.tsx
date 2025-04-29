import React, { forwardRef } from "react";
import { cn } from "@/lib/cn";

interface IContainerOuterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ContainerOuter = forwardRef<HTMLDivElement, IContainerOuterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("sm:px-8", className)} {...props}>
        <div className="mx-auto w-full max-w-7xl lg:px-8">{children}</div>
      </div>
    );
  },
);

export default ContainerOuter;
