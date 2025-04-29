import React, { useEffect, useState } from "react";
import Container from "@/components/Container/Container.tsx";

import { Dialog, DialogPanel } from "@headlessui/react";
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
    <>
      {!mobileMenuOpen && (
        <header className="fixed top-0 right-0 left-0 z-50 bg-white shadow">
          <Container>
            <nav
              aria-label="Global"
              className="flex items-center justify-between p-6 lg:px-8"
            >
              <a href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">WHITEPAEK 블로그</span>
                <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
              </a>
              <div className="flex lg:hidden">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(true)}
                  className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                >
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="size-6" />
                </button>
              </div>
              <div className="hidden lg:flex lg:gap-x-12">
                {navigation.map((item) => {
                  const isActive = pathname.startsWith(item.href);

                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`border-b-2 text-sm/6 font-semibold text-gray-900 ${
                        isActive
                          ? "border-red-600"
                          : "border-transparent hover:border-red-600"
                      } transition-all duration-200`}
                    >
                      {item.name}
                    </a>
                  );
                })}
              </div>
            </nav>
          </Container>
        </header>
      )}

      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10 bg-black/30" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <Container>
            <div className="flex items-center justify-between">
              <a href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">WHITEPAEK 블로그</span>
                <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </DialogPanel>
      </Dialog>
    </>
  );
};

export default Header;
