import io from "socket.io-client";
const WS_BASE = "https://playtttoe.herokuapp.com/";
export const socket = io(WS_BASE);
