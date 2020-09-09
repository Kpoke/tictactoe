import React, { useCallback, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

import { WebSocketContext } from "../../WebSocket";
import { otherSide } from "../../shared/utility";
import Timer from "../Timer/Timer";
import * as actions from "../../store/actions";
import Box from "../Box/Box";
import classes from "./Game.module.css";

const Game = () => {
  const ws = useContext(WebSocketContext);
  const dispatch = useDispatch();
  const boxes = useSelector((state) => state.game.boxes);
  const {
    gameOver,
    toPlay,
    winner,
    draw,
    players,
    gameStarted,
    username,
  } = useSelector((state) => state.game);

  const played = useCallback((box) => dispatch(actions.played(box)), [
    dispatch,
  ]);

  const clickHandler = (location) =>
    toPlay === "X" ? played(location, "X") : played(location, "O");

  const setPlayers = useCallback(
    (number) => dispatch(actions.setPlayers(number)),
    [dispatch]
  );
  return (
    <div className={classes.container}>
      {gameOver ? (
        draw ? (
          <div>
            <h6 style={{ margin: 20 }}>Game ended in a draw</h6>
          </div>
        ) : (
          <div>
            <h6 style={{ margin: 20 }}>{winner.username} won</h6>
          </div>
        )
      ) : null}
      <h6
        style={{ display: !gameStarted ? "none" : "block" }}
        className={classes.username}
      >
        {players.length === 2
          ? `${players[1].username} is ${players[1].side}`
          : `Computer is ${otherSide(players[0].side)}`}
        <Timer
          side={
            players.length === 2
              ? `${players[1].side}`
              : `${otherSide(players[0].side)}`
          }
        />
      </h6>

      <div className={classes.row}>
        <Box
          loc="right bottom"
          onClick={() => clickHandler("a1")}
          disable={!gameStarted}
        >
          {boxes.a1}
        </Box>
        <Box
          loc="right bottom"
          onClick={() => clickHandler("a2")}
          disable={!gameStarted}
        >
          {boxes.a2}
        </Box>
        <Box
          loc="bottom"
          onClick={() => clickHandler("a3")}
          disable={!gameStarted}
        >
          {boxes.a3}
        </Box>
      </div>
      <div className={classes.row}>
        <Box
          loc="right bottom"
          onClick={() => clickHandler("b1")}
          disable={!gameStarted}
        >
          {boxes.b1}
        </Box>
        <Box
          loc="right bottom"
          onClick={() => clickHandler("b2")}
          disable={!gameStarted}
        >
          {boxes.b2}
        </Box>
        <Box
          loc="bottom"
          onClick={() => clickHandler("b3")}
          disable={!gameStarted}
        >
          {boxes.b3}
        </Box>
      </div>
      <div className={classes.row}>
        <Box
          loc="right"
          onClick={() => clickHandler("c1")}
          disable={!gameStarted}
        >
          {boxes.c1}
        </Box>
        <Box
          loc="right"
          onClick={() => clickHandler("c2")}
          disable={!gameStarted}
        >
          {boxes.c2}
        </Box>
        <Box onClick={() => clickHandler("c3")} disable={!gameStarted}>
          {boxes.c3}
        </Box>
      </div>

      <h6
        className={classes.username}
        style={{ display: !gameStarted ? "none" : "block" }}
      >
        <Timer side={players[0].side} />
        {players[0].username}, you're {players[0].side}
      </h6>
      <div style={{ display: gameStarted ? "none" : "block" }}>
        <button onClick={() => setPlayers(1)} style={{ margin: 20 }}>
          Play Against Computer?
        </button>
        <button onClick={() => setPlayers(2)} style={{ margin: 20 }}>
          Pass and Play
        </button>
        <button onClick={() => ws.setPlayers(username)} style={{ margin: 20 }}>
          Play online
        </button>
      </div>
    </div>
  );
};

export default Game;
