import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@/icons/arrow-left-icon";
import Link from "next/link";
import ActorDetailMobile from "./actor-detail-mobile";

export default function DetailActorPage() {
  return (
    <div className="max-w-7xl mx-6 xl:mx-auto pt-12 lg:pt-10 pb-9 lg:pb-20">
      <Button
        variant="link"
        className="text-secondary px-0 text-base mb-4"
        asChild
      >
        <Link href="/actors">
          <ArrowLeftIcon className="size-6" strokeWidth="1.5" />
          Back to result
        </Link>
      </Button>

      <ActorDetailMobile />
    </div>
  );
}
