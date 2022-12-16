/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./App.css";
import { Navigate, Link } from "react-router-dom";
import { SHOW_NAV, SET_NAV } from "./reducer";
import { development, dev, prod } from "./index";
import { useThunkReducer } from "react-hook-thunk-reducer";
import rootReducer from "./reducer";
import "./App.css";
//
//  handleLogout() clears tokens from the cache and returns the user to the login screen
//

export function Navigator(props) {
  const [refresh, setRefresh] = useState(false);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    localStorage.getItem("refresh") ? setRefresh(true) : setRefresh(false);
  }, []);

  return (
    <>
      {refresh ? (
        <Navigate to="/reminders" replace={true} />
      ) : (
        <Navigate to="/login" replace={true} />
      )}
    </>
  );
}
