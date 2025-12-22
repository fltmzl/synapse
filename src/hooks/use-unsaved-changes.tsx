"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useUnsavedChanges(isDirty: boolean) {
  const router = useRouter();
  const [showPrompt, setShowPrompt] = useState(false);
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  useEffect(() => {
    if (!isDirty) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor && anchor.href) {
        const isInternal = anchor.href.startsWith(window.location.origin);
        const isSamePage = anchor.href === window.location.href;
        const targetBlank = anchor.target === "_blank";

        if (isInternal && !isSamePage && !targetBlank) {
          e.preventDefault();
          e.stopPropagation();
          setPendingUrl(anchor.href);
          setShowPrompt(true);
        }
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [isDirty]);

  const confirmNavigation = () => {
    if (pendingUrl) {
      setShowPrompt(false);
      router.push(pendingUrl);
    }
  };

  const cancelNavigation = () => {
    setShowPrompt(false);
    setPendingUrl(null);
  };

  return {
    showPrompt,
    confirmNavigation,
    cancelNavigation
  };
}
