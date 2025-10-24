import { useState } from "react";

export default function usePasswordStrength() {
  const [passwordStrength, setPasswordStrength] = useState<{
    label: string;
    level: number;
  }>({ label: "", level: 0 });

  return { passwordStrength, setPasswordStrength };
}
