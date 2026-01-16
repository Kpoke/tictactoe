import React from "react";
import classes from "./Box.module.css";

interface BoxProps {
  children: React.ReactNode;
  loc?: string;
  onClick?: () => void;
  disable?: boolean;
  isWinning?: boolean;
  "aria-label"?: string;
}

const Box: React.FC<BoxProps> = ({
  children,
  loc,
  onClick,
  disable,
  isWinning,
  "aria-label": ariaLabel,
}) => {
  let style: string[];

  if (loc) {
    const locations = loc.split(" ");
    const locStyles = locations.map((loc) => classes[loc]).filter(Boolean);
    style = [classes.box, ...locStyles];
  } else {
    style = [classes.box];
  }

  if (isWinning) {
    style.push(classes.winning);
  }

  return (
    <div
      className={style.join(" ")}
      onClick={disable ? undefined : onClick}
      role="gridcell"
      aria-disabled={disable}
      aria-label={ariaLabel}
      tabIndex={disable ? -1 : 0}
      onKeyDown={(e) => {
        if (!disable && onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <p className={classes.text} data-player={children as string}>
        {children}
      </p>
    </div>
  );
};

export default Box;
