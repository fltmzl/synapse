import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@/icons/arrow-left-icon";
import Link from "next/link";
import ActorDetailMobile from "./actor-detail-mobile";
import ActorDetailDekstop from "./actor-detail-dekstop";

export default function DetailActorPage() {
  return (
    <div className="pt-12 lg:pt-10">
      <div className="max-w-7xl mx-6 xl:mx-auto ">
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
      </div>

      <div className="lg:hidden">
        <ActorDetailMobile />
      </div>
      <div className="hidden lg:block">
        <ActorDetailDekstop />
      </div>
    </div>
  );
}
