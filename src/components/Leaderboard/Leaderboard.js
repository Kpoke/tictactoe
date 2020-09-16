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
    <Loading />
  ) : error ? (
    <div>An Error Occurred</div>
  ) : (
    leaders.map((leader) => (
      <div key={leader._id}>{`${leader.username} ${leader.points}`}</div>
    ))
  );
  //   console.log(leaders);
  return (
    <div className={classes.container}>
      <h3> Top 100 Leaderboard</h3>
      {toShow}
    </div>
  );
};

export default Leaderboard;
