import { useQuery } from "@tanstack/react-query";
import { QUERIES } from "@/constants/queries.constant";
import { AssociationService } from "@/services/association.api";

export default function useAssociations() {
  return useQuery({
    queryKey: [QUERIES.ASSOCIATIONS],
    queryFn: () => AssociationService.getAll()
  });
}
