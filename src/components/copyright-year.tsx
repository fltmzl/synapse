"use client";

import { useEffect, useState } from "react";

export function CopyrightYear() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <div className="text-sm lg:text-base text-[#CBD5E1]">
      Copyright &copy; {year ?? ""} Synapse. All Rights Reserved
    </div>
  );
}
