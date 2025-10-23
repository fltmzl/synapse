import React from "react";

export default function PasswordStrengthMeter({
  passwordStrength
}: {
  passwordStrength: { label: string; level: number };
}) {
  if (passwordStrength.level <= 0) return null;

  return (
    <div className="flex items-center gap-3 mt-2">
      <span className="text-xs text-muted-foreground w-12">
        {passwordStrength.label}
      </span>
      <div className="flex gap-1 flex-1">
        {[1, 2, 3, 4].map((index) => {
          let activeColor = "";
          if (passwordStrength.label === "Weak") activeColor = "bg-red-500";
          else if (passwordStrength.label === "Fair")
            activeColor = "bg-orange-400";
          else if (passwordStrength.label === "Good")
            activeColor = "bg-green-500";
          else if (passwordStrength.label === "Strong")
            activeColor = "bg-blue-500";

          return (
            <div
              key={index}
              className={`h-1 rounded-full flex-1 transition-colors ${
                index <= passwordStrength.level ? activeColor : "bg-gray-200"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
