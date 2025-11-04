import DocsIcon from "@/assets/docs-icon.svg";
import PdfIcon from "@/assets/pdf-icon.svg";
import { Button } from "@/components/ui/button";
import { CircleCheckIcon } from "@/icons/circle-check-icon";
import { InfoIcon } from "@/icons/info-icon";
import { TrashIcon } from "@/icons/trash-icon";
import { UploadIcon } from "@/icons/upload-icon";
import { FileSizeConverter } from "@/lib/file-size-converter";
import { FileText, XIcon } from "lucide-react";
import Image from "next/image";
import React, { useCallback } from "react";
import { Accept, useDropzone } from "react-dropzone";
import { Spinner } from "./spinner";
import { Progress } from "./ui/progress-default";

type Props = {
  files: (File & { preview: string })[];
  setFiles: React.Dispatch<
    React.SetStateAction<(File & { preview: string })[]>
  >;
  acceptFile?: Accept;
  messageHelper?: string;
  multiple?: boolean;
};

const CONFIG = {
  ACCEPT_FILE: {
    "application/pdf": [".pdf"],
    "application/msword": [".doc"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
      ".docx"
    ]
  },
  MAX_IMAGE_UPLOAD_SIZE_IN_BYTE: 10 * 1024 * 1024 // 10 MB
};

export default function FilesDropzone({
  files,
  setFiles,
  acceptFile = CONFIG.ACCEPT_FILE,
  messageHelper = "Word and PDF formats, up to 10 MB.",
  multiple = false
}: Props) {
  // const [files, setFiles] = useState<(File & { preview: string })[]>([]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    );
  }, []);

  const { fileRejections, getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple,
    accept: acceptFile,
    maxSize: CONFIG.MAX_IMAGE_UPLOAD_SIZE_IN_BYTE
    // maxFiles: 5
  });

  const isPdfFile = (file: File) => {
    return file.type.includes("application/pdf");
  };

  const isWordFile = (file: File) => {
    return (
      file.type.includes("application/msword") ||
      file.type.includes(
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      )
    );
  };

  const isUploading = false;
  const isCompleted = true;
  const isError = false;

  return (
    <div className="w-full max-h-[800px] overflow-hidden">
      <div className="overflow-hidden">
        <div
          {...getRootProps({
            className:
              "dropzone bg-transparent border border-dashed border-gray-300 rounded-lg p-8 hover:bg-muted/50 hover:border-foreground w-full cursor-pointer"
          })}
        >
          <input {...getInputProps()} />

          <div className="flex flex-col justify-center items-center gap-5">
            <UploadIcon className="size-6" />
            <div className="text-center">
              <p className="font-semibold mb-2 text-foreground text-sm">
                Choose a file or drag & drop it here.
              </p>
              <p className="text-muted-foreground text-xs font-medium">
                {messageHelper}
              </p>
            </div>

            <Button variant="outline" size="sm">
              Browse File
            </Button>
          </div>
        </div>

        <div className="mt-5 space-y-2 max-h-80 overflow-auto scrollbar-custom pr-1">
          {files.map((file, index) => (
            <div
              key={file.name + index}
              className="py-4 px-3.5 rounded-2lg border relative"
            >
              <div className="flex justify-between items-center w-full">
                <div className="flex gap-3 items-center">
                  <div>
                    {isPdfFile(file) ? (
                      <Image src={PdfIcon} alt="pdf" width={40} height={40} />
                    ) : isWordFile(file) ? (
                      <Image src={DocsIcon} alt="docs" width={40} height={40} />
                    ) : (
                      <FileText className="size-8" />
                    )}
                  </div>

                  <div>
                    <p className="text-foreground font-semibold text-sm">
                      {file.name.split(".")[0]}
                    </p>

                    {isCompleted && (
                      <div className="flex gap-1.5 items-center mt-1.5">
                        <p className="text-[11px]">
                          {FileSizeConverter.formatBytes(file.size)}
                        </p>
                        <p>•</p>
                        <div className="flex gap-1">
                          <CircleCheckIcon className="text-success" />{" "}
                          <span className="text-[11px] font-medium">
                            Completed
                          </span>
                        </div>
                      </div>
                    )}

                    {isUploading && (
                      <div className="flex gap-1.5 items-center mt-1.5">
                        <p className="text-[11px]">
                          0KB of {FileSizeConverter.formatBytes(file.size)}
                        </p>
                        <p>•</p>
                        <div className="flex gap-1">
                          <Spinner className="text-blue-500 mr-1" />
                          <span className="text-[11px] font-medium">
                            Uploading...
                          </span>
                        </div>
                      </div>
                    )}

                    {isError && (
                      <div className="flex gap-1.5 items-center mt-1.5">
                        <p className="text-[11px]">
                          0KB of {FileSizeConverter.formatBytes(file.size)}
                        </p>
                        <p>•</p>
                        <div className="flex gap-1">
                          <InfoIcon className="text-destructive-dark" />
                          <span className="text-[11px] font-medium">Error</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {isCompleted ||
                  (isError && (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="justify-self-end text-muted-foreground"
                      onClick={() => {
                        setFiles(files.filter((f) => f.name !== file.name));
                      }}
                    >
                      <TrashIcon />
                    </Button>
                  ))}
              </div>

              {isUploading && (
                <>
                  <div className="mt-4">
                    <Progress value={60} className="h-1.5 bg-muted" />
                  </div>

                  <button
                    className="absolute top-4 right-4 text-muted-foreground"
                    onClick={() => {
                      setFiles(files.filter((f) => f.name !== file.name));
                    }}
                  >
                    <XIcon className="size-3.5" />
                  </button>
                </>
              )}

              {isError && (
                <Button
                  variant="link"
                  size="sm"
                  className="text-destructive-dark underline underline-offset-2 ms-10"
                >
                  Retry Upload
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
