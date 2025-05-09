import React from "react";
import ResumeSection from "@/components/Resume/ResumeSection.tsx";
import ResumeGridItem from "@/components/Resume/ResumeGridItem.tsx";

interface Activity {
  period: string;
  title: string;
  description: string;
  url?: string;
}

const activities: Activity[] = [
  {
    period: "2020. 11. 24.",
    title: '"JetBrains Productivity Day" 패널 참여',
    description:
      'JetBrains 주최 행사에 패널로 초청되어, "온/오프라인 인플루언서와 함께하는 IntelliJ IDEA와 생산성에 대한 이야기" 세션에서 발표한 경험이 있습니다.',
    url: "https://blog.jetbrains.com/ko/blog/2020/11/30/jetbrains-productivity-day-2020/",
  },
  {
    period: "2020. 06. 30.",
    title: '"IntelliJ IDEA 프로젝트에 활용하기" 출판',
    description:
      "Java, Spring F/W 개발 환경에서 IntelliJ IDEA 학습을 다룬 도서를 국내 최초로 집필 및 출간한 경험이 있습니다.",
    url: "https://bjpublic.tistory.com/366",
  },
  {
    period: "2015. 11. 16 - 2019. 12. 19",
    title: "전자상거래 창업",
    description:
      "학부 시절 400만 원으로 창업한 회사를 4년간 운영하며, 60% 이상의 안정적인 수익률을 유지하고 초기 자본 대비 40배 이상 성장시킨 경험이 있습니다.",
    url: "http://localhost:4321/logs/2025/05/college-ecommerce-startup-story-1",
  },
];

const Activities = () => {
  return (
    <ResumeSection title="Activities">
      {activities.map((activity, index: number) => (
        <ResumeGridItem
          key={index}
          leftContent={
            <>
              <p className="text-gray-500">{activity.period}</p>
            </>
          }
          rightContent={
            <>
              <p className="text-lg font-medium text-gray-800">
                {activity.url ? (
                  <a
                    href={activity.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {activity.title}
                  </a>
                ) : (
                  activity.title
                )}
              </p>
              <p className="text-sm text-gray-600">{activity.description}</p>
            </>
          }
        />
      ))}
    </ResumeSection>
  );
};

export default Activities;
