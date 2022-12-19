/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./App.css";
import { Navigator } from "./Navigator";
import { NavBar } from "./NavBar";
import Login from "./Login";
import Reminders from "./Reminders/reminderApp";
import Thots from "./thots/thotsApp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useThunkReducer } from "react-hook-thunk-reducer";
import rootReducer, { SET_NAV } from "./store";
import { redirectURL } from ".";

function App() {
  const initialState = {
    loading: false,
    showNav: false,
    nav: window.location.pathname,
  };
  useEffect(() => {
    dispatch({ type: SET_NAV, nav: window.location.pathname });

    console.log("PROPS:", window.location.pathname);
  }, []);
  const [state, dispatch] = useThunkReducer(rootReducer, initialState);
  const { loading, showNav, nav } = state;
  return (
    <>
      <BrowserRouter>
        {window.location.href === redirectURL + "login" ? null : (
          <NavBar showNav={showNav} dispatch={dispatch} nav={nav} />
        )}
        <Routes>
          <Route path="/" element={<Navigator nav={nav} />} />
          <Route path="/login" element={<Login nav={nav} />} />
          <Route path="/reminders" element={<Reminders nav={nav} />} />
          <Route path="/thots" element={<Thots nav={nav} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
// vercel
