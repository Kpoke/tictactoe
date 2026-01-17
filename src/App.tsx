import React, { useEffect, useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import * as actions from "./store/actions";
import Game from "./components/Game/Game";
import Auth from "./components/Auth/Auth";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import ThemeToggle from "./components/UI/ThemeToggle/ThemeToggle";
import { ThemeProvider } from "./contexts/ThemeContext";
import classes from "./App.module.css";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { isAuthEnabled, isLeaderboardEnabled } from "./utils/featureFlags";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const authCheckState = useCallback(() => {
    if (isAuthEnabled()) {
      dispatch(actions.authCheckState());
    }
  }, [dispatch]);
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
              <div className={`${classes.headerRow} ${!isLeaderboardEnabled() ? classes.centeredHeader : ""}`}>
                <h2 className={classes.header}>TicTacToe Online</h2>
                {isLeaderboardEnabled() && (
                  <h2 className={classes.header}>Top 100 Leaderboard</h2>
                )}
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
                    />
                  </a>
                  <ThemeToggle />
                  {isAuthEnabled() && isAuthenticated && (
                    <button
                      onClick={logout}
                      className={classes.logoutButton}
                      aria-label="Logout"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            <div className={`${classes.gridContainer} ${!isLeaderboardEnabled() ? classes.centered : ""}`}>
              <div className={classes.section}>
                <Game callback={setShowAuthForm} />
              </div>
              {isLeaderboardEnabled() && (
                <div className={classes.section}>
                  <div className={classes.contentContainer}>
                    <Leaderboard />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
