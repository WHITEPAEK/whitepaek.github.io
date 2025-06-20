import React from "react";
import ResumeSection from "@/components/Resume/ResumeSection";
import ResumeGridItem from "@/components/Resume/ResumeGridItem";

interface Project {
  period: string;
  title: string;
  tasks: string[];
  techStack: string[];
}

const projects: Project[] = [
  {
    period: "2024. 01 - 2025. 04",
    title: "아사삭 스토어",
    tasks: ["..."],
    techStack: [
      "Java",
      "Spring Boot",
      "Spring Data JPA",
      "Querydsl",
      "JUnit",
      "Gradle",
      "AWS EC2",
      "AWS S3",
      "AWS RDS (MySQL)",
      "AWS ElastiCache (Redis)",
      "AWS CodeDeploy",
      "GitHub Actions",
    ],
  },
  {
    period: "2022. 08 - 2023. 12",
    title: "SKT 에이닷 스튜디오",
    tasks: ["..."],
    techStack: [
      "Java",
      "Spring Boot",
      "MyBatis",
      "MySQL",
      "ActiveMQ",
      "Maven",
      "AKS",
      "Azure Service Bus",
      "Azure Files",
      "Datadog",
      "GitLab CI",
      "Argo CD",
    ],
  },
  {
    period: "2021. 04 - 2023. 12",
    title: "SKT 이프랜드 스튜디오",
    tasks: ["..."],
    techStack: [
      "Java",
      "Spring Boot",
      "Spring Data JPA",
      "MyBatis",
      "MySQL",
      "Redis",
      "ActiveMQ",
      "Spring Batch",
      "Quartz",
      "Maven",
      "AKS",
      "Azure Service Bus",
      "Azure Files",
      "Azure Blob Storage",
      "Datadog",
      "GitLab CI",
      "Argo CD",
    ],
  },
  {
    period: "2020. 12 - 2021. 03",
    title: "LG 퀵헬프",
    tasks: ["..."],
    techStack: ["Java", "Spring Boot", "MyBatis", "Oracle", "Maven"],
  },
  {
    period: "2020. 01 - 2020. 12",
    title: "SKT 점프 AR",
    tasks: ["..."],
    techStack: [
      "Java",
      "Spring Framework",
      "Spring Session Hazelcast",
      "JSP",
      "Tomcat",
      "MySQL",
      "MyBatis",
      "Maven",
      "Jenkins",
      "JMeter",
      "Azure Blob Storage",
      "Azure AI Vision",
      "GitLab",
    ],
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
                {project.tasks.map((item, i) => (
                  <li key={i}>{item}</li>
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
