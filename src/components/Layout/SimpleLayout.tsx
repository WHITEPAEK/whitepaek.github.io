import React from "react";
import { cn } from "@/lib/cn";
import Container from "@/components/Container/Container.tsx";

interface SimpleLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const SimpleLayout = ({
  title,
  description,
  children,
  className,
  ...props
}: SimpleLayoutProps) => {
  return (
    <Container className={cn("py-10", className)} {...props}>
      <div className="py-10">
        <header>
          <h1 className="relative inline-block text-3xl font-bold tracking-tight text-gray-900 after:absolute after:bottom-0 after:left-0 after:h-[4px] after:w-full after:origin-left after:scale-x-125 after:transform after:bg-red-600 after:content-['']">
            {title}
          </h1>
          {description && (
            <p className="mt-4 text-base text-gray-500">{description}</p>
          )}
        </header>
      </div>
      {children}
    </Container>
  );
};

export default SimpleLayout;
