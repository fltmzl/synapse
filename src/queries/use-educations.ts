import { useQuery } from "@tanstack/react-query";
import { QUERIES } from "@/constants/queries.constant";
import { EducationService } from "@/services/education.api";

export default function useEducations() {
  return useQuery({
    queryKey: [QUERIES.EDUCATIONS],
    queryFn: () => EducationService.getAll()
  });
}
