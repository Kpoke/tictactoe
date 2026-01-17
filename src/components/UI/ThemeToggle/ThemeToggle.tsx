/**
 * Theme toggle button component for switching between light and dark modes
 */

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../../contexts/ThemeContext";
import classes from "./ThemeToggle.module.css";

const ThemeToggle: React.FC = () => {
  const { toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={classes.themeToggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      type="button"
    >
      <FontAwesomeIcon
        icon={isDark ? faSun : faMoon}
      />
    </button>
  );
};

export default ThemeToggle;
