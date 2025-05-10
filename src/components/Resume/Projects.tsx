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
    techStack: [
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
    description: [
      {
        text: "...",
        url: "",
      },
    ],
    techStack: [
      "Spring Boot",
      "MySQL",
      "MyBatis",
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
    description: [
      {
        text: "...",
        url: "",
      },
    ],
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
      "Jenkins",
      "GitLab CI",
      "Argo CD",
    ],
  },
  {
    period: "2020. 12 - 2021. 03",
    title: "LG 퀵헬프",
    description: [
      {
        text: "레거시 시스템 신규 고도화 작업",
      },
      {
        text: "보일러플레이트 코드 리팩토링 작업으로 구조 개선",
      },
      {
        text: "비효율적인 비즈니스 로직 개선으로 응답 속도 향상",
      },
      {
        text: "SQL 튜닝으로 시스템 안정성 확보 및 장애 예방",
      },
      {
        text: "JWT 로그인 인증 방식 적용",
      },
    ],
    techStack: ["Java", "Spring Boot", "MyBatis", "Oracle", "Maven"],
  },
  {
    period: "2020. 01 - 2020. 12",
    title: "SKT 점프 AR",
    description: [
      {
        text: "앱 API, 콘텐츠 관리 시스템 개발 및 운영",
        url: "https://news.sktelecom.com/tag/%EC%A0%90%ED%94%84ar",
      },
      {
        text: "AR Object 관리 CMS 신규 기능 추가",
      },
      {
        text: "동물원 AR Object 랭킹 기능 신규 API 추가",
      },
      {
        text: "UGC 및 댓글 검수 CMS 신규 기능 추가",
      },
      {
        text: "Azure AI Vision을 이용한 UGC 성인/폭력/선정성 콘텐츠 이미지 감지를 위한 MVP 개발 및 테스트",
      },
      {
        text: "UGC 좋아요 기능 신규 API 추가",
      },
      {
        text: "WAS 이중화 세션 관리를 위한 Spring Session Hazelcast 적용",
      },
      {
        text: "JMeter를 이용한 API 부하 테스트로 안정성 검증",
      },
      {
        text: "HikariCP 설정 최적화 및 SQL 튜닝으로 API 응답 속도 개선",
      },
      {
        text: "비즈니스 로직 개선으로 API 처리 속도 향상",
      },
    ],
    techStack: [
      "Java",
      "Spring Framework",
      "Spring Session Hazelcast",
      "JSP",
      "Tomcat",
      "MySQL",
      "MyBatis",
      "Maven",
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
