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
import { SET_REMINDER_TOGGLE } from "./Reminders/reminderReducer";

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
  const [touchPosition, setTouchPosition] = useState(null);
  const [touchStopPosition, setTouchStopPosition] = useState(null);

  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };
  const handleTouchMove = (e) => {
    const touchDown = touchPosition;
    if (touchDown === null) {
      dispatch({
        type: SET_REMINDER_TOGGLE,
        reminderToggle: true,
      });
    }
    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;
    if (diff > 5) {
      setTouchStopPosition(diff);
      window.location = redirectURL + "thots";
    }
    if (diff < -5) {
      setTouchStopPosition(diff);
      window.location = redirectURL + "reminders";
    }
    setTouchPosition(null);
  };
  const [state, dispatch] = useThunkReducer(rootReducer, initialState);
  const { loading, showNav, nav } = state;
  return (
    <div onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
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
    </div>
  );
}

export default App;
// vercel
