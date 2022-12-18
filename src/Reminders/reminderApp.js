/* eslint-disable no-unused-vars */
// import PropTypes from "prop-types";
import "../App.css";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useDispatch, useSelector } from "react-redux";
import { useThunkReducer } from "react-hook-thunk-reducer";
import {
  getReminders,
  postReminder,
  reminderPut,
  reminderDelete,
} from "./actions";

import reducer, {
  SET_TEXT,
  SET_EDIT_TEXT,
  SET_CHECKED,
  SET_SHOW_FULL,
  SET_REMINDER_TOGGLE,
  SET_WRAP_POSITION,
  SET_CONT_POSITION,
  SET_FOOT_POSITION,
} from "./reminderReducer";
import { development, dev, prod } from "..";
import { SET_NAV } from "../store";

// REMINDERS

function Reminders() {
  const initialState = {
    loading: false,
    text: "",
    editText: "",
    checked: false,
    showFull: false,
    reminderToggle: false,
    reminders: [],
    wrapSize: {},
    contSize: {},
    footSize: {},
  };
  const [state, dispatch] = useThunkReducer(reducer, initialState);
  const [wrapPos, setWrapPos] = useState(state.wrapSize.height);
  const [contPos, setContPos] = useState(state.contSize.height);
  const [footPos, setFootPos] = useState(state.footSize.height);
  const {
    loading,
    text,
    editText,
    checked,
    reminderToggle,
    reminders,
    showFull,
    wrapSize,
    contSize,
    footSize,
  } = state;

  const wrapperDivRef = useRef(null);
  const containerDivRef = useRef(null);
  const FooterivRef = useRef(null);
  const inputRef = useRef(null);
  const findWrapperPosition = () => {
    if (wrapperDivRef.current) {
      const xPos = wrapperDivRef.current.offsetLeft + window.scrollX;
      const yPos = wrapperDivRef.current.offsetTop + window.scrollY;
      console.log("WRAP", { wdidth: xPos, hieght: yPos });
      console.log("appHeight", appHeight);
      dispatch({
        type: SET_WRAP_POSITION,
        screenSize: yPos,
      });
      return yPos;
    }
  };

  const findContainerPosition = () => {
    if (containerDivRef.current) {
      const xPos = containerDivRef.current.offsetLeft + window.scrollX;
      const yPos = containerDivRef.current.offsetTop + window.scrollY;
      console.log("CONTAIN", { wdidth: xPos, hieght: yPos });
      dispatch({
        type: SET_CONT_POSITION,
        screenSize: yPos,
      });
      return yPos;
    }
  };

  const findFooterPosition = () => {
    if (FooterivRef.current) {
      const xPos = FooterivRef.current.offsetLeft + window.scrollX;
      const yPos = FooterivRef.current.offsetTop + window.scrollY;
      console.log("FOOTER", { wdidth: xPos, hieght: yPos });
      dispatch({
        type: SET_FOOT_POSITION,
        screenSize: yPos,
      });
      return yPos;
    }
  };

  const appHeight = Math.round(footSize - contSize);

  //
  // useEffect() will call the api when the page first loads using the access token for auth
  // if it exists in the cache, else it will use refreshToken() to return a new access token
  //
  useEffect(() => {
    getReminders(dispatch);
    dispatch({ type: SET_NAV, nav: "/reminders" });
    findContainerPosition();
    findWrapperPosition();
    findFooterPosition();
    window.addEventListener("scroll", findContainerPosition);
    window.addEventListener("scroll", findWrapperPosition);
    window.addEventListener("scroll", findFooterPosition);
    return () => {
      window.removeEventListener("scroll", findContainerPosition);
      window.removeEventListener("scroll", findWrapperPosition);
      window.removeEventListener("scroll", findContainerPosition);
    };
  }, []);

  //
  //  handleLogout() clears tokens from the cache and returns the user to the login screen
  //
  const handleLogout = () => {
    localStorage.removeItem("refresh");
    localStorage.removeItem("access");
    window.location = development ? dev : prod;
  };

  return (
    <div ref={wrapperDivRef} className="reminderWrapper">
      {loading && <div className="loadBar">I LOVE CHRISTINE</div>}
      <button
        className="addnewButton"
        onClick={() => {
          dispatch({ type: SET_SHOW_FULL, showFull: showFull });
        }}
      >
        {showFull ? "shrink" : "grow"}
      </button>
      <br />
      <br />
      <br />
      <div ref={containerDivRef} className="remindersContainer">
        <br />
        <h2>Reminders</h2>
        <br />
        {reminders.length > 0 &&
          reminders
            .filter((reminders) => reminders.recurring === false)
            .map((reminder, index) => (
              <div className="reminder" key={reminder.id}>
                <input
                  type="checkbox"
                  checked={reminder.recurring}
                  onChange={() =>
                    reminderPut(
                      dispatch,
                      reminder.text,
                      !reminder.recurring,
                      reminder.id
                    )
                  }
                />
                <TextareaAutosize
                  className={
                    showFull
                      ? "col-9 borderBottom mx-3 py-1 pl-2"
                      : "col-9 borderBottom reminderTextArea mx-3 py-1 pl-2"
                  }
                  type="text"
                  defaultValue={reminder.text}
                  onChange={(e) => {
                    dispatch({ type: SET_EDIT_TEXT, editText: e.target.value });
                  }}
                  onBlur={() => {
                    editText !== "" &&
                      reminderPut(
                        dispatch,
                        editText,
                        reminder.recurring,
                        reminder.id
                      );
                  }}
                />
                <button
                  className="submitButton"
                  onClick={() => {
                    reminderDelete(dispatch, reminder.id);
                  }}
                >
                  X
                </button>
                <br />
                <br />
              </div>
            ))}

        {/* NEW REMINDER */}
        {reminderToggle ? (
          <div lassName="reminder">
            <input
              className="phantomCheckbox"
              type="checkbox"
              checked={checked}
              onChange={() => dispatch({ type: SET_CHECKED, checked: checked })}
            />
            <TextareaAutosize
              ref={inputRef}
              className="col-9 borderBottom mx-3 py-1 pl-2"
              placeholder="Add new Reminder here..."
              type="text"
              defaultValue={""}
              value={text}
              onChange={(e) => {
                dispatch({ type: SET_TEXT, text: e.target.value });
              }}
              onBlur={() => {
                console.log("i love you chritine");
                text !== "" && postReminder(dispatch, text, checked);
                dispatch({
                  type: SET_REMINDER_TOGGLE,
                  reminderToggle: reminderToggle,
                });
              }}
              autoFocus
            />
            <button
              className="submitButton"
              onClick={() => {
                console.log("its a me MARIO");
                text === "" && postReminder(dispatch, text, checked);
              }}
            >
              +
            </button>
            <div
              style={{ height: appHeight - 200 }}
              onClick={() =>
                dispatch({
                  type: SET_REMINDER_TOGGLE,
                  reminderToggle: !reminderToggle,
                })
              }
            ></div>
          </div>
        ) : (
          <div
            // 238
            onClick={() =>
              dispatch({
                type: SET_REMINDER_TOGGLE,
                reminderToggle: reminderToggle,
              })
            }
            style={{ height: appHeight - 200 }}
          >
            hi
          </div>
        )}
      </div>
      <br />
      <br />
      <br />
      <footer ref={FooterivRef} className="footer">
        thot.org
      </footer>
    </div>
  );
}

export default Reminders;
// vercel
// Reminders.propTypes = {
//   reminder: PropTypes.object,
// };
