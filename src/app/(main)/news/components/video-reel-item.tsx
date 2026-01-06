"use client";

import { useEffect, useRef, useState } from "react";
import { Video } from "@/types/video.type";
import { VideoService } from "@/services/video.api";
import { Share2, Play, Pause, Eye, MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

type Props = {
  video: Video;
  isActive: boolean;
};

export default function VideoReelItem({ video, isActive }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isActive) {
      videoRef.current?.play().catch(() => {});
      setIsPlaying(true);
      VideoService.incrementView(video.id);
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  }, [isActive, video.id]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    VideoService.incrementShare(video.id);
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: video.description,
        url: window.location.href
      });
    }
  };

  return (
    <div
      className="h-full w-full relative bg-black flex items-center justify-center overflow-hidden"
      onClick={togglePlay}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black">
          <Spinner className="text-white" />
        </div>
      )}

      <video
        ref={videoRef}
        src={video.videoUrl}
        className="h-full w-full object-contain"
        loop
        playsInline
        onLoadedData={() => setIsLoading(false)}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => setIsLoading(false)}
      />

      {/* Play/Pause Indicator Overlay */}
      {!isPlaying && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <Play className="text-white size-16 opacity-50" />
        </div>
      )}

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 w-full p-6 pt-24 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white pointer-events-none flex flex-col justify-end gap-4">
        <div className="space-y-2">
          <h2 className="text-xl font-bold pointer-events-auto">
            {video.title}
          </h2>
          <p className="text-sm opacity-90 line-clamp-3 pointer-events-auto">
            {video.description}
          </p>
        </div>

        <div className="flex flex-col gap-3 pointer-events-auto">
          {/* Metadata Badges */}
          {(video.category ||
            video.territory ||
            video.place ||
            video.person) && (
            <div className="flex flex-wrap gap-2">
              {video.person && (
                <Badge
                  variant="secondary"
                  className="px-2 py-1 flex items-center gap-1 text-xs"
                >
                  <User className="w-3 h-3 shrink-0" />
                  {video.person}
                </Badge>
              )}
              {video.place && (
                <Badge
                  variant="secondary"
                  className="px-2 py-1 flex items-center gap-1 text-xs"
                >
                  <MapPin className="w-3 h-3 shrink-0" />
                  {video.place}
                </Badge>
              )}
              {video.territory && (
                <Badge
                  variant="secondary"
                  className="px-2 py-1 flex items-center gap-1 text-xs"
                >
                  <MapPin className="w-3 h-3 shrink-0" />
                  {video.territory}
                </Badge>
              )}
              {video.category && (
                <Badge variant="secondary" className="px-2 py-1 text-xs">
                  {video.category}
                </Badge>
              )}
            </div>
          )}

          {/* Tags */}
          {video.tags && video.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {video.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-white border-white/20 bg-black/20 px-2 py-1 text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Publisher and Date */}
          <div className="flex items-center justify-between text-xs text-white/70 mt-1">
            {video.publisher && <span>{video.publisher}</span>}
            <span>
              {video.createdAt
                ? format(video.createdAt.toDate(), "MMM dd, yyyy")
                : ""}
            </span>
          </div>
        </div>
      </div>

      {/* Side Actions */}
      <div className="absolute right-4 bottom-32 flex flex-col gap-6 items-center pointer-events-auto">
        <div className="flex flex-col items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-black/20 hover:bg-black/40 text-white size-12"
          >
            <Eye className="size-6" />
          </Button>
          <span className="text-xs text-white font-medium">
            {video.viewCount || 0}
          </span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-black/20 hover:bg-black/40 text-white size-12"
            onClick={handleShare}
          >
            <Share2 className="size-6" />
          </Button>
          <span className="text-xs text-white font-medium">
            {video.shareCount || 0}
          </span>
        </div>
      </div>
    </div>
  );
}
