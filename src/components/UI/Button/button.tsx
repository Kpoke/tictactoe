import React from "react";
import classes from "./button.module.css";

interface ButtonProps {
  style?: React.CSSProperties;
  disabled?: boolean;
  btnType?: string;
  size?: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  "aria-label"?: string;
  title?: string;
}

/**
 * Reusable button component with customizable styles and sizes
 * @param props - Button properties including style, disabled state, type, size, and click handler
 */
const Button: React.FC<ButtonProps> = (props) => (
  <button
    style={props.style}
    disabled={props.disabled}
    className={[
      classes.Button,
      props.btnType ? classes[props.btnType] : "",
      props.size ? classes[props.size] : "",
      props.className || "",
    ]
      .filter(Boolean)
      .join(" ")}
    onClick={props.onClick}
    aria-disabled={props.disabled}
    aria-label={props["aria-label"]}
    title={props.title}
    type="button"
  >
    {props.children}
  </button>
);

export default Button;
