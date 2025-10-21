import Image from "next/image";
import Link from "next/link";

type Props = {
  type?: "default" | "white";
};

export default function BrandLogo({ type = "default" }: Props) {
  return (
    <Link href="/" className="flex justify-center text-3xl font-bold">
      <Image
        src={
          type === "default"
            ? "/assets/logo/brand.svg"
            : "/assets/logo/brand-white.svg"
        }
        alt="brandiie"
        width={115}
        height={40}
        priority
      />
    </Link>
  );
}
