import React, { forwardRef } from "react";
import { cn } from "@/lib/cn";
import ContainerOuter from "./ContainerOuter";
import ContainerInner from "./ContainerInner";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className, ...props }, ref) => (
    <ContainerOuter ref={ref} className={cn(className)} {...props}>
      <ContainerInner>{children}</ContainerInner>
    </ContainerOuter>
  ),
);

Container.displayName = "Container";
export default Container;
