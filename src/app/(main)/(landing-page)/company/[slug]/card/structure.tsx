import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRightIcon } from "@/icons/arrow-up-right";
import { BuildingIcon } from "@/icons/building-icon";
import { IdIcon } from "@/icons/id-icon";
import { LineIcon } from "@/icons/line-icon";
import Link from "next/link";

interface Structure {
  name: string;
  type: string;
  code: string;
  slug?: string;
}

interface StructureCardProps {
  structures: Structure[];
}

export default function StructureCard({ structures }: StructureCardProps) {
  return (
    <Card className="rounded-[12px] gap-0 py-0 w-full lg:min-w-[836px]">
      <CardHeader className="flex lg:flex-row flex-col justify-between lg:items-center border-b pt-6 gap-[10px] lg:gap-0">
        <CardTitle className="text-xl leading-[110%] tracking-[-0.01em] font-medium">
          Structures associées
        </CardTitle>
        <Link href="#" className="text-sm text-primary">
          View network
          <ArrowUpRightIcon className="inline size-[18px] ml-1" />
        </Link>
      </CardHeader>
      <CardContent className="p-6">
        {structures.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            No associated structures found.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-3">
            {structures.map((s) => (
              <Button
                variant="ghost"
                key={s.name}
                asChild
                className="border rounded-xl p-4 hover:bg-muted transition flex items-center gap-3 text-start justify-start h-max"
              >
                <Link href={s.slug ? `/company/${s.slug}` : "#"}>
                  <div className="flex items-center justify-center w-10 h-10 bg-[#EEF6FF] rounded-full mb-0">
                    <BuildingIcon className="text-primary " />
                  </div>

                  <div className="flex flex-col">
                    <p className="font-medium text-foreground">{s.name}</p>
                    <div className="flex items-center text-muted-foreground">
                      <div className="flex items-center gap-1 pr-3">
                        <LineIcon className="w-4 h-4" />
                        <p className="text-sm">{s.type}</p>
                      </div>

                      <div className="h-4 w-[0.5px] bg-muted-foreground/30" />

                      <div className="flex items-center gap-1 pl-3">
                        <IdIcon className="w-4 h-4" />
                        <p className="text-xs">{s.code}</p>
                      </div>
                    </div>
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
