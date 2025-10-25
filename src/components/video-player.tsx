"use client";

import VideoPlayButton from "@/assets/video-play-button.svg";
import { PlayerPlayIcon } from "@/icons/player-play-icon";
import { cn } from "@/lib/utils";
import Image from "next/image";
import type { VideoHTMLAttributes } from "react";
import { useRef, useState, type ReactNode } from "react";

type VideoPlayerProps = VideoHTMLAttributes<HTMLVideoElement> & {
  children?: ReactNode; // Untuk <source> tags
  classNames?: Partial<{
    wrapper: string;
  }>;
  buttonPlayerType?: "default" | "largeBlur";
};

export default function VideoPlayer({
  poster,
  controls = true,
  muted = false,
  className,
  children,
  classNames,
  buttonPlayerType = "default",
  ...rest
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <div
      className={cn(
        "relative w-full h-[250px] 2xl:h-[400px] rounded-md",
        classNames?.wrapper
      )}
    >
      <video
        ref={videoRef}
        poster={poster}
        muted={muted}
        controls={isPlaying ? controls : false}
        className={cn(`w-full h-full object-cover rounded-md`, className)}
        onPause={handlePause}
        onEnded={handlePause}
        {...rest}
      >
        {children}
      </video>

      {!isPlaying ? (
        <>
          {buttonPlayerType === "default" ? (
            <button
              onClick={handlePlay}
              className="absolute inset-0 rounded-2xl flex items-center justify-center bg-black/20 hover:bg-black/40 transition"
            >
              <Image src={VideoPlayButton} alt="play" />
            </button>
          ) : (
            <button
              onClick={handlePlay}
              className="absolute inset-0 rounded-2xl flex items-center justify-center bg-black/20 hover:bg-black/40 transition"
            >
              <div className="border-2 border-white/40 size-11 bg-white/5 backdrop-blur-xl grid place-content-center rounded-full">
                <PlayerPlayIcon className="text-white text-2xl" />
              </div>
            </button>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
