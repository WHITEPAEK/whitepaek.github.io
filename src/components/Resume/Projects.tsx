import React from "react";

interface DescriptionItem {
  text: string;
  url?: string;
}

interface Project {
  period: string;
  title: string;
  description: DescriptionItem[];
  techStack: string[];
}

const projects: Project[] = [
  {
    period: "2022. 08 - 2023. 12",
    title: "SKT 에이닷 스튜디오",
    description: [
      {
        text: "...",
        url: "",
      },
    ],
    techStack: ["Spring Boot", "MySQL"],
  },
  {
    period: "2021. 04 - 2023. 12",
    title: "SKT 이프랜드 스튜디오",
    description: [
      {
        text: "...",
        url: "",
      },
    ],
    techStack: ["Spring Boot", "MySQL"],
  },
  {
    period: "2020. 12 - 2021. 03",
    title: "LG 퀵헬프",
    description: [
      {
        text: "...",
        url: "",
      },
    ],
    techStack: ["Spring Boot", "Oracle"],
  },
  {
    period: "2020. 01 - 2020. 12",
    title: "SKT 점프 AR",
    description: [
      {
        text: "...",
        url: "",
      },
    ],
    techStack: ["Spring Framework", "Tomcat", "MySQL"],
  },
];

const Projects = () => {
  return (
    <section className="mt-16">
      <h2 className="border-b border-gray-200 text-3xl font-bold text-gray-900">
        Projects
      </h2>
      <div className="mt-6 space-y-12">
        {projects.map((project, index: number) => (
          <div
            key={index}
            className="grid grid-cols-1 gap-y-4 sm:grid-cols-12 sm:gap-x-8"
          >
            <div className="sm:col-span-4">
              <p className="text-gray-500">{project.period}</p>
              <h3 className="mt-2 text-xl font-semibold text-gray-800">
                {project.title}
              </h3>
            </div>

            <div className="space-y-2 sm:col-span-8">
              <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-gray-700">
                {project.description.map((item, i) => (
                  <li key={i}>
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {item.text}
                      </a>
                    ) : (
                      item.text
                    )}
                  </li>
                ))}
              </ul>
              <ul className="flex flex-wrap gap-2 text-xs text-gray-600">
                {project.techStack.map((tech, i) => (
                  <li
                    key={i}
                    className="rounded bg-gray-100 px-2 py-1 text-gray-800"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
