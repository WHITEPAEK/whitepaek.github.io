import React from "react";
import {
  HashtagIcon,
  GlobeAltIcon,
  EnvelopeIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";

const Profile = () => {
  return (
    <section className="my-16">
      <div className="flex flex-col-reverse items-start gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <h2 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
            백 승 주
          </h2>

          <p className="my-4 flex items-center text-gray-600">
            <HashtagIcon className="size-4" aria-hidden="true" />
            <span className="text-lg font-medium">백엔드 엔지니어</span>
          </p>

          <div className="space-y-1 text-gray-500">
            <p className="flex items-center">
              <GlobeAltIcon className="size-4" aria-hidden="true" />
              <a
                href="https://whitepaek.com"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-sm hover:underline"
              >
                https://whitepaek.com
              </a>
            </p>
            <p className="flex items-center">
              <EnvelopeIcon className="size-4" aria-hidden="true" />
              <a
                href="mailto:atomsjp@gmail.com"
                className="ml-1 text-sm hover:underline"
              >
                atomsjp@gmail.com
              </a>
            </p>
            <p className="flex items-center">
              <ArrowPathIcon className="size-4" aria-hidden="true" />
              <span className="ml-1 text-sm">2025년 5월 12일</span>
            </p>
          </div>
        </div>

        <div className="hidden w-36 shrink-0 overflow-hidden ring-1 ring-gray-300 sm:block">
          <img
            src="/resume-image.jpg"
            alt="백승주 프로필 이미지"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <p className="mt-8 font-medium text-pretty whitespace-pre-line text-gray-600 sm:mt-16 sm:max-w-4xl sm:text-lg">
        5년 4개월 경력의 백엔드 엔지니어입니다. Java & Spring, MySQL, AWS 및
        Azure 환경을 기반으로 웹/앱 서비스의 백엔드 개발을 수행해 왔으며,
        프로젝트 설계부터 개발, 서비스 운영까지 전 주기의 업무를 담당했습니다.
        <br />
        <br />
        신규 프로젝트의 초기 설계부터 개발까지 직접 주도하여 여러 서비스를
        성공적으로 런칭했으며, 이후 서비스 고도화 및 안정적인 운영을 통해
        지속적인 성장에 기여한 경험이 있습니다. 또한 창업을 통해 비즈니스
        관점에서 문제를 해결하고, 제품과 사용자 중심의 개발 역량을 강화한 바
        있습니다.
        <br />
        <br />
        비즈니스 목표 달성을 위해 구성원과의 원활한 소통과 협력을 바탕으로
        업무를 수행하며, 함께 성장하고 역량을 강화함으로써 회사의 발전에
        기여합니다.
      </p>
    </section>
  );
};

export default Profile;
