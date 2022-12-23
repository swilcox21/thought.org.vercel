/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./App.css";
import { Navigator } from "./Navigator";
import { Navigate, Link } from "react-router-dom";
import { NavBar } from "./NavBar";
import Login from "./Login";
import Reminders from "./Reminders";
import Thots from "./thots/thotsApp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useThunkReducer } from "react-hook-thunk-reducer";
// import { handleTouchStart } from "./actions/touchSwiper/handleTouchStart";
// import { handleTouchMove } from "./actions/touchSwiper/handleTouchMove";
// import { handleTouchEnd } from "./actions/touchSwiper/handleTouchEnd";
import rootReducer, {
  SET_NAV,
  SET_TOUCH_POSITION,
  SET_TOUCH_STOP_POSITION,
} from "./store";
import { redirectURL } from ".";
import { SET_REMINDER_TOGGLE } from "./Reminders/reducer";
import { history } from "./";
function App() {
  const initialState = {
    loading: false,
    showNav: false,
    touchPosition: null,
    touchStopPosition: null,
  };

  const [state, dispatch] = useThunkReducer(rootReducer, initialState);
  const { loading, showNav, touchPosition, touchStopPosition } = state;

  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    dispatch({ type: SET_TOUCH_POSITION, touchPosition: touchDown });
  };

  const handleTouchMove = (e) => {
    const touchDown = touchPosition;
    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;
    if (diff > 5) {
      dispatch({ type: SET_TOUCH_STOP_POSITION, touchStopPosition: diff });

      return;
    }
    if (diff < -5) {
      dispatch({ type: SET_TOUCH_STOP_POSITION, touchStopPosition: diff });
      return;
    }
  };

  const handleTouchEnd = (e) => {
    if (touchStopPosition === null) {
      dispatch({
        type: SET_REMINDER_TOGGLE,
        reminderToggle: true,
      });
      return;
    }
    if (touchStopPosition <= 60)
      dispatch({
        type: SET_REMINDER_TOGGLE,
        reminderToggle: true,
      });
    dispatch({ type: SET_TOUCH_POSITION, touchPosition: null });
    if (touchStopPosition >= -60)
      dispatch({
        type: SET_REMINDER_TOGGLE,
        reminderToggle: true,
      });
    dispatch({ type: SET_TOUCH_POSITION, touchPosition: null });
    if (touchStopPosition > 60) {
      dispatch({ type: SET_TOUCH_POSITION, touchPosition: null });
      window.location = redirectURL + "thots";
    }
    if (touchStopPosition < -60) {
      dispatch({ type: SET_TOUCH_POSITION, touchPosition: null });
      window.location = redirectURL + "reminders";
    }
  };

  return (
    <BrowserRouter history={history}>
      {window.location.href === redirectURL + "login" ? null : (
        <NavBar showNav={showNav} dispatch={dispatch} />
      )}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Routes>
          <Route path="/*" element={<Navigator />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reminders/*" element={<Reminders />} />
          <Route path="/thots" element={<Thots />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
// vercel
