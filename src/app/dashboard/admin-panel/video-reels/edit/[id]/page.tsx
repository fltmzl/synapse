"use client";

import { VideoForm, VideoFormValues } from "../../components/video-form";
import useVideoMutation from "@/mutations/use-video-mutation";
import useVideos from "@/queries/use-videos";
import { useRouter, useParams } from "next/navigation";
import { Spinner } from "@/components/spinner";

export default function EditVideoPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { data: videos, isLoading } = useVideos();
  const video = videos?.find((v) => v.id === id);

  const { updateVideoMutation } = useVideoMutation();

  const onSubmit = (data: VideoFormValues) => {
    updateVideoMutation.mutate(
      { id, data },
      {
        onSuccess: () => {
          router.push("/dashboard/admin-panel/video-reels");
        }
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner fontSize={40} />
      </div>
    );
  }

  if (!video) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Video not found</p>
      </div>
    );
  }

  return (
    <VideoForm
      pageTitle="Edit Video Reel"
      pageDescription={`Editing: ${video.title}`}
      initialValues={{
        title: video.title,
        description: video.description,
        videoUrl: video.videoUrl,
        tags: video.tags || []
      }}
      onSubmit={onSubmit}
      isMutationLoading={updateVideoMutation.isPending}
    />
  );
}
