import React from "react";
import ResumeSection from "@/components/Resume/ResumeSection";
import ResumeGridItem from "@/components/Resume/ResumeGridItem";
import Link from "@/components/Resume/Link";

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
        text: `오프라인 자영업의 문제를 파악하고 디지털 서비스 도입을 검증하기 위해 프레시센터 및 오프라인 매장을 직접 구축`,
      },
      {
        text: `픽업 기반의 주문/결제 서비스 "아사삭 스토어"를 론칭하여, 매장 매출 31.8% 증가`,
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
        text: `SKT AI 개인비서 에이닷 3D 콘텐츠 관리 서비스 "Adot Studio" 론칭`,
        url: `https://news.sktelecom.com/tag/%EC%97%90%EC%9D%B4%EB%8B%B7/page/9`,
      },
      {
        text: `SKT 메타버스 플랫폼 이프랜드 3D 콘텐츠 제작 서비스 "ifland Studio" 49개국 글로벌 론칭`,
        url: `https://news.sktelecom.com/tag/ifland`,
      },
      {
        text: `SKT 5G 증강현실 서비스 "Jump AR" 론칭`,
        url: `https://news.sktelecom.com/tag/%EC%A0%90%ED%94%84ar`,
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
