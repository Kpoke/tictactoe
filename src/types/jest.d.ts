// Jest type definitions for TypeScript
// This file provides type definitions for Jest globals when @types/jest is not available

declare var describe: (name: string, fn: () => void) => void;
declare var it: (name: string, fn: () => void) => void;

interface JestMatchers<R> {
  toBe: (expected: any) => R;
  toEqual: (expected: any) => R;
  toBeDefined: () => R;
  toBeNull: () => R;
  toBeTruthy: () => R;
  toBeFalsy: () => R;
  toContain: (item: any) => R;
  toBeInTheDocument: () => R;
  toHaveBeenCalledTimes: (times: number) => R;
  toHaveBeenCalled: () => R;
  toBeDisabled: () => R;
  toHaveStyle: (style: Record<string, string>) => R;
  not: JestMatchers<R>;
}

declare var expect: <T>(actual: T) => JestMatchers<void>;

interface JestMockFn {
  (...args: any[]): any;
  mockReturnValue: (value: any) => JestMockFn;
  mockResolvedValue: (value: any) => JestMockFn;
  mockRejectedValue: (value: any) => JestMockFn;
  mockImplementation: (fn: (...args: any[]) => any) => JestMockFn;
}

declare namespace jest {
  function fn(): JestMockFn;
}
