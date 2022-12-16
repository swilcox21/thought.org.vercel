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
import rootReducer from "./store";
import { prod, dev, development } from ".";

function App() {
  const initialState = {
    loading: false,
    showNav: false,
    nav: "/reminders",
  };
  const [state, dispatch] = useThunkReducer(rootReducer, initialState);
  const { loading, showNav, nav } = state;
  return (
    <>
      <BrowserRouter>
        {window.location.href !== "http://localhost:3001//login" && (
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
