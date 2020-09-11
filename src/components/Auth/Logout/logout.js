import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import * as actions from "../../../store/actions/index";

const Logout = () => {
  const dispatch = useDispatch();
  const logout = useCallback(() => dispatch(actions.logout()), [dispatch]);

  useEffect(() => {
    logout();
  }, [logout]);
};

export default Logout;
