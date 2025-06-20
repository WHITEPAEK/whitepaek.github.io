import React from "react";
import Container from "@/components/Container/Container";

const social = [
  {
    name: "GitHub",
    href: "https://github.com/WHITEPAEK",
    icon: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    ),
  },
  {
    name: "Mail",
    href: "mailto:atomsjp@gmail.com",
    icon: (
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    ),
  },
  {
    name: "RSS",
    href: "/rss.xml",
    icon: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.5 4.5a1.5 1.5 0 0 0-1.5 1.5v1.01a.5.5 0 0 0 .5.5 12.49 12.49 0 0 1 12.49 12.49.5.5 0 0 0 .5.5h1.01a1.5 1.5 0 0 0 1.5-1.5 15 15 0 0 0-15-15Zm0 5a1.5 1.5 0 0 0-1.5 1.5v1.01a.5.5 0 0 0 .5.5 7.49 7.49 0 0 1 7.49 7.49.5.5 0 0 0 .5.5h1.01a1.5 1.5 0 0 0 1.5-1.5 10 10 0 0 0-10-10Zm1 7.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"
      />
    ),
  },
];

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <Container>
        <div className="flex h-16 flex-col items-center justify-center gap-y-2 sm:flex-row sm:justify-between sm:gap-y-0">
          <div className="flex items-center gap-x-4 sm:order-2">
            {/*<a
              href="/resume"
              className="text-xs font-medium text-gray-600 hover:text-gray-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              RESUME
            </a>

            <span className="text-gray-300">|</span>*/}

            {social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-gray-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">{item.name}</span>
                <svg
                  className="size-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  {item.icon}
                </svg>
              </a>
            ))}
          </div>

          <p className="text-center text-sm text-gray-400 sm:order-1">
            &copy; 2025 WHITEPAEK. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
