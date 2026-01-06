"use client";

import { QUERIES } from "@/constants/queries.constant";
import { VideoService } from "@/services/video.api";
import { Video, CreateVideoDto, UpdateVideoDto } from "@/types/video.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useVideoMutation() {
  const queryClient = useQueryClient();

  const createVideoMutation = useMutation<
    { id: string } & CreateVideoDto,
    Error,
    CreateVideoDto
  >({
    mutationFn: VideoService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.ARTICLES, "videos"] });
      toast.success("Video created successfully");
    },
    onError: (error) => {
      toast.error(`Failed to create video: ${error.message}`);
    }
  });

  const updateVideoMutation = useMutation<
    void,
    Error,
    { id: string; data: UpdateVideoDto }
  >({
    mutationFn: ({ id, data }) => VideoService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.ARTICLES, "videos"] });
      toast.success("Video updated successfully");
    },
    onError: (error) => {
      toast.error(`Failed to update video: ${error.message}`);
    }
  });

  const deleteVideoMutation = useMutation<void, Error, string>({
    mutationFn: VideoService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.ARTICLES, "videos"] });
      toast.success("Video deleted successfully");
    },
    onError: (error) => {
      toast.error(`Failed to delete video: ${error.message}`);
    }
  });

  return {
    createVideoMutation,
    updateVideoMutation,
    deleteVideoMutation
  };
}
