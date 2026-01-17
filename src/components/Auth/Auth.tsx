import React, { useState, useCallback, useEffect } from "react";
import Input from "../../components/UI/Input/input";
import Button from "../../components/UI/Button/button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import { checkValidity } from "../../shared/utility";
import type { ValidationRules } from "../../types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { PASSWORD_MIN_LENGTH } from "../../shared/constants";
import { isAuthEnabled } from "../../utils/featureFlags";

interface AuthProps {
  callback: (show: boolean) => void;
}

interface FormElement {
  label: string;
  elementType: "input";
  elementConfig: {
    type: string;
    placeholder: string;
  };
  value: string;
  validation: ValidationRules;
  valid: boolean;
  touched: boolean;
}

const Auth: React.FC<AuthProps> = ({ callback }) => {
  // All hooks must be called before any early returns
  const isAuthenticated = useAppSelector((state) => state.auth.token !== null);
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.auth.loading);
  const error = useAppSelector((state) => state.auth.error);
  
  const [authForm, setAuthForm] = useState<FormElement[]>([
    {
      label: "Username",
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Username",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    {
      label: "Password",
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password",
      },
      value: "",
      validation: {
        required: true,
        minLength: PASSWORD_MIN_LENGTH,
      },
      valid: false,
      touched: false,
    },
  ]);
  const [isSignUp, setIsSignUp] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false);

  const auth = useCallback(
    (userData: { username: string; password: string }, isSignUp: boolean) => dispatch(actions.auth(userData, isSignUp)),
    [dispatch]
  );

  // If auth is disabled, close the form immediately
  useEffect(() => {
    if (!isAuthEnabled()) {
      callback(false);
      return;
    }
    if (isAuthenticated) {
      callback(false);
    }
  }, [isAuthenticated, callback]);
  
  // Don't render if auth is disabled (after all hooks are called)
  if (!isAuthEnabled()) {
    return null;
  }

  const inputChangedHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, identifier: string) => {
    const updatedAuthForm = [...authForm];
    const identifierIndex = updatedAuthForm.findIndex(
      (d) => d.label === identifier
    );
    const updatedFormElement = {
      ...updatedAuthForm[identifierIndex],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedAuthForm[identifierIndex] = updatedFormElement;

    let bufferFormIsValid = true;
    for (let inputIdentifier in updatedAuthForm) {
      bufferFormIsValid =
        updatedAuthForm[inputIdentifier].valid && bufferFormIsValid;
    }
    setFormIsValid(bufferFormIsValid);
    setAuthForm(updatedAuthForm);
  };
  const switchAuthModeHandler = () => {
    setIsSignUp((prevState) => !prevState);
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Prevent submission if form is invalid
    if (!formIsValid) {
      return;
    }
    
    let userData: { username: string; password: string } = { username: "", password: "" };
    for (let element of authForm) {
      let label: "username" | "password";
      if (element.label === "Username") {
        label = "username";
      } else {
        label = "password";
      }
      userData[label] = element.value;
    }

    console.log("Submitting auth form:", { isSignUp, userData: { ...userData, password: "***" } });
    auth(userData, isSignUp);
  };

  return (
    <>
      <div className={classes.overlay} onClick={() => callback(false)} />
      <div className={classes.Auth}>
        <div className={classes.header}>
          <button
            className={classes.closeButton}
            onClick={() => callback(false)}
            aria-label="Close"
          >
            ×
          </button>
          <h2 className={classes.headerTitle}>
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          <p className={classes.headerSubtitle}>
            {isSignUp
              ? "Join the Tic Tac Toe community"
              : "Sign in to play online"}
          </p>
        </div>

        <div className={classes.content}>
          {error && (
            <div className={classes.errorMessage} role="alert">
              {error}
            </div>
          )}

          {loading ? (
            <div className={classes.loadingContainer}>
              <Spinner />
              <p className={classes.loadingText}>
                {isSignUp ? "Creating your account..." : "Signing you in..."}
              </p>
            </div>
          ) : (
            <>
              <form onSubmit={submitHandler} className={classes.form}>
                {authForm.map((formElement) => (
                  <Input
                    key={formElement.label}
                    label={formElement.label}
                    elementType={formElement.elementType}
                    elementConfig={formElement.elementConfig}
                    invalid={!formElement.valid}
                    shouldValidate={true}
                    touched={formElement.touched}
                    value={formElement.value}
                    changed={(event) =>
                      inputChangedHandler(event, formElement.label)
                    }
                  />
                ))}
                <Button
                  btnType="Success"
                  disabled={!formIsValid}
                  className={classes.submitButton}
                  type="submit"
                >
                  <span>{isSignUp ? "Sign Up" : "Sign In"}</span>
                </Button>
              </form>

              <div className={classes.switchContainer}>
                <p className={classes.switchText}>
                  {isSignUp
                    ? "Already have an account?"
                    : "Don't have an account?"}
                </p>
                <button
                  type="button"
                  onClick={switchAuthModeHandler}
                  className={classes.switchButton}
                >
                  <span>{isSignUp ? "Sign In Instead" : "Sign Up Instead"}</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Auth;
