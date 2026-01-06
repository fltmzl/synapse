import { useState, useRef, useEffect, useCallback } from "react";
import { Video } from "@/types/video.type";

export function useVideoModal(videos: Video[] | undefined) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const scrollToVideo = useCallback((index: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    container.scrollTo({
      top: index * container.clientHeight,
      behavior: "smooth"
    });
  }, []);

  const handlePrev = useCallback(() => {
    if (activeIndex > 0) {
      scrollToVideo(activeIndex - 1);
    }
  }, [activeIndex, scrollToVideo]);

  const handleNext = useCallback(() => {
    if (videos && activeIndex < videos.length - 1) {
      scrollToVideo(activeIndex + 1);
    }
  }, [activeIndex, videos, scrollToVideo]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handlePrev, handleNext]);

  useEffect(() => {
    if (!isOpen) return;

    const container = containerRef.current;
    if (!container) return;

    // Scroll to active index immediately when opening
    if (container) {
      container.scrollTop = activeIndex * container.clientHeight;
    }

    const handleScroll = () => {
      const index = Math.round(container.scrollTop / container.clientHeight);
      setActiveIndex(index);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  return {
    isOpen,
    setIsOpen,
    activeIndex,
    setActiveIndex,
    containerRef,
    handlePrev,
    handleNext
  };
}
