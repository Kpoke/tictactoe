import React, { useCallback, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

import { WebSocketContext } from "../../WebSocket";
import * as actions from "../../store/actions";
import Box from "../Box/Box";
import classes from "./Board.module.css";

const Board = ({ localTimeObject }) => {
  const ws = useContext(WebSocketContext);
  const dispatch = useDispatch();
  const { boxes, onlineGame, gameStarted } = useSelector((state) => state.game);
  const played = useCallback((box) => dispatch(actions.played(box)), [
    dispatch,
  ]);

  const clickHandler = (location) =>
    onlineGame ? ws.play(location, localTimeObject) : played(location);
  return (
    <div className={classes.board}>
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
    </div>
  );
};

export default Board;
