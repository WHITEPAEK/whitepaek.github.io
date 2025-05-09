import React from "react";

interface SkillGroup {
  category: string;
  items: string[];
}

const skills: SkillGroup[] = [
  {
    category: "Backend",
    items: ["Java", "Spring Boot", "JPA", "MyBatis"],
  },
  {
    category: "DevOps",
    items: ["GitHub Actions", "AWS EC2", "Docker", "Tomcat", "Linux", "CentOS"],
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
    ],
  },
];

const Skills = () => {
  return (
    <section className="mt-16">
      <h2 className="border-b border-gray-200 text-3xl font-bold text-gray-900">
        Skills
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skillGroup, index: number) => (
          <div key={index}>
            <h3 className="mb-3 text-lg font-semibold text-gray-800">
              {skillGroup.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skillGroup.items.map((item, i) => (
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
    </section>
  );
};

export default Skills;
