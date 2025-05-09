import React from "react";
import ResumeSection from "@/components/Resume/ResumeSection.tsx";
import ResumeGridItem from "@/components/Resume/ResumeGridItem.tsx";

interface WorkExperience {
  period: string;
  duration: string;
  company: string;
  position: string;
  responsibilities: string[];
}

const workExperiences: WorkExperience[] = [
  {
    period: "2024. 01 - 2025. 04",
    duration: "1년 4개월",
    company: "아사삭",
    position: "Backend engineer & Co-Founder",
    responsibilities: ["..."],
  },
  {
    period: "2020. 01 - 2023. 12",
    duration: "4년",
    company: "비디",
    position: "Backend engineer",
    responsibilities: ["..."],
  },
];

const WorkExperience = () => {
  return (
    <ResumeSection title="Work Experience">
      {workExperiences.map((exp, index: number) => (
        <ResumeGridItem
          key={index}
          leftContent={
            <>
              <p className="text-gray-500">{exp.period}</p>
              <p className="text-gray-400">{exp.duration}</p>
              <h3 className="mt-2 text-xl font-semibold text-gray-800">
                {exp.company}
              </h3>
            </>
          }
          rightContent={
            <>
              <p className="mb-2 text-gray-700">{exp.position}</p>
              <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-gray-600">
                {exp.responsibilities.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </>
          }
        />
      ))}
    </ResumeSection>
  );
};

export default WorkExperience;
