import React from "react";

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
    <section className="mt-16">
      <h2 className="border-b border-gray-200 text-3xl font-bold text-gray-900">
        Education
      </h2>
      <div className="mt-6 space-y-8">
        {educations.map((edu, index: number) => (
          <div
            key={index}
            className="grid grid-cols-1 gap-y-2 sm:grid-cols-12 sm:gap-x-8"
          >
            <div className="text-gray-500 sm:col-span-4">{edu.period}</div>

            <div className="sm:col-span-8">
              <p className="text-lg font-medium text-gray-800">{edu.school}</p>
              <p className="text-sm text-gray-600">{edu.major}</p>
              <p className="text-sm text-gray-500">{edu.degree}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
