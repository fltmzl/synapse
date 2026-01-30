import { useMemo } from "react";
import useCategories from "./use-categories";

export default function useCategoriesDropdown() {
  const queryResult = useCategories();

  const { data: items, isLoading } = queryResult;

  const dropdownItems = useMemo(() => {
    if (isLoading) return [];

    return (
      items?.map((category) => ({
        label: category.name,
        value: category.name
      })) || []
    );
  }, [items, isLoading]);

  return {
    ...queryResult,
    data: dropdownItems
  };
}
