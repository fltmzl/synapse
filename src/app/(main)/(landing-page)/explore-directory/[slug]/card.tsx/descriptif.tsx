import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DirectoryItem } from "@/types/directory.type";

export default function DescriptionCard({
  item,
}: {
 item: DirectoryItem;
}) {
  return (
    <Card className="rounded-[12px] pt-0 py-0 gap-0">
            <CardHeader className="px-5 py-6 lg:p-6 border-b ">
              <CardTitle className="text-xl font-medium leading-[150%] tracking-[-0.01em]">Descriptif</CardTitle>
            </CardHeader>
            <CardContent className="px-5 py-6 lg:p-6">
              <p className="text-base leading-[150%] tracking-[-0.01em] text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: item.description || "" }}
              />
            </CardContent>
          </Card>
  );
}