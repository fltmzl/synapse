import { useMemo } from "react";
import useTerritories from "./use-territories";

export default function useTerritoriesDropdown() {
  const queryResult = useTerritories();

  const { data: items, isLoading } = queryResult;

  const dropdownItems = useMemo(() => {
    if (isLoading) return [];

    return (
      items?.map((territory) => ({
        label: territory.name,
        value: territory.name
      })) || []
    );
  }, [items, isLoading]);

  return {
    ...queryResult,
    data: dropdownItems
  };
}
