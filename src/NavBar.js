import React, { useEffect, useState } from "react";
import "./App.css";
import { Navigate, Link } from "react-router-dom";
import { SHOW_NAV, SET_NAV } from "./store";
import { redirectURL } from "./index";
import { useThunkReducer } from "react-hook-thunk-reducer";
import rootReducer from "./store";
import "./App.css";
const handleLogout = () => {
  localStorage.removeItem("refresh");
  localStorage.removeItem("access");
  window.location = redirectURL;
};

export function NavBar(props) {
  const initialState = {
    nav: "",
  };
  const [state, dispatch] = useThunkReducer(rootReducer, initialState);

  return (
    <>
      <div className="showNav">
        {window.location.pathname === "/thots" ? (
          <Link to="/reminders">
            <button
              className="thotsButton"
              onClick={() => dispatch({ type: SET_NAV, nav: "/reminders" })}
            >
              &nbsp;reminders&nbsp;
            </button>
          </Link>
        ) : (
          <Link to="/thots">
            <button
              className="thotsButton"
              onClick={() => dispatch({ type: SET_NAV, nav: "/thots" })}
            >
              thots
            </button>
          </Link>
        )}{" "}
        <button className="thotsButton" onClick={() => handleLogout()}>
          &nbsp;logout&nbsp;
        </button>
      </div>
    </>
  );
}
// vercel
