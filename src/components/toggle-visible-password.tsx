import { EyeIcon } from "@/icons/eye-icon";
import { EyeOffIcon } from "@/icons/eye-off-icon";
import React from "react";

type Props = {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ToggleVisiblePassword({
  showPassword,
  setShowPassword
}: Props) {
  return (
    <button
      type="button"
      onClick={() => setShowPassword((prev) => !prev)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors"
      tabIndex={-1}
    >
      {showPassword ? <EyeIcon /> : <EyeOffIcon />}
    </button>
  );
}
