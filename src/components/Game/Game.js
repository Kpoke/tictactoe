import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as actions from "../../store/actions";
import Box from "../Box/Box";
import classes from "./Game.module.css";

const Game = () => {
  const dispatch = useDispatch();
  const boxes = useSelector((state) => state.game.boxes);
  const { gameOver, toPlay, winner, draw, players, gameStarted } = useSelector(
    (state) => state.game
  );

  const playedX = useCallback((box) => dispatch(actions.playedX(box)), [
    dispatch,
  ]);

  const playedO = useCallback((box) => dispatch(actions.playedO(box)), [
    dispatch,
  ]);

  const reset = useCallback(() => dispatch(actions.reset()), [dispatch]);

  const setPlayers = useCallback(() => dispatch(actions.setPlayers()), [
    dispatch,
  ]);
  return (
    <div className={classes.container}>
      {gameOver ? (
        draw ? (
          <div>
            <h6 style={{ margin: 20 }}>Game ended in a draw</h6>
            <button onClick={reset}>Reset</button>
          </div>
        ) : (
          <div>
            <h6 style={{ margin: 20 }}>{winner.username} won</h6>
            <button onClick={reset}>Reset</button>
          </div>
        )
      ) : null}
      <h6 className={classes.username}>
        {players.length === 2
          ? `${players[1].username} is ${players[1].side}`
          : `Computer is ${players[0].side === "X" ? "O" : "X"}`}
      </h6>
      <div className={classes.row}>
        <Box
          loc="right bottom"
          onClick={() => (toPlay === "X" ? playedX("a1") : playedO("a1"))}
        >
          {boxes.a1}
        </Box>
        <Box
          loc="right bottom"
          onClick={() => (toPlay === "X" ? playedX("a2") : playedO("a2"))}
        >
          {boxes.a2}
        </Box>
        <Box
          loc="bottom"
          onClick={() => (toPlay === "X" ? playedX("a3") : playedO("a3"))}
        >
          {boxes.a3}
        </Box>
      </div>
      <div className={classes.row}>
        <Box
          loc="right bottom"
          onClick={() => (toPlay === "X" ? playedX("b1") : playedO("b1"))}
        >
          {boxes.b1}
        </Box>
        <Box
          loc="right bottom"
          onClick={() => (toPlay === "X" ? playedX("b2") : playedO("b2"))}
        >
          {boxes.b2}
        </Box>
        <Box
          loc="bottom"
          onClick={() => (toPlay === "X" ? playedX("b3") : playedO("b3"))}
        >
          {boxes.b3}
        </Box>
      </div>
      <div className={classes.row}>
        <Box
          loc="right"
          onClick={() => (toPlay === "X" ? playedX("c1") : playedO("c1"))}
        >
          {boxes.c1}
        </Box>
        <Box
          loc="right"
          onClick={() => (toPlay === "X" ? playedX("c2") : playedO("c2"))}
        >
          {boxes.c2}
        </Box>
        <Box onClick={() => (toPlay === "X" ? playedX("c3") : playedO("c3"))}>
          {boxes.c3}
        </Box>
      </div>
      <h6 className={classes.username}>
        {players[0].username}, you're {players[0].side}
      </h6>
      <div style={{ display: gameStarted ? "none" : "block" }}>
        <button onClick={setPlayers} style={{ margin: 20 }}>
          Play Against Computer?
        </button>
        <button onClick={setPlayers} style={{ margin: 20 }}>
          Pass and Play
        </button>
      </div>
    </div>
  );
};

export default Game;
