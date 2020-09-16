import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Input from "../../components/UI/Input/input";
import Button from "../../components/UI/Button/button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import { checkValidity } from "../../shared/utility";

const Auth = ({ callback }) => {
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  useEffect(() => {
    if (isAuthenticated) {
      callback(false);
    }
  }, [isAuthenticated, callback]);

  const [authForm, setAuthForm] = useState([
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
        minLength: 7,
      },
      valid: false,
      touched: false,
    },
  ]);
  const [isSignUp, setIsSignUp] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false);

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const auth = useCallback(
    (userData, isSignUp) => dispatch(actions.auth(userData, isSignUp)),
    [dispatch]
  );

  const inputChangedHandler = (event, identifier) => {
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

  const submitHandler = async (event) => {
    event.preventDefault();
    let userData = {};
    for (let element of authForm) {
      let label;
      element.label === "Username"
        ? (label = "username")
        : (label = "password");
      userData[label] = element.value;
    }

    auth(userData, isSignUp);
  };

  let form = (
    <form onSubmit={submitHandler}>
      {authForm.map((formElement) => (
        <Input
          key={formElement.label}
          label={formElement.label}
          elementType={formElement.elementType}
          elementConfig={formElement.elementConfig}
          invalid={!formElement.valid}
          touched={formElement.touched}
          value={formElement.value}
          changed={(event) => inputChangedHandler(event, formElement.label)}
        />
      ))}
      <Button btnType="Success" disabled={!formIsValid}>
        SUBMIT
      </Button>
    </form>
  );
  if (loading) {
    form = <Spinner />;
  }

  let errorMessage = null;

  if (error) {
    errorMessage = <p>{error}</p>;
  }

  return (
    <div className={classes.Auth}>
      <div style={{ textAlign: "right" }}>
        <button onClick={() => callback(false)}>X</button>
      </div>
      {errorMessage}
      {form}
      <Button onClick={switchAuthModeHandler} btnType="Danger">
        SWITCH TO {isSignUp ? "SIGNIN" : "SIGNUP"}
      </Button>
    </div>
  );
};

export default Auth;
