import React from "react";
import ResumeSection from "@/components/Resume/ResumeSection";
import ResumeGridItem from "@/components/Resume/ResumeGridItem";

interface Education {
  period: string;
  school: string;
  major: string;
  degree: string;
}

const educations: Education[] = [
  {
    period: "2021. 03 - 2023. 02",
    school: "성균관대학교",
    major: "소프트웨어학과",
    degree: "석사",
  },
  {
    period: "2013. 03 - 2020. 02",
    school: "한신대학교",
    major: "컴퓨터공학과",
    degree: "학사",
  },
];

const Education = () => {
  return (
    <ResumeSection title="Education">
      {educations.map((edu, index: number) => (
        <ResumeGridItem
          key={index}
          leftContent={
            <>
              <p className="text-gray-500">{edu.period}</p>
            </>
          }
          rightContent={
            <>
              <p className="text-lg font-medium text-gray-800">{edu.school}</p>
              <p className="text-sm text-gray-600">{edu.major}</p>
              <p className="text-sm text-gray-500">{edu.degree}</p>
            </>
          }
        />
      ))}
    </ResumeSection>
  );
};

export default Education;
