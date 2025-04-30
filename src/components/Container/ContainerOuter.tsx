import React, { forwardRef } from "react";
import { cn } from "@/lib/cn";

interface ContainerOuterProps extends React.HTMLAttributes<HTMLDivElement> {}

const ContainerOuter = forwardRef<HTMLDivElement, ContainerOuterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  ),
);

ContainerOuter.displayName = "ContainerOuter";
export default ContainerOuter;
