import React from "react";

import classes from "./Box.module.css";

const Box = ({ children, loc, onClick }) => {
  let style;

  if (loc) {
    const locations = loc.split(" ");
    const locStyles = locations.map((loc) => classes[loc]);
    style = [classes.box, ...locStyles];
  } else {
    style = [classes.box];
  }

  return (
    <div className={style.join(" ")} onClick={onClick}>
      <p className={classes.text}>{children}</p>
    </div>
  );
};

export default Box;
