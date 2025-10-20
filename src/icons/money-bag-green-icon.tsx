import { cn } from "@/lib/utils";
import { MoneyBagIcon } from "./money-bag-icon";

type Size = "md" | "lg";

export default function MoneyBagGreenIcon({
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
    <MoneyBagIcon fontSize={size === "lg" ? 32 : 23} className="text-success" />
  );
}
