import { clsx, type ClassValue } from "clsx";
import { Timestamp } from "firebase/firestore";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toDate(createdAt: Timestamp | Date): Date {
  return createdAt instanceof Timestamp ? createdAt.toDate() : createdAt;
}

export const copyToClipboard = (
  text: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  navigator.clipboard.writeText(text).then(
    () => {
      if (onSuccess) {
        onSuccess();
        return;
      }

      toast.success("Copied to clipboard!", {
        position: "bottom-center"
      });
    },
    () => {
      if (onError) {
        onError();
        return;
      }

      toast.error("Failed to copy text.", {
        position: "bottom-center"
      });
    }
  );
};

export function capitalizeFirstLetter(string: string) {
  if (!string) return ""; // Handle empty strings safely
  return string.charAt(0).toUpperCase() + string.slice(1);
}
