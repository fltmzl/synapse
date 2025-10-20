import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Timestamp } from "firebase/firestore";
import { Session } from "@/services/chat.api";
import {
  format,
  isThisWeek,
  isThisYear,
  isToday,
  isYesterday,
  subWeeks
} from "date-fns";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toDate(createdAt: Timestamp | Date): Date {
  return createdAt instanceof Timestamp ? createdAt.toDate() : createdAt;
}

export function groupSessions(sessions: Session[]) {
  const groups: Record<string, Session[]> = {};

  sessions.forEach((session) => {
    const date = session.createdAt ? session.createdAt.toDate() : new Date();

    let groupLabel = "Older";

    if (isToday(date)) {
      groupLabel = "Today";
    } else if (isYesterday(date)) {
      groupLabel = "Yesterday";
    } else if (isThisWeek(date)) {
      groupLabel = "This week";
    } else if (date > subWeeks(new Date(), 2)) {
      groupLabel = "Last week";
    } else if (isThisYear(date)) {
      groupLabel = format(date, "MMMM"); // e.g. "August"
    }

    if (!groups[groupLabel]) groups[groupLabel] = [];
    groups[groupLabel].push(session);
  });

  return groups;
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
