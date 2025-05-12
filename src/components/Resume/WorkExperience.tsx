import React from "react";
import ResumeSection from "@/components/Resume/ResumeSection.tsx";
import ResumeGridItem from "@/components/Resume/ResumeGridItem.tsx";
import Link from "@/components/Resume/Link.tsx";

interface ResponsibilityItem {
  text: string;
  url?: string;
}

interface WorkExperience {
  period: string;
  duration: string;
  company: string;
  position: string;
  responsibilities: ResponsibilityItem[];
}

const workExperiences: WorkExperience[] = [
  {
    period: "2024. 01 - 2025. 04",
    duration: "1년 4개월",
    company: "아사삭",
    position: "Backend engineer & Co-Founder",
    responsibilities: [
      {
        text: `오프라인 자영업의 디지털 전환을 통해 매출 증대를 도모하는 비즈니스 모델 기획·적용`,
      },
      {
        text: `프레시센터, 오프라인 매장 오픈`,
      },
      {
        text: `프로젝트 리더 역할 수행`,
      },
      {
        text: `픽업 주문 서비스 "아사삭 스토어" 오픈 (매출 31.8% 증가)`,
      },
    ],
  },
  {
    period: "2020. 01 - 2023. 12",
    duration: "4년",
    company: "비디",
    position: "Backend engineer",
    responsibilities: [
      {
        text: `SKT 에이닷 캐릭터, 모션, 아이템 오브젝트 관리를 위한 내부 시스템 "Adot Studio" 오픈`,
        url: `https://news.sktelecom.com/tag/%EC%97%90%EC%9D%B4%EB%8B%B7/page/9`,
      },
      {
        text: `SKT 이프랜드(MAU 437만) 아바타 코스튬/모션 제작 플랫폼 "ifland Studio" 오픈`,
        url: `https://news.sktelecom.com/tag/ifland`,
      },
      {
        text: `SKT 5G 증강현실 서비스 "Jump AR" 오픈`,
        url: `https://news.sktelecom.com/tag/%EC%A0%90%ED%94%84ar`,
      },
      {
        text: `회사 홈페이지 개발 및 Linux 기반 내부 서버 구축`,
      },
      {
        text: `COVID-19 비대면 전환 대응을 위한 FortiGate 방화벽 도입 및 원격 근무 환경 구축`,
      },
      {
        text: `본부 인턴/신입 개발자 멘토 역할 수행`,
      },
      {
        text: `본부 개발파트 리더 역할 수행`,
      },
      {
        text: `2023년 본부 추천으로 <특별승진>`,
      },
    ],
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
              <p className="mb-2 font-medium text-gray-700">{exp.position}</p>
              <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-gray-600">
                {exp.responsibilities.map((item, i) => (
                  <li key={i}>
                    {item.url ? (
                      <Link href={item.url}>{item.text}</Link>
                    ) : (
                      item.text
                    )}
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

export default WorkExperience;
