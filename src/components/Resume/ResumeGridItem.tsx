import React from "react";

interface ResumeGridItemProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
}

const ResumeGridItem = ({ leftContent, rightContent }: ResumeGridItemProps) => {
  return (
    <div className="grid grid-cols-1 gap-y-2 sm:grid-cols-12 sm:gap-x-8">
      <div className="sm:col-span-4">{leftContent}</div>
      <div className="sm:col-span-8">{rightContent}</div>
    </div>
  );
};

export default ResumeGridItem;
