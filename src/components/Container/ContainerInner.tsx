import React from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/cn";

interface IContainerInnerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ContainerInner = forwardRef<HTMLDivElement, IContainerInnerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative px-4 sm:px-8 lg:px-12", className)}
        {...props}
      >
        <div className="mx-auto w-full max-w-2xl lg:max-w-5xl">{children}</div>
      </div>
    );
  },
);

export default ContainerInner;
