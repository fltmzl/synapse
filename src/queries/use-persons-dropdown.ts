import { useMemo } from "react";
import usePersons from "./use-persons";

export default function usePersonsDropdown() {
  const queryResult = usePersons();

  const { data: items, isLoading } = queryResult;

  const dropdownItems = useMemo(() => {
    if (isLoading) return [];

    return (
      items?.map((person) => ({
        label: person.name,
        value: person.id
      })) || []
    );
  }, [items, isLoading]);

  return {
    ...queryResult,
    data: dropdownItems
  };
}
