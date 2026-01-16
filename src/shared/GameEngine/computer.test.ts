import { computerPlay, checkAvailable } from "./computer";
import type { Boxes } from "../../types";

describe("computer AI", () => {
  describe("checkAvailable", () => {
    it("should return all boxes when board is empty", () => {
      const boxes: Boxes = {
        a1: "",
        a2: "",
        a3: "",
        b1: "",
        b2: "",
        b3: "",
        c1: "",
        c2: "",
        c3: "",
      };

      const available = checkAvailable(boxes);

      expect(available.length).toBe(9);
    });

    it("should return only empty boxes", () => {
      const boxes: Boxes = {
        a1: "X",
        a2: "O",
        a3: "",
        b1: "",
        b2: "",
        b3: "",
        c1: "",
        c2: "",
        c3: "",
      };

      const available = checkAvailable(boxes);

      expect(available.length).toBe(7);
      expect(available).not.toContain("a1");
      expect(available).not.toContain("a2");
    });

    it("should return empty array when board is full", () => {
      const boxes: Boxes = {
        a1: "X",
        a2: "O",
        a3: "X",
        b1: "O",
        b2: "X",
        b3: "O",
        c1: "O",
        c2: "X",
        c3: "O",
      };

      const available = checkAvailable(boxes);

      expect(available.length).toBe(0);
    });
  });

  describe("computerPlay", () => {
    it("should make a move when board is empty", () => {
      const boxes: Boxes = {
        a1: "",
        a2: "",
        a3: "",
        b1: "",
        b2: "",
        b3: "",
        c1: "",
        c2: "",
        c3: "",
      };

      const result = computerPlay("X", boxes);

      const playedBoxes = Object.values(result).filter((val) => val === "X");
      expect(playedBoxes.length).toBe(1);
    });

    it("should win if it can", () => {
      const boxes: Boxes = {
        a1: "X",
        a2: "X",
        a3: "",
        b1: "",
        b2: "",
        b3: "",
        c1: "",
        c2: "",
        c3: "",
      };

      const result = computerPlay("X", boxes);

      expect(result.a3).toBe("X");
    });

    it("should block opponent from winning", () => {
      const boxes: Boxes = {
        a1: "O",
        a2: "O",
        a3: "",
        b1: "",
        b2: "",
        b3: "",
        c1: "",
        c2: "",
        c3: "",
      };

      const result = computerPlay("X", boxes);

      expect(result.a3).toBe("X");
    });

    it("should make a move when only one box is left", () => {
      const boxes: Boxes = {
        a1: "X",
        a2: "O",
        a3: "X",
        b1: "O",
        b2: "X",
        b3: "O",
        c1: "O",
        c2: "X",
        c3: "",
      };

      const result = computerPlay("O", boxes);

      expect(result.c3).toBe("O");
    });
  });
});
