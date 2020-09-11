import React, { useEffect, useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import * as actions from "./store/actions";
import Game from "./components/Game/Game";
import Auth from "./components/Auth/Auth";

const App = () => {
  const dispatch = useDispatch();
  const authCheckState = useCallback(() => dispatch(actions.authCheckState()), [
    dispatch,
  ]);
  useEffect(() => {
    authCheckState();
  }, [authCheckState]);

  const [showAuthForm, setShowAuthForm] = useState(false);
  return (
    <div>
      {showAuthForm ? (
        <Auth callback={setShowAuthForm} />
      ) : (
        <Game callback={setShowAuthForm} />
      )}
    </div>
  );
};

export default App;
