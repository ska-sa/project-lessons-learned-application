import { validatePassword } from "../authPolicy";

describe("Password Policy Validation", () => {
  it("should reject passwords shorter than 12 characters", () => {
    const errors = validatePassword("short");
    expect(errors).toContain("Minimum 12 characters");
  });

  it("should reject passwords without uppercase letters", () => {
    const errors = validatePassword("alllowercase1!");
    expect(errors).toContain("At least one uppercase letter");
  });

  it("should reject passwords without numbers", () => {
    const errors = validatePassword("NoNumbersHere!");
    expect(errors).toContain("At least one number");
  });

  it("should reject passwords without special characters", () => {
    const errors = validatePassword("NoSpecialChars1");
    expect(errors).toContain(
      "At least one special character (!@#$%^&*()_+-=[]{}|;:,.<>?)",
    );
  });

  it("should reject common passwords", () => {
    const errors = validatePassword("password");
    expect(errors).toContain("Password is too common");
  });

  it("should accept valid passwords", () => {
    const errors = validatePassword("ValidPass1!");
    expect(errors).toHaveLength(0);
  });

  it("should return all validation errors for invalid passwords", () => {
    const errors = validatePassword("bad");
    expect(errors).toEqual([
      "Minimum 12 characters",
      "At least one uppercase letter",
      "At least one number",
      "At least one special character (!@#$%^&*()_+-=[]{}|;:,.<>?)",
      "Password is too common",
    ]);
  });
});
