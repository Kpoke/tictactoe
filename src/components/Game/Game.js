import React, { useCallback, useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { WebSocketContext } from "../../WebSocket";
import { otherSide, conditionalRender } from "../../shared/utility";
import PreGame from "../PreGame/PreGame";
import Timer from "../Timer/Timer";
import Board from "../Board/Board";
import * as actions from "../../store/actions";
import Button from "../UI/Button/button";
import classes from "./Game.module.css";

const Game = ({ callback }) => {
  const ws = useContext(WebSocketContext);
  const dispatch = useDispatch();
  const [showPreGame, setShowPreGame] = useState(false);

  const {
    gameOver,
    onlineGame,
    winner,
    draw,
    players,
    gameStarted,
  } = useSelector((state) => state.game);
  const { user } = useSelector((state) => state.auth);

  const setPlayers = useCallback(
    (number) => dispatch(actions.setPlayers(number)),
    [dispatch]
  );
  return (
    <div className={classes.container}>
      {showPreGame ? (
        <div className={classes.preGame}>
          <PreGame showPreGame={setShowPreGame} />
        </div>
      ) : null}

      {gameOver ? (
        draw ? (
          <div>
            <h6 className={classes.miniHeaders}>Game ended in a draw</h6>
          </div>
        ) : (
          <div>
            <h6 className={classes.miniHeaders}>{winner.username} won</h6>
          </div>
        )
      ) : null}
      {conditionalRender(
        gameStarted,
        <h6 className={classes.miniHeaders}>
          {players.length === 2
            ? `${players[1].username} is ${players[1].side}`
            : `Computer is ${otherSide(players[0].side)}`}
          {onlineGame ? <Timer side={`${players[1].side}`} /> : null}
        </h6>
      )}

      <div className={classes.board}>
        <Board />
      </div>

      {conditionalRender(
        gameStarted,
        <h6 className={classes.miniHeaders}>
          {onlineGame ? <Timer side={players[0].side} /> : null}
          {players[0].username}, you're {players[0].side}
        </h6>
      )}

      {conditionalRender(
        !gameStarted,
        <div className={classes.buttons}>
          <Button
            btnType="Success"
            size="Small"
            onClick={() => setPlayers(1)}
            style={{ margin: 10 }}
          >
            Play Against Computer?
          </Button>
          <Button
            btnType="Success"
            size="Small"
            onClick={() => setPlayers(2)}
            style={{ margin: 10 }}
          >
            Pass and Play
          </Button>
          <Button
            btnType="Success"
            size="Small"
            onClick={() => ws.setPlayers(user, callback, setShowPreGame)}
            style={{ margin: 10 }}
          >
            Play online
          </Button>
        </div>
      )}
    </div>
  );
};

export default Game;
