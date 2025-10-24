export class PasswordStrengthUtil {
  static getPasswordStrength(password: string) {
    let score = 0;

    if (password.length >= 0) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score === 0) return { label: "", level: 0 };
    if (score === 1) return { label: "Weak", level: 1 };
    if (score === 2) return { label: "Fair", level: 2 };
    if (score === 3) return { label: "Good", level: 3 };
    if (score === 4) return { label: "Strong", level: 4 };
    return { label: "", level: 0 };
  }
}
