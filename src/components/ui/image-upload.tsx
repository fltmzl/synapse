"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/tiptap-utils";
import { StorageService } from "@/services/storage.api";
import { ImagePlus, Trash, UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
  variant?: "square" | "circle";
}

export function ImageUpload({
  value,
  onChange,
  disabled,
  className,
  variant = "square"
}: ImageUploadProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setIsLoading(true);
      setProgress(0);

      try {
        const timestamp = Date.now();
        const fileName = `${timestamp}-${file.name.replace(/\s+/g, "-")}`;
        const path = `cover-images/${fileName}`;

        const url = await StorageService.uploadFile(file, path, (progress) => {
          setProgress(progress);
        });

        onChange(url);
        toast.success("Image uploaded successfully");
      } catch (error) {
        console.error("Upload failed:", error);
        toast.error("Failed to upload image");
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
      "image/*": [".png", ".jpg", ".jpeg", ".webp"]
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
        <div
          className={`relative overflow-hidden border bg-muted ${
            variant === "circle"
              ? "aspect-square w-32 rounded-full mx-auto"
              : "aspect-video w-full rounded-lg"
          }`}
        >
          <Image src={value} alt="Upload Image" fill className="object-cover" />
          <div
            className={cn(
              "absolute",
              variant === "circle"
                ? "top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                : "right-2 top-2"
            )}
          >
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className={variant === "circle" ? "h-7 w-7" : ""}
              onClick={handleRemove}
              disabled={disabled}
            >
              <Trash className={variant === "circle" ? "h-3 w-3" : "h-4 w-4"} />
            </Button>
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`
            relative flex cursor-pointer flex-col items-center justify-center border-2 border-dashed transition-colors
            ${
              variant === "circle"
                ? "aspect-square w-32 rounded-full mx-auto"
                : "aspect-video w-full rounded-lg"
            }
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
            <div
              className={`bg-background shadow-sm ${
                variant === "circle" ? "rounded-full p-2" : "rounded-full p-4"
              }`}
            >
              {isLoading ? (
                <div
                  className={`animate-spin rounded-full border-2 border-primary border-t-transparent ${
                    variant === "circle" ? "h-5 w-5" : "h-8 w-8"
                  }`}
                />
              ) : (
                <ImagePlus
                  className={`text-muted-foreground ${
                    variant === "circle" ? "h-5 w-5" : "h-8 w-8"
                  }`}
                />
              )}
            </div>
            {variant !== "circle" && (
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  {isLoading
                    ? "Uploading..."
                    : isDragActive
                      ? "Drop the image here"
                      : "Drag & drop or click to upload"}
                </p>
                <p className="text-xs text-muted-foreground/75">
                  Supports: PNG, JPG, WEBP
                </p>
              </div>
            )}
          </div>
          {isLoading && (
            <div
              className={`absolute bottom-0 left-0 right-0 ${
                variant === "circle" ? "px-4 pb-2" : "p-4"
              }`}
            >
              <Progress value={progress} className="h-1" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
