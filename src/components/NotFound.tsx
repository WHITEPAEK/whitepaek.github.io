import React from "react";
import Container from "@/components/Container/Container";

const NotFound = () => {
  return (
    <div className="grid min-h-full place-items-center bg-white py-24 sm:py-32">
      <Container>
        <div className="text-center">
          <p className="text-base font-semibold text-red-600">404</p>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-balance text-gray-900 sm:text-4xl">
            페이지를 찾을 수 없습니다.
          </h1>
          <p className="mt-4 text-sm font-medium text-pretty text-gray-500 sm:text-base/8">
            URL 정보를 다시 한번 확인해 주세요.
          </p>
          <div className="mt-4 flex items-center justify-center">
            <a href="/" className="text-sm font-semibold text-red-600">
              <span aria-hidden="true">&larr;</span> 돌아가기
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NotFound;
