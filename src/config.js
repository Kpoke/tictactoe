import io from "socket.io-client";
const WS_BASE = "http://127.0.0.1:3001";
export const socket = io(WS_BASE);

export const API_BASE = "http://127.0.0.1:3001";
