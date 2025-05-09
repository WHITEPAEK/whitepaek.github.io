import React from "react";

interface ResumeSectionProps {
  title: string;
  children: React.ReactNode;
}

const ResumeSection = ({ title, children }: ResumeSectionProps) => {
  return (
    <section className="my-16">
      <h2 className="border-b border-gray-200 text-3xl font-bold text-gray-900">
        {title}
      </h2>
      <div className="mt-6 space-y-8">{children}</div>
    </section>
  );
};

export default ResumeSection;
