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
    description: "...",
    url: "",
  },
  {
    period: "2020. 06. 30.",
    title: '"IntelliJ IDEA 프로젝트에 활용하기" 출판',
    description: "...",
    url: "",
  },
  {
    period: "2015. 11. 16 - 2019. 12. 19",
    title: "전자상거래 창업",
    description: "...",
    url: "",
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
                    className="text-blue-600 hover:underline"
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
