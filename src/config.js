import io from "socket.io-client";
const WS_BASE = "127.0.0.1:3001";
export const socket = io(WS_BASE);
