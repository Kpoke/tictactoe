import React from "react";
import { areEqual, otherSide, checkValidity, conditionalRender } from "./utility";
import type { ValidationRules } from "../types";

describe("utility functions", () => {
  describe("areEqual", () => {
    it("should return true when all values are equal and not empty", () => {
      const [value, equal] = areEqual("X", "X", "X");
      expect(equal).toBe(true);
      expect(value).toBe("X");
    });

    it("should return false when values are different", () => {
      const [value, equal] = areEqual("X", "O", "X");
      expect(equal).toBe(false);
    });

    it("should return false when any value is empty", () => {
      const [value, equal] = areEqual("X", "", "X");
      expect(equal).toBe(false);
    });

    it("should return true for all empty strings", () => {
      const [value, equal] = areEqual("", "", "");
      expect(equal).toBe(true);
      expect(value).toBe("");
    });
  });

  describe("otherSide", () => {
    it("should return O when given X", () => {
      expect(otherSide("X")).toBe("O");
    });

    it("should return X when given O", () => {
      expect(otherSide("O")).toBe("X");
    });
  });

  describe("checkValidity", () => {
    it("should return true when no rules are provided", () => {
      expect(checkValidity("test", undefined)).toBe(true);
    });

    it("should validate required field", () => {
      const rules: ValidationRules = { required: true };
      expect(checkValidity("", rules)).toBe(false);
      expect(checkValidity("test", rules)).toBe(true);
      expect(checkValidity("   ", rules)).toBe(false);
    });

    it("should validate minLength", () => {
      const rules: ValidationRules = { minLength: 5 };
      expect(checkValidity("test", rules)).toBe(false);
      expect(checkValidity("testing", rules)).toBe(true);
    });

    it("should validate maxLength", () => {
      const rules: ValidationRules = { maxLength: 5 };
      expect(checkValidity("test", rules)).toBe(true);
      expect(checkValidity("testing", rules)).toBe(false);
    });

    it("should validate email format", () => {
      const rules: ValidationRules = { isEmail: true };
      expect(checkValidity("test@example.com", rules)).toBe(true);
      expect(checkValidity("invalid-email", rules)).toBe(false);
      expect(checkValidity("test@", rules)).toBe(false);
    });

    it("should validate numeric format", () => {
      const rules: ValidationRules = { isNumeric: true };
      expect(checkValidity("123", rules)).toBe(true);
      expect(checkValidity("abc", rules)).toBe(false);
      expect(checkValidity("12a", rules)).toBe(false);
    });

    it("should combine multiple validation rules", () => {
      const rules: ValidationRules = {
        required: true,
        minLength: 5,
        maxLength: 10,
      };
      expect(checkValidity("", rules)).toBe(false);
      expect(checkValidity("test", rules)).toBe(false);
      expect(checkValidity("testing", rules)).toBe(true);
      expect(checkValidity("testingtoolong", rules)).toBe(false);
    });
  });

  describe("conditionalRender", () => {
    it("should return the value when condition is true", () => {
      const testElement = React.createElement("div", null, "Test");
      const result = conditionalRender(true, testElement);
      expect(result).toBeDefined();
    });

    it("should return null when condition is false", () => {
      const testElement = React.createElement("div", null, "Test");
      const result = conditionalRender(false, testElement);
      expect(result).toBeNull();
    });
  });
});
