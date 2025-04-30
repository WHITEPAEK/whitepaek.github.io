import React from "react";
import { cn } from "@/lib/cn";

interface ContainerInnerProps extends React.HTMLAttributes<HTMLDivElement> {}

const ContainerInner = ({ className, ...props }: ContainerInnerProps) => (
  <div className={cn("mx-auto max-w-3xl", className)} {...props} />
);

export default ContainerInner;
