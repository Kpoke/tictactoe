import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import type { ThunkDispatch } from "redux-thunk";
import WebSocketProvider from "./WebSocket";
import authReducer from "./store/reducers/auth";
import gameReducer from "./store/reducers/game";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import type { GameAction, AuthAction } from "./types";
import { isOnlineMultiplayerEnabled } from "./utils/featureFlags";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)
    : compose;

const rootReducer = combineReducers({
  game: gameReducer,
  auth: authReducer,
});

const store = createStore(
  rootReducer,
  undefined,
  composeEnhancers(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, GameAction | AuthAction>;

const AppWrapper: React.FC = () => {
  if (isOnlineMultiplayerEnabled()) {
    return (
      <WebSocketProvider>
        <App />
      </WebSocketProvider>
    );
  }
  return <App />;
};

const app = (
  <Provider store={store}>
    <AppWrapper />
  </Provider>
);

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

const root = createRoot(container);
root.render(<React.StrictMode>{app}</React.StrictMode>);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
