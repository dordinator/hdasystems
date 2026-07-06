"use client";

import type { MouseEvent, ReactNode } from "react";
import { scrollToAnchor } from "@/lib/scroll";

type Props = {
  href: string;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
};

function handleAnchorClick(
  href: string,
  e: MouseEvent<HTMLAnchorElement>,
  onNavigate?: () => void
) {
  if (href.startsWith("#")) {
    e.preventDefault();
    scrollToAnchor(href);
    onNavigate?.();
    return;
  }

  const hashIndex = href.indexOf("#");
  if (hashIndex > 0 && href.startsWith("/")) {
    const path = href.slice(0, hashIndex);
    const hash = href.slice(hashIndex);
    if (path === window.location.pathname) {
      e.preventDefault();
      scrollToAnchor(hash);
      onNavigate?.();
    }
  }
}

export default function AnchorLink({
  href,
  className,
  children,
  onNavigate,
}: Props) {
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => handleAnchorClick(href, e, onNavigate)}
    >
      {children}
    </a>
  );
}
