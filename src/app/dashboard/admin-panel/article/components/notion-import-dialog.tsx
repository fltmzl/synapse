"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileArchive, UploadCloud, Loader2 } from "lucide-react";

interface NotionImportDialogProps {
  onImportSuccess: (data: { title: string; htmlContent: string }) => void;
  trigger?: React.ReactNode;
}

export function NotionImportDialog({
  onImportSuccess,
  trigger
}: NotionImportDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      if (!file.name.endsWith(".zip")) {
        toast.error("Please upload a ZIP file");
        return;
      }

      const formData = new FormData();
      formData.append("zipFile", file);

      setIsUploading(true);
      setUploadProgress(0);

      try {
        const response = await axios.post(
          "/api/import-notion-article",
          formData,
          {
            onUploadProgress: (progressEvent) => {
              if (progressEvent.total) {
                const progress = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                setUploadProgress(progress);
              }
            }
          }
        );

        if (response.data && response.data.data) {
          onImportSuccess(response.data.data);
          toast.success("Article imported successfully from Notion");
          setIsOpen(false);
        }
      } catch (error: unknown) {
        console.error("Import failed:", error);
        let message = "Failed to import article";
        if (axios.isAxiosError(error)) {
          message = error.response?.data?.message || message;
        }
        toast.error(message);
      } finally {
        setIsUploading(false);
        setUploadProgress(0);
      }
    },
    [onImportSuccess]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/zip": [".zip"],
      "application/x-zip-compressed": [".zip"],
      "application/x-zip": [".zip"],
      "application/octet-stream": [".zip"]
    },
    maxFiles: 1,
    disabled: isUploading
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <FileArchive className="mr-2 h-4 w-4" />
            Import from Notion
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] p-4">
        <DialogHeader className="px-0 pt-0">
          <DialogTitle className="text-lg">Import from Notion</DialogTitle>
          <DialogDescription>
            Upload the HTML ZIP file exported from Notion. It will extract the
            title, content, and images.
          </DialogDescription>
        </DialogHeader>

        <div
          {...getRootProps()}
          className={`
            relative mt-4 flex aspect-video cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors
            ${
              isDragActive
                ? "border-primary bg-primary/10"
                : "border-muted-foreground/25 hover:border-primary"
            }
            ${isUploading ? "cursor-not-allowed opacity-60" : ""}
          `}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-2 text-center p-4">
            <div className="rounded-full bg-background p-4 shadow-sm">
              {isUploading ? (
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              ) : (
                <UploadCloud className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                {isUploading
                  ? "Processing..."
                  : isDragActive
                    ? "Drop the ZIP here"
                    : "Drag & drop or click to upload Notion ZIP"}
              </p>
              <p className="text-xs text-muted-foreground/75">
                Only .zip files are supported
              </p>
            </div>
          </div>

          {isUploading && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm rounded-b-lg">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span>
                    {uploadProgress < 100 ? "Uploading..." : "Processing..."}
                  </span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-1.5" />
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-end">
          <Button
            variant="ghost"
            onClick={() => setIsOpen(false)}
            disabled={isUploading}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
