import React from "react";
import classes from "./input.module.css";

interface Option {
  value: string;
  displayValue: string;
}

interface ElementConfig {
  type?: string;
  placeholder?: string;
  options?: Option[];
}

interface InputProps {
  elementType: "input" | "textarea" | "select";
  elementConfig: ElementConfig;
  value: string;
  invalid?: boolean;
  shouldValidate?: boolean;
  touched?: boolean;
  label?: string;
  changed: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  inputRef?: React.RefObject<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
}

const Input: React.FC<InputProps> = (props) => {
  let inputElement: JSX.Element | null = null;
  const inputClasses = [classes.InputElement];

  if (props.invalid && (props.shouldValidate !== false) && props.touched) {
    inputClasses.push(classes.Invalid);
    if (props.touched) {
      inputClasses.push("touched");
    }
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          ref={props.inputRef as React.RefObject<HTMLInputElement>}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          ref={props.inputRef as React.RefObject<HTMLTextAreaElement>}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          value={props.value}
          ref={props.inputRef as React.RefObject<HTMLSelectElement>}
          onChange={props.changed}
        >
          {props.elementConfig.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          ref={props.inputRef as React.RefObject<HTMLInputElement>}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      {props.label && <label className={classes.Label}>{props.label}</label>}
      {inputElement}
    </div>
  );
};

export default Input;
