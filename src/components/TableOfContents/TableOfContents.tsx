import React, { useEffect, useState } from "react";

interface HeadingData {
  id: string;
  text: string;
  level: number;
}

const TableOfContents = () => {
  const [headings, setHeadings] = useState<HeadingData[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // DOM이 완전히 로드된 후에 헤더를 스캔하도록 지연
    const scanHeadings = () => {
      // 메인 콘텐츠 영역에서만 헤더를 찾도록 제한
      const contentArea = document.querySelector("main") || document.body;
      const headingElements = contentArea.querySelectorAll("h2, h3"); // H2, H3만 표시
      const headingData: HeadingData[] = [];

      headingElements.forEach((heading, index) => {
        const level = parseInt(heading.tagName.charAt(1));
        const text = heading.textContent || "";
        let id = heading.id;

        // ID가 없는 경우 자동 생성
        if (!id) {
          id = text
            .toLowerCase()
            .replace(/[^a-z0-9가-힣\s]/g, "")
            .replace(/\s+/g, "-")
            .trim();
          if (!id) {
            id = `heading-${index}`;
          }
          heading.id = id;
        }

        headingData.push({ id, text, level });
      });

      setHeadings(headingData);
    };

    // 초기 스캔
    scanHeadings();

    // DOM 변경 감지를 위한 MutationObserver 설정
    const observer = new MutationObserver(() => {
      scanHeadings();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  // 스크롤 위치에 따른 활성 헤더 감지
  useEffect(() => {
    const handleScroll = () => {
      const headingElements = Array.from(document.querySelectorAll("h2, h3"));
      const scrollTop = window.scrollY + 100; // 100px 오프셋 추가

      // 현재 스크롤 위치에서 가장 가까운 헤더 찾기
      let currentActiveId = "";

      for (let i = 0; i < headingElements.length; i++) {
        const element = headingElements[i] as HTMLElement;
        const elementTop = element.offsetTop;

        if (scrollTop >= elementTop) {
          currentActiveId = element.id;
        } else {
          break;
        }
      }

      setActiveId(currentActiveId);
    };

    // 초기 실행
    handleScroll();

    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="hidden xl:block">
      <div className="fixed top-24 right-[max(0px,calc(50%-40rem))] w-64 pl-8">
        <div className="max-h-[calc(100vh-8rem)] overflow-y-auto py-8">
          <div className="mb-4">
            <div className="font-display text-sm font-medium text-slate-900">
              목 차
            </div>
          </div>
          <nav className="w-full">
            <ol role="list" className="space-y-3 text-sm">
              {headings.map((heading) => (
                <li
                  key={heading.id}
                  className={heading.level === 3 ? "pl-4" : ""}
                >
                  <button
                    onClick={() => handleClick(heading.id)}
                    className={`w-full cursor-pointer text-left transition-colors duration-200 ${
                      activeId === heading.id
                        ? "text-red-700"
                        : heading.level === 2
                          ? "text-slate-500 hover:text-slate-600"
                          : "text-slate-500 hover:text-slate-600"
                    } `}
                    type="button"
                  >
                    {heading.text}
                  </button>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TableOfContents;
