import type { BoxKey } from "../../types";

interface DecisionTreeData {
  initial: BoxKey[];
  choices: Record<string, { children: string[]; id?: string; parent?: string }>;
}

export const data: DecisionTreeData = {
  initial: ["a1", "a2", "a3", "b1", "b2", "b3", "c1", "c2", "c3"],
  choices: {
    // TOP LEVEL

    a1: {
      children: ["a1 c3", "a1 b3", "a1 c2"],
    },

    a2: {
      children: ["a2 b1", "a2 b3", "a2 c1", " a2 c3"],
    },

    a3: {
      children: ["a3 c1", "a3 c2", "a3 b1"],
    },

    b1: {
      children: ["b1 a2", "b1 a3", "b1 c2", "b1 c3"],
    },

    b2: {
      children: ["b2 a1", "b2 a3", "b2 c1", "b2 c3"],
    },

    b3: {
      children: ["b3 a2", "b3 a1", "b3 c2", "b3 c1"],
    },

    c1: {
      children: ["c1 a3", "c1 a2", "c1 b3"],
    },

    c2: {
      children: ["c2 b1", "c2 b3", "c2 a1", "c2 a3"],
    },

    c3: {
      children: ["c3 a1", "c3 b1", "c3 a2"],
    },

    // a1

    "a1 c3": {
      children: ["c1", "a3"],
    },
    "a1 b3": {
      children: ["a3"],
    },
    "a1 c2": {
      children: ["c1"],
    },

    // a2
    "a2 b1": {
      children: ["a1"],
    },
    "a2 b3": {
      children: ["a3"],
    },
    "a2 c1": {
      children: ["a1"],
    },
    "a2 c3": {
      children: ["a3"],
    },

    //a3
    "a3 c1": {
      children: ["a1", "c3"],
    },
    "a3 c2": {
      children: ["c3"],
    },
    "a3 b1": {
      children: ["a1"],
    },

    //b1
    "b1 a2": {
      children: ["a1"],
    },
    "b1 a3": {
      children: ["a1"],
    },
    "b1 c2": {
      children: ["c1"],
    },
    "b1 c3": {
      children: ["c1"],
    },

    //b2
    "b2 a1": {
      children: ["a3", "c1"],
    },
    "b2 a3": {
      children: ["a1", "c3"],
    },
    "b2 c1": {
      children: ["a1", "c3"],
    },
    "b2 c3": {
      children: ["a3", "c1"],
    },

    //b3
    "b3 a2": {
      children: ["a3"],
    },
    "b3 a1": {
      children: ["a3"],
    },
    "b3 c2": {
      children: ["c3"],
    },
    "b3 c1": {
      children: ["c3"],
    },

    //c1
    "c1 a3": {
      children: ["a1", "c3"],
    },
    "c1 a2": {
      children: ["a1"],
    },
    "c1 b3": {
      children: ["c3"],
    },

    //c2
    "c2 b1": {
      children: ["c1"],
    },
    "c2 b3": {
      children: ["c3"],
    },
    "c2 a1": {
      children: ["c1"],
    },
    "c2 a3": {
      children: ["c3"],
    },

    //c3
    "c3 a1": {
      children: ["c1", "a3"],
    },
    "c3 b1": {
      children: ["c1"],
    },
    "c3 a2": {
      children: ["a3"],
    },
  },
};
