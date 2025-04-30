import React, { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import Container from "@/components/Container/Container";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "로그", href: "/logs" },
  { name: "포스트", href: "/posts" },
  { name: "다이어리", href: "/diary" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 bg-white shadow-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* 로고 링크 */}
          <a href="/" className="flex shrink-0 items-center">
            <img
              className="h-6 w-auto align-middle"
              src="/logo.png"
              alt="Logo"
            />
          </a>

          {/* PC 메뉴 */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            {navigation.map((item, i) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <a
                  key={i}
                  href={item.href}
                  className={cn(
                    "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition-colors",
                    isActive
                      ? "border-red-600 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  )}
                >
                  {item.name}
                </a>
              );
            })}
          </div>

          {/* 모바일 메뉴 버튼 */}
          <div className="sm:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-red-600 focus:outline-none focus:ring-inset"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* 모바일 메뉴 */}
      {mobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 pt-2 pb-3">
            {navigation.map((item, i) => {
              const isActive = pathname.startsWith(item.href);

              return (
                <a
                  key={i}
                  href={item.href}
                  className={cn(
                    "block border-l-4 py-2 pr-4 pl-3 text-base font-medium",
                    isActive
                      ? "border-red-600 bg-red-50 text-red-700"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700",
                  )}
                >
                  {item.name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
