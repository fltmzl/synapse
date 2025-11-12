import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DirectoryItem } from "@/types/directory.type";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function RepresentantCard({ item }: { item: DirectoryItem }) {
  return (
    <Card className="rounded-[12px] gap-0 py-0 ">
      <CardHeader className="px-5 py-6 lg:p-6 border-b">
        <CardTitle className="text-xl font-medium">Représentant</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col px-5 py-6 lg:p-6 ">
          <Link href="#">
        <div className="flex flex-row gap-3 items-center border-b pb-4">
            <div className="w-15 h-15 relative rounded-full overflow-hidden">
              <Avatar className="h-15 w-15">
                <AvatarImage
                  className="rounded-full"
                  src={
                    item.representative?.avatar || "/images/default-avatar.png"
                  }
                  alt={item.representative?.name || "Representative"}
                />
                <AvatarFallback className="bg-muted-foreground/20 font-medium">
                  <div className="w-15 h-15 bg-muted rounded-full grid place-content-center">
                    {item.representative?.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
              <div className="flex gap-1 items-center">
                <h3 className="leading-[140%] tracking-[-0.01em] text-lg">
                  {item.representative?.name}
                </h3>

                <ArrowUpRight
                  strokeWidth={1.5}
                  className="size-[18px] text-primary"
                />
              </div>
              <p className="text-base leading-[150%] tracking-[-0.01em] text-muted-foreground">
                {item.representative?.title}
              </p>
            </div>
        </div>
          </Link>
        <div className="space-y-2 pt-4">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Mail strokeWidth={1} className="size-4 text-primary" />
              <span className="text-base leading-[150%] tracking-[-0.01em]">{item.representative?.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone strokeWidth={1} className="size-4 text-primary" />
              <span className="text-base leading-[150%] tracking-[-0.01em]">{item.representative?.phone}</span>
            </div>
          </div>
          <p className="text-base leading-[150%] tracking-[-0.01em] mt-4">
            {item.representative?.bio}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
