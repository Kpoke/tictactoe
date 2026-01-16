import React, { useEffect, useCallback, memo } from "react";
import * as actions from "../../store/actions";
import Loading from "../UI/Spinner/LoadingIndicator";
import classes from "./Leaderboard.module.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const Leaderboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const fetchLeaderboard = useCallback(
    () => dispatch(actions.fetchLeaderboard()),
    [dispatch]
  );
  const { loading, error, leaders } = useAppSelector((state) => state.game);
  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  return (
    <div className={classes.container} role="region" aria-label="Leaderboard">
      <h3 className={classes.header}>Top 100 Leaderboard</h3>
      {loading && (
        <div role="status" aria-live="polite" aria-label="Loading leaderboard">
          <div style={{ textAlign: "center" }}>
            <Loading />
          </div>
        </div>
      )}
      {error && (
        <div role="alert" aria-live="assertive">
          An Error Occurred
        </div>
      )}
      {!loading && !error && (
        <div className={classes.list} role="list">
          {leaders.map((leader, index) => (
            <div key={leader._id || index} className={classes.item} role="listitem">
              <div className={classes.username}>{leader.username}</div>
              <div className={classes.points}>{leader.points}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(Leaderboard);
