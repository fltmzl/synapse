import { cn } from "@/lib/utils";
import { CircleCheckOutlinedIcon } from "./circle-check-outlined-icon";
import { EmailInboxIcon } from "./email-inbox-icon";

type Size = "md" | "lg";

export default function InboxIcon({
  withShadow = true,
  withBlueBackground = false,
  size = "lg"
}: {
  withShadow?: boolean;
  withBlueBackground?: boolean;
  size?: Size;
}) {
  return (
    <div
      className={cn(
        "size-21 aspect-square bg-gradient-to-b from-[#D9EAFF] to-[#EEF6FF] rounded-2xl grid place-content-center",
        {
          "from-primary/30": withBlueBackground
        }
      )}
    >
      <div className="bg-background size-17 grid place-content-center rounded-2lg">
        <EmailInboxIcon className="text-primary size-9" />
      </div>
    </div>
  );
}
