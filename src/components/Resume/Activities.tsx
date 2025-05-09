import React from "react";

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
    <section className="my-16">
      <h2 className="border-b border-gray-200 text-3xl font-bold text-gray-900">
        Activities
      </h2>
      <div className="mt-6 space-y-8">
        {activities.map((activity, index: number) => (
          <div
            key={index}
            className="grid grid-cols-1 gap-y-2 sm:grid-cols-12 sm:gap-x-8"
          >
            <div className="text-gray-500 sm:col-span-4">{activity.period}</div>

            <div className="sm:col-span-8">
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
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Activities;
