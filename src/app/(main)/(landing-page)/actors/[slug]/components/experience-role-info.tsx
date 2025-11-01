import { ExperienceRole } from "@/types/common.type";

export default function ExperienceRoleInfo({
  description,
  endDate,
  startDate,
  title,
  disableLine = false
}: ExperienceRole & { disableLine?: boolean }) {
  const startYear = startDate.split("-").pop();
  const endYear = endDate ? endDate.split("-").pop() : "Present";

  return (
    <div className="flex gap-4">
      <div className="min-w-10 basis-10 flex flex-col items-center gap-1 mb-1">
        <div className="min-w-2 max-w-2 aspect-square bg-[#CBD5E1] rounded-full"></div>

        {!disableLine && (
          <div className="w-[1px] -translate-x-[0.6px] h-full bg-[#CBD5E1]"></div>
        )}
      </div>
      <div className="pt-1">
        <h4 className="text-lg font-medium">{title}</h4>
        <div className="text-muted-foreground">
          <span>{startYear}</span>
          <span> - </span>
          <span>{endYear}</span>
        </div>
        {description && (
          <div
            className="prose prose-base prose-p:text-foreground/80 prose-li:text-foreground/80 prose-p:text-base prose-li:text-base"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        )}
      </div>
    </div>
  );
}
