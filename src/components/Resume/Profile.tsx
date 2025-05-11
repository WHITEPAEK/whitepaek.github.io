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

          <p className="my-4 flex items-center">
            <HashtagIcon className="size-4" aria-hidden="true" />
            <span className="text-lg font-medium text-gray-600">
              백엔드 엔지니어
            </span>
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

        <div className="w-36 shrink-0 overflow-hidden ring-1 ring-gray-300">
          <img
            src="/resume-image.jpg"
            alt="백승주 프로필 이미지"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <p className="mt-8 font-medium text-pretty text-gray-600 sm:mt-16 sm:text-lg">
        작성된 소개 글이 없습니다.
      </p>
    </section>
  );
};

export default Profile;
