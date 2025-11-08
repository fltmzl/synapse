import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { companyData } from "@/data/company-data";
import { ArrowUpRightIcon } from "@/icons/arrow-up-right";
import { BuildingIcon } from "@/icons/building-icon";

export default function StructureCard() {
    const c = companyData;
    return (
          <Card className="rounded-[12px] gap-0 py-0 min-w-[836px]">
             <CardHeader className="flex flex-row justify-between items-center border-b pt-6">
               <CardTitle className="text-xl leading-[110%] tracking-[-0.01em] font-medium">Structures associées</CardTitle>
               <a href="#" className="text-sm text-primary">
                 View network 
                 <ArrowUpRightIcon className="inline size-[18px] ml-1" />
               </a>
             </CardHeader>
          <CardContent className="p-6">
            <div className="grid sm:grid-cols-2 gap-3">
              {c.structures.map((s) => (
                <div
                  key={s.name}
                  className="border rounded-xl p-3 hover:bg-muted transition flex items-center gap-3"
                >
                     <div className="flex items-center justify-center w-10 h-10 bg-[#EEF6FF] rounded-full mb-0">
                                <BuildingIcon className="text-primary "></BuildingIcon>
                              </div>

<div className="flex flex-col">
                  <p className="font-medium">{s.name}</p>
                  <div className="flex items-center">
                  <p className="text-sm text-muted-foreground">{s.type}</p>
                  <p className="text-xs text-muted-foreground">{s.code}</p>
                    </div>
                </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
    );}
