import { cn } from "@/lib/utils";
import { QuestionMarkIcon } from "./question-mark-icon";

type Size = "md" | "lg";

export default function WarningGreenIcon({
  withShadow = true,
  size = "lg"
}: {
  withShadow?: boolean;
  size?: Size;
}) {
  if (!withShadow) return <InnerIcon size={size} />;

  return (
    <div className="size-[52px] aspect-square bg-gradient-to-b from-[#ECF4EC] rounded-full grid place-content-center">
      <InnerIcon />
    </div>
  );
}

function InnerIcon({ size = "lg" }: { size?: Size }) {
  return (
    <div
      className={cn(
        "aspect-square rounded-full bg-gradient-to-b from-[#16A34A] from-50% to-[#16A34A90] grid place-content-center",
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
