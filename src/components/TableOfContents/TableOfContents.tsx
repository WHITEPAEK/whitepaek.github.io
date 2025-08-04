import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";

interface HeadingData {
  id: string;
  text: string;
  level: number;
}

const TableOfContents = () => {
  const [headings, setHeadings] = useState<HeadingData[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const headingElementsRef = useRef<Element[]>([]);
  const observerRef = useRef<MutationObserver | null>(null);
  const throttleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 디바운스된 헤더 스캔 함수
  const debouncedScanHeadings = useCallback(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      const contentArea = document.querySelector("main") || document.body;
      const headingElements = Array.from(
        contentArea.querySelectorAll("h2, h3"),
      );

      // headingElements 캐시 업데이트
      headingElementsRef.current = headingElements;

      const headingData: HeadingData[] = headingElements.map(
        (heading, index) => {
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

          return { id, text, level };
        },
      );

      setHeadings(headingData);
    }, 150); // 150ms 디바운스
  }, []);

  useEffect(() => {
    // 초기 스캔
    debouncedScanHeadings();

    // DOM 변경 감지를 위한 MutationObserver 설정
    observerRef.current = new MutationObserver(debouncedScanHeadings);

    observerRef.current.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [debouncedScanHeadings]);

  // 쓰로틀된 스크롤 핸들러
  const throttledHandleScroll = useCallback(() => {
    if (throttleTimeoutRef.current) return;

    throttleTimeoutRef.current = setTimeout(() => {
      const scrollTop = window.scrollY + 100; // 100px 오프셋 추가
      let currentActiveId = "";

      // 캐시된 요소들 사용
      for (let i = 0; i < headingElementsRef.current.length; i++) {
        const element = headingElementsRef.current[i] as HTMLElement;
        const elementTop = element.offsetTop;

        if (scrollTop >= elementTop) {
          currentActiveId = element.id;
        } else {
          break;
        }
      }

      setActiveId(currentActiveId);
      throttleTimeoutRef.current = null;
    }, 16); // ~60fps
  }, []);

  // 스크롤 이벤트 관리
  useEffect(() => {
    // 헤더가 있을 때만 스크롤 리스너 등록
    if (headings.length === 0) return;

    // 초기 실행
    throttledHandleScroll();

    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      if (throttleTimeoutRef.current) {
        clearTimeout(throttleTimeoutRef.current);
        throttleTimeoutRef.current = null;
      }
    };
  }, [headings.length, throttledHandleScroll]);

  // 메모이제이션된 클릭 핸들러
  const handleClick = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  // 메모이제이션된 헤더 목록 렌더링
  const renderedHeadings = useMemo(() => {
    return headings.map((heading) => (
      <li key={heading.id} className={heading.level === 3 ? "pl-4" : ""}>
        <button
          onClick={() => handleClick(heading.id)}
          className={`w-full cursor-pointer text-left transition-colors duration-200 ${
            activeId === heading.id
              ? "text-red-700"
              : "text-slate-500 hover:text-slate-600"
          }`}
          type="button"
          aria-label={`${heading.text} 섹션으로 이동`}
        >
          {heading.text}
        </button>
      </li>
    ));
  }, [headings, activeId, handleClick]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="hidden xl:block" role="complementary" aria-label="목차">
      <div className="fixed top-24 right-[max(0px,calc(50%-40rem))] w-64 pl-8">
        <div className="max-h-[calc(100vh-8rem)] overflow-y-auto py-8">
          <div className="mb-4">
            <div className="font-display text-sm font-medium text-slate-900">
              목 차
            </div>
          </div>
          <nav className="w-full" aria-label="페이지 내 목차">
            <ol role="list" className="space-y-3 text-sm">
              {renderedHeadings}
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TableOfContents;
