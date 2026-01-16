import io, { Socket } from "socket.io-client";
import { getEnvConfigWithFallback } from "./utils/env";

const { WS_BASE_URL } = getEnvConfigWithFallback();

export const socket: Socket = io(WS_BASE_URL);
