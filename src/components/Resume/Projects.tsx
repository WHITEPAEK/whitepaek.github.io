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
      "React + Spring Boot 기반의 주문 시스템을 직접 설계 및 구축하여, 오프라인 중심 매장의 디지털 전환을 실현하고 고객의 사전 주문/픽업 경험을 강화하여 매장 매출 31.8% 증가에 기여",
      "AWS EC2, RDS, S3 등 서비스를 활용해 클라우드 인프라를 설계 및 구축하여, 안정적인 운영 효율화 체계 구성",
      "GitHub Actions와 AWS CodeDeploy 기반의 CI/CD 파이프라인을 구축하고, 서비스 무중단 배포 환경을 구현하여 운영 안정성과 개발 효율을 향상",
      "핵심 도메인(회원·주문·결제 등)에 대해 업무 흐름 기반의 MySQL 스키마를 설계하고, 확장성을 고려한 구조로 구현",
      "NICE 휴대폰 본인인증 기능을 Socket 통신 방식으로 구현하여, 사용자의 회원가입 경험을 개선",
      "Toss Payments의 기본 결제 및 브랜드페이 기능을 연동·구현하여, 다양한 결제 수단 지원을 통해 사용자 편의성과 결제 전환율을 향상",
      "Bizgo API를 활용해 카카오 알림톡 발송 기능을 구현하고, 주문 접수·처리 등 주요 이벤트에 대한 자동 알림 시스템을 구축하여 사용자 응대 효율 향상",
      "JWT 기반으로 Kakao 및 Google 소셜 로그인/회원가입 API를 개발하여, 인증 흐름의 보안성과 사용자 접근 편의성 확보",
      "상품, 주문/결제, 장바구니 등 전자상거래 핵심 도메인에 대한 RESTful API를 설계·구현하여, 서비스의 기능 확장성과 유지 보수성 확보",
      "주문 마감 시간을 기준으로 자동 수령일자 확정 로직을 구현하여, 운영자의 수동 처리 부담을 해소하고 주문 관리 프로세스의 안정성 향상",
      "픽업 중심 주문 시스템에 배송 기능을 추가 구현함으로써, 사용자의 주문 방식 선택 폭을 넓히고 전체 주문 전환율 상승에 기여",
      "Apache POI를 활용해 주문 상태별 데이터를 엑셀로 추출·다운로드할 수 있는 기능을 개발하여, 매장 운영자가 주문 현황을 손쉽게 관리하도록 지원",
    ],
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
    description: [
      "에이닷 캐릭터, 모션, 아이템 Object를 효율적으로 배포·관리하기 위한 내부 시스템을 설계·운영하여, 콘텐츠 등록과 업데이트의 자동화 및 작업자 생산성을 향상",
      "다양한 형식의 Object 데이터를 통합 관리하기 위한 자동 마이그레이션 시스템을 설계·구축하여, 레거시 데이터 정합성과 신규 Object 이관 효율성을 향상",
      "신규 Object의 빌드 및 배포 과정을 자동화하는 프로세스를 설계·개발하여, 반복 작업을 최소화하고 릴리스 속도와 안정성을 향상",
      "레거시 Object 빌드 파일의 형식·속성 오류를 사전 검출할 수 있는 자동 검증 시스템을 설계·구현하여, 오류 방지 안정성 확보",
      "Object 처리 단계별 성능 데이터를 수집·분석할 수 있도록 Tracking 기반의 로깅 기능을 개발하여, 시스템 병목 구간을 식별하고 운영 효율성을 개선",
      "Azure 기반으로 AKS, Service Bus 등 핵심 서비스를 활용한 클라우드 인프라를 구축·운영하여, 안정적인 배포 환경과 서비스 가용성을 확보",
    ],
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
    description: [
      "MAU 437만 규모의 ifland 서비스를 위한 아바타 코스튬/모션 Object 제작 플랫폼을 설계·구축하고, 콘텐츠 제작 및 심사·배포 과정을 시스템화하여 서비스 확장에 기여",
      "Spring Boot 기반으로 CP(콘텐츠 제작자)용 웹 스튜디오, 어드민, API 서버, 빌드 시스템 등 전체 플랫폼의 구조를 설계·구축하여, 콘텐츠 제작부터 배포까지의 엔드-투-엔드 워크플로우를 안정적으로 지원",
      "T아이디, Google, Apple, Kakao, Facebook 등 주요 플랫폼의 OAuth를 통합 지원하는 JWT 기반 로그인 기능을 구현하여, 보안성과 확장성을 갖춘 로그인 시스템을 구축",
      "Object 빌드 결과물에 대한 버전 관리 프로세스를 적용하여, 콘텐츠 이력 추적과 롤백 대응이 가능하도록 하고 시스템의 운영 안정성과 품질을 강화",
      "Object 빌드/배포 시스템을 동기 처리 방식에서 Event Driven 아키텍처로 리팩터링하여, 병목 구간을 해소하고 전체 처리 속도를 93.3% 향상",
      "코스튬·모션 Object의 빌드 요청을 비동기 처리하기 위해 ActiveMQ 기반의 메시지 큐 구조로 빌드 프로세스를 개발하여, 대량 처리 안정성과 시스템 확장성을 확보",
      "콘텐츠 제작자가 별도 프로그램 없이 브라우저에서 실시간으로 코스튬·모션을 제작할 수 있도록 WebGL 기반 CP 전용 에디터 기능을 구현",
      "3D Object의 시각적 완성도를 사전 검토할 수 있도록 WebGL 기반 실시간 Viewer 기능을 도입하여, 제작 후 검수 및 품질 확인 프로세스를 간소화",
      "CP가 등록한 코스튬 및 모션에 대해 관리자 심사·승인 절차를 지원하는 기능을 개발하고, 콘텐츠 품질 관리 및 부적절한 콘텐츠 유입을 사전에 방지",
      "템플릿 변경 이력 및 버전 간 차이를 체계적으로 관리할 수 있는 기능을 구현하여, 콘텐츠 업데이트 시의 오류를 방지하고 운영 안정성을 강화",
      "관리자 Role에 따라 기능 접근 권한을 구분하는 메뉴 권한 관리 기능을 개발하여, 권한 분리와 보안 체계를 체계화",
      "콘텐츠 상태 변화에 따라 자동으로 이메일을 발송하는 기능을 Spring Batch와 Quartz를 활용해 구현하고, 수동 운영 부담을 줄이며 커뮤니케이션 체계를 자동화",
      "AKS 기반의 Kubernetes 인프라를 구축·운영하여, 배포 자동화·스케일링·모니터링 등 클라우드 환경을 실현하고 서비스 운영 효율을 향상",
      "메시지 유실·중복 처리 이슈를 해결하고 운영 자동화를 실현하기 위해 ActiveMQ에서 Azure Service Bus로 마이그레이션하여, 안정성과 확장성 중심의 메시징 시스템을 구축",
      "GitLab CI + Argo CD 기반의 자동 배포 시스템을 설계·구축하고, AKS 상에서 무중단 배포와 자동 롤백 체계를 실현하여 배포 효율성과 운영 안정성을 향상",
      "서비스 장애 및 성능 이슈를 실시간으로 감지하기 위해 Datadog 기반의 로그 모니터링 시스템을 도입하고, 운영 가시성과 장애 대응 속도를 향상",
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
      "기존 레거시 시스템의 유지보수성과 확장성 한계를 해결하기 위해 주요 모듈을 리팩터링하고, 구조를 개선하여 시스템 안정성과 개발 효율을 향상",
      "서비스 전반에 퍼져 있던 보일러플레이트 코드를 추상화 및 공통 로직으로 분리하고, 구조적 일관성과 유지보수 효율을 향상",
      "복잡한 조건문과 반복 호출로 인한 비효율적인 비즈니스 로직을 개선하여, 처리 속도를 최적화하고 API 응답 시간을 단축",
      "기존 세션 기반 인증의 확장성 한계를 개선하기 위해 JWT(Json Web Token) 기반 인증 방식을 도입하고, 클라이언트 중심의 인증 처리로 보안성과 API 유연성을 확보",
    ],
    techStack: ["Java", "Spring Boot", "MyBatis", "Oracle", "Maven"],
  },
  {
    period: "2020. 01 - 2020. 12",
    title: "SKT 점프 AR",
    description: [
      "AR 콘텐츠 서비스 연동을 위한 앱 API와 CMS를 설계·개발하고, 운영 과정에서 기능 고도화 및 콘텐츠 운영 효율을 지속적으로 개선",
      "AR 동물원 콘텐츠의 사용자 반응 데이터를 기반으로 인기 Object를 집계하는 랭킹 API를 신규 개발하여, 사용자 참여 유도 및 콘텐츠 소비 활성화에 기여",
      "사용자 생성 콘텐츠(UGC)와 댓글의 부적절한 표현을 사전에 걸러내기 위해 검수 기능을 CMS에 추가하여, 콘텐츠 품질 관리와 커뮤니티 운영 안정성을 강화",
      "UGC 이미지 내 성인·폭력·선정성 요소를 자동 감지하기 위해 Azure AI Vision을 활용한 필터링 기능 MVP 개발",
      "UGC 콘텐츠에 대한 사용자 반응을 유도하고 콘텐츠 순환을 활성화하기 위해 좋아요 기능을 제공하는 API를 신규 개발",
      "iOS 사용자 지원을 위한 Apple 로그인 프로세스를 OAuth 기반으로 설계·구현하여, 인증 보안성과 접근성 확보",
      "Apple IAP 연동을 위한 결제 프로세스를 설계하고, 구매 요청부터 영수증 검증까지 처리하는 API를 구현하여 iOS 결제 환경 지원",
      "로드 밸런싱된 WAS 환경에서 세션 일관성을 보장하기 위해 Hazelcast 기반의 Spring Session을 적용하고, 사용자 인증 흐름의 중단 없이 확장 가능한 세션 관리 구축",
      "JMeter를 활용해 주요 API에 대한 부하 테스트를 수행하고, 처리량과 응답 시간을 측정하여 병목 구간을 사전에 파악하고 시스템의 안정성을 검증",
      "HikariCP 커넥션 풀 설정을 최적화하여 API 응답 속도를 안정적으로 유지",
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
