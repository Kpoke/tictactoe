import React, { useEffect, useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import * as actions from "./store/actions";
import Button from "./components/UI/Button/button";
import Game from "./components/Game/Game";
import Auth from "./components/Auth/Auth";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import ThemeToggle from "./components/UI/ThemeToggle/ThemeToggle";
import { ThemeProvider } from "./contexts/ThemeContext";
import classes from "./App.module.css";
import { useAppDispatch, useAppSelector } from "./store/hooks";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const authCheckState = useCallback(() => dispatch(actions.authCheckState()), [
    dispatch,
  ]);
  const logout = useCallback(() => dispatch(actions.logout()), [dispatch]);
  const isAuthenticated = useAppSelector((state) => state.auth.token !== null);
  useEffect(() => {
    authCheckState();
  }, [authCheckState]);

  const [showAuthForm, setShowAuthForm] = useState(false);
  return (
    <ThemeProvider>
      <ErrorBoundary>
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
                  aria-label="View on GitHub"
                  className={classes.githubLink}
                >
                  <FontAwesomeIcon
                    icon={faGithub}
                    transform="grow-13 down-12"
                  />
                </a>
                <ThemeToggle />
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
    </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
