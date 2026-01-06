"use client";

import { VideoForm, VideoFormValues } from "../components/video-form";
import useVideoMutation from "@/mutations/use-video-mutation";
import { useRouter } from "next/navigation";

export default function NewVideoPage() {
  const router = useRouter();
  const { createVideoMutation } = useVideoMutation();

  const onSubmit = (data: VideoFormValues) => {
    createVideoMutation.mutate(data, {
      onSuccess: () => {
        router.push("/dashboard/admin-panel/video-reels");
      }
    });
  };

  return (
    <VideoForm
      pageTitle="New Video Reel"
      pageDescription="Create a new video for the Reels section"
      onSubmit={onSubmit}
      isMutationLoading={createVideoMutation.isPending}
    />
  );
}
