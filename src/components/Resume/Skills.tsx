import React from "react";
import ResumeSection from "@/components/Resume/ResumeSection";

interface SkillGroup {
  category: string;
  items: string[];
}

const skills: SkillGroup[] = [
  {
    category: "Backend",
    items: [
      "Java",
      "Spring Boot",
      "Spring Framework",
      "Spring Data JPA",
      "Spring Data Redis",
      "Spring Security",
      "Spring Session Hazelcast",
      "Spring Batch",
      "Querydsl",
      "MyBatis",
      "Gradle",
      "Maven",
      "JUnit",
      "IntelliJ IDEA",
    ],
  },
  {
    category: "DevOps",
    items: [
      "MySQL",
      "Redis",
      "ActiveMQ",
      "AWS EC2",
      "AWS RDS",
      "AWS ElastiCache",
      "AWS S3",
      "AWS CodeDeploy",
      "AKS",
      "ACR",
      "Azure Service Bus",
      "Azure Files",
      "Azure Blob Storage",
      "Datadog",
      "Tomcat",
      "Docker",
      "Linux",
      "CentOS",
      "Jenkins",
      "GitLab CI",
      "Argo CD",
      "GitHub Actions",
      "JMeter",
      "Git",
      "Bitbucket",
      "Jira",
      "Confluence",
    ],
  },
  {
    category: "Frontend",
    items: [
      "HTML",
      "TailwindCSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Astro",
      "WebStorm",
    ],
  },
];

const Skills = () => {
  return (
    <ResumeSection title="Skills">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, index) => (
          <div key={index}>
            <h3 className="mb-3 text-lg font-semibold text-gray-800">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item, i) => (
                <span
                  key={i}
                  className="rounded bg-gray-100 px-3 py-1 text-sm text-gray-800"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ResumeSection>
  );
};

export default Skills;
