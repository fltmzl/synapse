"use client";

import { useEffect } from "react";

export function useAutoCloseDrawer(isOpen: boolean, onClose: () => void) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(min-width: 1024px)"); // Tailwind breakpoint lg

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches && isOpen) {
        onClose();
      }
    };
    

    // initial check
    handleChange(mediaQuery);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [isOpen, onClose]);
}
