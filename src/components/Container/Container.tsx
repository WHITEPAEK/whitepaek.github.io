import React from "react";
import { forwardRef } from "react";
import ContainerOuter from "@/components/Container/ContainerOuter.tsx";
import ContainerInner from "@/components/Container/ContainerInner.tsx";

interface IContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Container = forwardRef<HTMLDivElement, IContainerProps>(
  ({ children, ...props }, ref) => {
    return (
      <ContainerOuter ref={ref} {...props}>
        <ContainerInner>{children}</ContainerInner>
      </ContainerOuter>
    );
  },
);

export default Container;
