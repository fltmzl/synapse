import { cn } from "@/lib/utils";
import { QuestionMarkIcon } from "./question-mark-icon";

type Size = "md" | "lg";

export default function WarningIcon({
  withShadow = true,
  size = "lg"
}: {
  withShadow?: boolean;
  size?: Size;
}) {
  if (!withShadow) return <InnerCheckIcon size={size} />;

  return (
    <div className="size-[52px] aspect-square bg-gradient-to-b from-[#FFFAE9] rounded-full grid place-content-center">
      <InnerCheckIcon />
    </div>
  );
}

function InnerCheckIcon({ size = "lg" }: { size?: Size }) {
  return (
    <div
      className={cn(
        "aspect-square rounded-full bg-gradient-to-b from-[#D97706] from-50% to-[#D9770690] grid place-content-center",
        {
          "size-8": size === "lg",
          "size-6": size === "md"
        }
      )}
    >
      <QuestionMarkIcon fontSize={18} className="text-white" />
    </div>
  );
}
