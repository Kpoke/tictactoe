import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import * as actions from "./store/actions";
import Button from "./components/UI/Button/button";
import Game from "./components/Game/Game";
import Auth from "./components/Auth/Auth";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import classes from "./App.module.css";

const App = () => {
  const dispatch = useDispatch();
  const authCheckState = useCallback(() => dispatch(actions.authCheckState()), [
    dispatch,
  ]);
  const logout = useCallback(() => dispatch(actions.logout()), [dispatch]);
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  useEffect(() => {
    authCheckState();
  }, [authCheckState]);

  const [showAuthForm, setShowAuthForm] = useState(false);
  return (
    <div>
      {showAuthForm ? (
        <Auth callback={setShowAuthForm} />
      ) : (
        <div className={classes.container}>
          <div className={classes.button}>
            <a
              href="https://github.com/Kpoke/tictactoe"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faGithub}
                transform="grow-13 down-12"
                style={{ margin: "10px" }}
              />
            </a>
            {isAuthenticated ? (
              <Button onClick={logout} size="Small" btnType="Danger">
                Logout
              </Button>
            ) : null}
          </div>
          <div className={classes.gridContainer}>
            <div className={classes.section}>
              <h2 className={classes.header}>TicTacToe Online</h2>
              <Game callback={setShowAuthForm} />
            </div>
            <div className={classes.section}>
              <Leaderboard />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
