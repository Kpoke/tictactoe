import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as actions from "../../store/actions";
import Box from "../Box/Box";
import classes from "./Game.module.css";

const Game = () => {
  const dispatch = useDispatch();
  const boxes = useSelector((state) => state.game.boxes);
  const { gameOver } = useSelector((state) => state.game);

  const playedX = useCallback((box) => dispatch(actions.playedX(box)), [
    dispatch,
  ]);

  const playedO = useCallback((box) => dispatch(actions.playedO(box)), [
    dispatch,
  ]);

  return (
    <div className={classes.container}>
      {gameOver ? (
        <div>
          <h6 style={{ margin: 20 }}>game over</h6>
          <button>Reset</button>
        </div>
      ) : null}
      <div className={classes.row}>
        <Box
          loc="right bottom"
          onClick={() => (false ? playedX("a1") : playedO("a1"))}
        >
          {boxes.a1}
        </Box>
        <Box
          loc="right bottom"
          onClick={() => (false ? playedX("a2") : playedO("a2"))}
        >
          {boxes.a2}
        </Box>
        <Box
          loc="bottom"
          onClick={() => (false ? playedX("a3") : playedO("a3"))}
        >
          {boxes.a3}
        </Box>
      </div>
      <div className={classes.row}>
        <Box
          loc="right bottom"
          onClick={() => (false ? playedX("b1") : playedO("b1"))}
        >
          {boxes.b1}
        </Box>
        <Box
          loc="right bottom"
          onClick={() => (false ? playedX("b2") : playedO("b2"))}
        >
          {boxes.b2}
        </Box>
        <Box
          loc="bottom"
          onClick={() => (false ? playedX("b3") : playedO("b3"))}
        >
          {boxes.b3}
        </Box>
      </div>
      <div className={classes.row}>
        <Box
          loc="right"
          onClick={() => (false ? playedX("c1") : playedO("c1"))}
        >
          {boxes.c1}
        </Box>
        <Box
          loc="right"
          onClick={() => (false ? playedX("c2") : playedO("c2"))}
        >
          {boxes.c2}
        </Box>
        <Box onClick={() => (false ? playedX("c2") : playedO("c3"))}>
          {boxes.c3}
        </Box>
      </div>
    </div>
  );
};

export default Game;
