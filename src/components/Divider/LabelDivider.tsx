import React from "react";
import { cn } from "@/lib/cn";

interface LabelDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
}

const LabelDivider = ({ className, label }: LabelDividerProps) => {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-white px-2 text-sm text-gray-500">{label}</span>
      </div>
    </div>
  );
};

export default LabelDivider;
