"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StorageService } from "@/services/storage.api";
import { Video, Trash, UploadCloud, X, Play } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

interface VideoUploadProps {
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function VideoUpload({
  value,
  onChange,
  disabled,
  className
}: VideoUploadProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      // Basic validation for video size (e.g., 50MB)
      if (file.size > 50 * 1024 * 1024) {
        toast.error("Video size must be less than 50MB");
        return;
      }

      setIsLoading(true);
      setProgress(0);

      try {
        const timestamp = Date.now();
        const fileName = `${timestamp}-${file.name.replace(/\s+/g, "-")}`;
        const path = `videos/${fileName}`;

        const url = await StorageService.uploadFile(file, path, (progress) => {
          setProgress(progress);
        });

        onChange(url);
        toast.success("Video uploaded successfully");
      } catch (error) {
        console.error("Upload failed:", error);
        toast.error("Failed to upload video");
      } finally {
        setIsLoading(false);
        setProgress(0);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/*": [".mp4", ".webm", ".ogg", ".mov"]
    },
    maxFiles: 1,
    disabled: disabled || isLoading
  });

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
  };

  return (
    <div className={className}>
      {value ? (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-black flex items-center justify-center">
          <video
            src={value}
            className="h-full w-full object-contain"
            controls
          />
          <div className="absolute right-2 top-2">
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={handleRemove}
              disabled={disabled}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`
            relative flex aspect-video cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors
            ${
              isDragActive
                ? "border-primary bg-primary/10"
                : "border-muted-foreground/25 hover:border-primary"
            }
            ${disabled || isLoading ? "cursor-not-allowed opacity-60" : ""}
          `}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <div className="rounded-full bg-background p-4 shadow-sm">
              {isLoading ? (
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              ) : (
                <UploadCloud className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                {isLoading
                  ? "Uploading..."
                  : isDragActive
                    ? "Drop the video here"
                    : "Drag & drop or click to upload video"}
              </p>
              <p className="text-xs text-muted-foreground/75">
                Supports: MP4, WEBM, MOV (Max 50MB)
              </p>
            </div>
          </div>
          {isLoading && (
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
