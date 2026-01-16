import type { Side, ValidationRules } from "../types";

export function areEqual(...args: Side[]): [Side, boolean] {
  const len = args.length;
  for (let i = 1; i < len; i++) {
    if (args[i] === "" || args[i] !== args[i - 1]) {
      return [args[i], false];
    }
  }
  return [args[0], true];
}

export const otherSide = (side: "X" | "O"): "X" | "O" => (side === "X" ? "O" : "X");

export const updateObject = <T extends object>(
  oldObject: T,
  updatedProperties: Partial<T>
): T => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const checkValidity = (value: string, rules?: ValidationRules): boolean => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};

export const conditionalRender = <T,>(boolean: boolean, toRender: T): T | null =>
  boolean ? toRender : null;
