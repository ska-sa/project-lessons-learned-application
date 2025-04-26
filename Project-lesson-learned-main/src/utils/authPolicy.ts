export const passwordPolicy = {
  minLength: 8,
  requireUppercase: false,
  requireNumber: false,
  requireSpecialChar: false,
  specialChars: "!@#$%^&*()_+-=[]{}|;:,.<>?",
  blockCommon: false,
  commonPasswords: [] as string[],
};

export function validatePassword(password: string): string[] {
  const errors: string[] = [];

  if (password.length < passwordPolicy.minLength) {
    errors.push(`Minimum ${passwordPolicy.minLength} characters`);
  }
  if (passwordPolicy.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push("At least one uppercase letter");
  }
  if (passwordPolicy.requireNumber && !/[0-9]/.test(password)) {
    errors.push("At least one number");
  }
  if (
    passwordPolicy.requireSpecialChar &&
    !new RegExp(`[${escapeRegExp(passwordPolicy.specialChars)}]`).test(password)
  ) {
    errors.push(
      `At least one special character (${passwordPolicy.specialChars})`,
    );
  }
  if (passwordPolicy.blockCommon && passwordPolicy.commonPasswords.length > 0) {
    if (passwordPolicy.commonPasswords.includes(password.toLowerCase())) {
      errors.push("Password is too common");
    }
  }

  return errors;
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
