import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as actions from "../../store/actions";
import Loading from "../UI/Spinner/LoadingIndicator";
import classes from "./Leaderboard.module.css";

const Leaderboard = () => {
  const dispatch = useDispatch();
  const fetchLeaderboard = useCallback(
    () => dispatch(actions.fetchLeaderboard()),
    [dispatch]
  );
  const { loading, error, leaders } = useSelector((state) => state.game);
  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);
  let toShow = loading ? (
    <div style={{ textAlign: "center" }}>
      <Loading />
    </div>
  ) : error ? (
    <div>An Error Occurred</div>
  ) : (
    <div className={classes.list}>
      {leaders.map((leader) => (
        <div key={leader._id} className={classes.item}>
          <div className={classes.username}>{leader.username}</div>
          <div className={classes.points}>{leader.points}</div>
        </div>
      ))}
    </div>
  );

  return (
    <div className={classes.container}>
      <h3 className={classes.header}> Top 100 Leaderboard</h3>
      {toShow}
    </div>
  );
};

export default Leaderboard;
