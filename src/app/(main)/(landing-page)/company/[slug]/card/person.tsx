import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRightIcon } from "@/icons/arrow-up-right";
import { Person } from "@/types/person-relation.type";
import Link from "next/link";

interface PersonCardProps {
  people: (Person & { title?: string })[];
}

export default function PersonCard({ people }: PersonCardProps) {
  return (
    <Card className="rounded-[12px] gap-0 py-0 w-full lg:min-w-[836px]">
      <CardHeader className="flex lg:flex-row flex-col justify-between lg:items-center border-b pt-6 gap-[10px] lg:gap-0">
        <CardTitle className="text-xl leading-[110%] tracking-[-0.01em] font-medium">
          Personnes associées
        </CardTitle>
        <Link href="#" className="text-sm text-primary">
          View connection
          <ArrowUpRightIcon className="inline size-[18px] ml-1" />
        </Link>
      </CardHeader>
      <CardContent className="p-6">
        {people.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            No associated people found.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
            {people.map((p) => (
              <Button
                variant="ghost"
                key={p.id}
                asChild
                className="flex gap-3 border rounded-md p-4 justify-start hover:bg-muted transition group h-max"
              >
                <Link href={`/actors/${p.slug}`}>
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={p.profilePicture} alt={p.name} />
                    <AvatarFallback>
                      {p.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-start w-max">
                    <p className="text-md leading-[150%] tracking-[-0.01em] text-foreground group-hover:text-primary group-hover:underline">
                      {p.name}
                    </p>
                    <span className="text-sm leading-[140%] tracking-[-0.01em] text-muted-foreground text-wrap">
                      {p.title || p.currentJobPosition || "N/A"}
                    </span>
                  </div>
                </Link>
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
