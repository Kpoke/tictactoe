import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./button";

describe("Button component", () => {
  it("should render children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("should call onClick when clicked", async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should be disabled when disabled prop is true", () => {
    render(<Button disabled={true}>Click me</Button>);
    expect(screen.getByText("Click me")).toBeDisabled();
  });

  it("should apply custom styles", () => {
    const style = { color: "red" };
    const { container } = render(<Button style={style}>Click me</Button>);
    const button = container.querySelector("button");
    expect(button).toHaveStyle({ color: "red" });
  });
});
