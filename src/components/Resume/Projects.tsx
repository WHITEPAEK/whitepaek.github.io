import React from "react";
import ResumeSection from "@/components/Resume/ResumeSection.tsx";
import ResumeGridItem from "@/components/Resume/ResumeGridItem.tsx";
import Link from "@/components/Resume/Link.tsx";

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
    period: "2024. 01 - 2025. 04",
    title: "아사삭 스토어",
    description: [
      {
        text: "...",
        url: "",
      },
    ],
    techStack: ["Spring Boot", "MySQL"],
  },
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
    <ResumeSection title="Projects">
      {projects.map((project, index: number) => (
        <ResumeGridItem
          key={index}
          leftContent={
            <>
              <p className="text-gray-500">{project.period}</p>
              <h3 className="mt-2 text-xl font-semibold text-gray-800">
                {project.title}
              </h3>
            </>
          }
          rightContent={
            <>
              <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-gray-700">
                {project.description.map((item, i) => (
                  <li key={i}>
                    {item.url ? (
                      <Link href={item.url}>{item.text}</Link>
                    ) : (
                      item.text
                    )}
                  </li>
                ))}
              </ul>

              <ul className="mt-2 flex flex-wrap gap-2 text-xs text-gray-600">
                {project.techStack.map((tech, i) => (
                  <li
                    key={i}
                    className="rounded bg-gray-100 px-2 py-1 text-gray-800"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </>
          }
        />
      ))}
    </ResumeSection>
  );
};

export default Projects;
