import React from "react";

import classes from "./button.module.css";

const button = (props) => (
  <button
    style={props.style}
    disabled={props.disabled}
    className={[
      classes.Button,
      classes[props.btnType],
      classes[props.size],
      props.className,
    ].join(" ")}
    onClick={props.onClick}
  >
    {props.children}
  </button>
);

export default button;
