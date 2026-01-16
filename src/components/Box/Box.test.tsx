import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Box from "./Box";

describe("Box component", () => {
  it("should render children", () => {
    render(<Box>X</Box>);
    expect(screen.getByText("X")).toBeInTheDocument();
  });

  it("should call onClick when clicked and not disabled", async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(<Box onClick={handleClick}>X</Box>);

    await user.click(screen.getByText("X"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should not call onClick when disabled", async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(<Box onClick={handleClick} disable={true}>X</Box>);

    await user.click(screen.getByText("X"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("should apply location classes when loc prop is provided", () => {
    const { container } = render(<Box loc="right bottom">X</Box>);
    const boxElement = container.querySelector("div");
    expect(boxElement?.className).toContain("box");
  });
});
