import React from "react";
import ResumeSection from "@/components/Resume/ResumeSection.tsx";
import ResumeGridItem from "@/components/Resume/ResumeGridItem.tsx";

interface Project {
  period: string;
  title: string;
  description: string[];
  techStack: string[];
}

const projects: Project[] = [
  {
    period: "2024. 01 - 2025. 04",
    title: "아사삭 스토어",
    description: [
      "React + Spring Boot 기반 주문 시스템 설계·개발·운영",
      "AWS 기반 클라우드 인프라 설계 및 운영",
      "GitHub Actions + AWS CodeDeploy를 활용한 무중단 배포 환경 구축",
      "회원, 주문, 결제, 상품, 장바구니 등 핵심 도메인에 대한 MySQL 스키마 설계",
      "Socket 통신 방식의 NICE 휴대폰 본인인증 기능 구현",
      "Toss Payments 기본 결제 및 브랜드페이 기능 구현",
      "Bizgo 카카오 알림톡 기능 구현",
      "JWT 기반 Kakao, Google 회원가입/로그인 API 개발",
      "상품, 주문/결제, 장바구니 관련 API 설계 및 개발",
      "자동 주문 마감 기능 구현을 통한 주문 프로세스 개선",
      "픽업/배송 주문 기능 확장을 통한 사용자 편의성 강화",
      "Apache POI를 활용한 주문 상태별 엑셀 기능 개발",
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
      "에이닷 캐릭터, 모션, 아이템 Object 배포·관리를 위한 내부 시스템 설계 및 운영",
      "지속적인 Object 통합을 위한 마이그레이션 시스템 설계 및 구축",
      "신규 Object 빌드/배포를 위한 자동 프로세스 설계 및 개발",
      "레거시 Object 파일 검증 시스템 설계 및 개발",
      "성능 모니터링을 위한 Tracking 로깅 기능 개발",
      "Azure 기반 클라우드 인프라 구축 및 운영",
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
      "MAU 437만 규모의 ifland 아바타 코스튬/모션 Object 제작 플랫폼 설계·개발·운영",
      "Spring Boot 기반의 CP 웹 스튜디오, 어드민, API, 빌드 시스템 구조 설계 및 구축",
      "JWT 기반 OAuth 통합 로그인 기능 구현 (T아이디, Google, Apple, Kakao, Facebook)",
      "ActiveMQ 기반의 코스튬/모션 Object 빌드 프로세스 개발",
      "Object 빌드 버전 관리 프로세스 적용을 통한 시스템 안정성 향상",
      "Object 빌드/배포 시스템의 Event Driven 아키텍처 리팩터링으로 처리 속도 93.3% 향상",
      "WebGL 기반 CP 전용 코스튬/모션 제작 에디터 기능 개발",
      "제작된 3D Object 랜더링을 위한 WebGL Viewer 기능 적용",
      "코스튬 및 모션 심사 기능 개발",
      "코스튬/모션 템플릿 버전 관리 기능 구현",
      "Role 기반 메뉴 권한 관리 기능 개발",
      "Spring Batch + Quartz 기반의 이메일 발송 기능 개발",
      "AKS 기반의 Kubernetes 인프라 구축 및 운영",
      "ActiveMQ → Azure Service Bus 마이그레이션을 통한 메시징 시스템 안정성 및 운영성 강화",
      "GitLab CI + Argo CD를 활용한 AKS 무중단 자동 배포 환경 구축",
      "Datadog 기반 서비스 로그 모니터링 시스템 도입",
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
      "GitLab CI",
      "Argo CD",
    ],
  },
  {
    period: "2020. 12 - 2021. 03",
    title: "LG 퀵헬프",
    description: [
      "레거시 시스템 신규 고도화 작업",
      "보일러플레이트 코드 리팩터링 작업으로 구조 개선",
      "비효율적인 비즈니스 로직 개선으로 응답 속도 향상",
      "SQL 튜닝으로 시스템 안정성 확보 및 장애 예방",
      "로그인 인증에 JWT 적용",
    ],
    techStack: ["Java", "Spring Boot", "MyBatis", "Oracle", "Maven"],
  },
  {
    period: "2020. 01 - 2020. 12",
    title: "SKT 점프 AR",
    description: [
      "앱 API, 콘텐츠 관리 시스템 개발 및 운영",
      "AR Object 관리 CMS 신규 기능 추가",
      "동물원 AR Object 랭킹 기능 신규 API 추가",
      "UGC 및 댓글 검수 CMS 신규 기능 추가",
      "Azure AI Vision을 이용한 UGC 성인/폭력/선정성 콘텐츠 이미지 감지를 위한 MVP 개발 및 테스트",
      "UGC 좋아요 기능 신규 API 추가",
      "Apple 로그인 프로세스 설계 및 API 개발",
      "Apple IAP(인 앱 결제) 프로세스 설계 및 API 개발",
      "WAS 이중화 세션 관리를 위한 Spring Session Hazelcast 적용",
      "JMeter를 이용한 API 부하 테스트로 안정성 검증",
      "HikariCP 설정 최적화 및 SQL 튜닝으로 API 응답 속도 개선",
      "비즈니스 로직 개선으로 API 처리 속도 향상",
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
                {project.description.map((item, i) => (
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
