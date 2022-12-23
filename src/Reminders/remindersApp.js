/* eslint-disable no-unused-vars */
// import PropTypes from "prop-types";
import "../App.css";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useDispatch, useSelector } from "react-redux";
import { useThunkReducer } from "react-hook-thunk-reducer";
import { deleteReminder } from "./actions/apiCalls/delete";
import { getReminders } from "./actions/apiCalls/get";
import { postReminder } from "./actions/apiCalls/post";
import { putReminder } from "./actions/apiCalls/put";
import reducer, {
  SET_TEXT,
  SET_EDIT_TEXT,
  SET_CHECKED,
  SET_SHOW_FULL,
  SET_SHOW_DASH,
  SET_REMINDER_TOGGLE,
  SET_WRAP_POSITION,
  SET_CONT_POSITION,
  SET_FOOT_POSITION,
  DASHBOARD,
} from "./reducer";
import { store } from "..";
import { SET_NAV } from "../store";
import { Link, Route } from "react-router-dom";
import Dashboard from "./components/dashboard";
// REMINDERS

function Reminders(props) {
  const initialState = {
    loading: false,
    dashboard: null,
    text: "",
    editText: "",
    checked: false,
    showFull: false,
    showDash: false,
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
    dashboard,
    text,
    editText,
    checked,
    reminderToggle,
    reminders,
    showDash,
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
      setPadSize(appHeight);
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
  const [padSize, setPadSize] = useState(appHeight);
  //
  // useEffect() will call the api when the page first loads using the access token for auth
  // if it exists in the cache, else it will use refreshToken() to return a new access token
  //
  useEffect(() => {
    getReminders(dispatch);
    dispatch({ type: SET_NAV, nav: window.location.pathname });
    findContainerPosition();
    findWrapperPosition();
    findFooterPosition();
    console.log("PROPS:", props);
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

  return (
    <div ref={wrapperDivRef} className="reminderWrapper">
      {loading && <div className="loadBar">I LOVE CHRISTINE</div>}
      {dashboard !== null && (
        <div style={{ margin: "auto", marginTop: "10%", width: "70%" }}>
          <Dashboard
            dispatch={dispatch}
            editText={state.editText}
            dashboard={dashboard}
          />
        </div>
      )}
      <div className="subNavHeader">
        <button
          className="addnewButton"
          onClick={() => {
            dispatch({ type: SET_SHOW_FULL, showFull: showFull });
          }}
        >
          {showFull ? "shrink" : "grow"}
        </button>
        {dashboard !== null && (
          <button
            style={{ margin: "auto", maxHeight: "40px" }}
            onClick={() => {
              dispatch({ type: DASHBOARD, dashboard: null });
            }}
          >
            clearDash
          </button>
        )}
        {props.dashboard ? (
          <button className="addnewButton">
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="/reminders"
            >
              {showDash ? "dash" : "board"}
            </Link>
          </button>
        ) : (
          <button className="addnewButton">
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="/reminders/dashboard"
            >
              {showDash ? "dash" : "board"}
            </Link>
          </button>
        )}
      </div>
      <br />
      <div ref={containerDivRef} className="remindersContainer">
        {reminders.length > 0 &&
          reminders
            .filter((reminder) =>
              (reminder.recurring === false) & (dashboard !== null)
                ? reminder.id !== dashboard.reminder.id
                : reminder.recurring === false
            )
            .map((reminder, index) => (
              <div className="reminder" key={reminder.id}>
                {props.dashboard && (
                  <button
                    className="dashButton"
                    onClick={() => {
                      dispatch({ type: DASHBOARD, dashboard: { reminder } });
                    }}
                  >
                    D
                  </button>
                )}
                <input
                  type="checkbox"
                  checked={reminder.recurring}
                  onChange={() =>
                    putReminder(
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
                      putReminder(
                        dispatch,
                        editText,
                        reminder.recurring,
                        reminder.id
                      );
                    dispatch({ type: SET_EDIT_TEXT, editText: "" });
                  }}
                />
                <button
                  className="submitButton"
                  onClick={() => {
                    deleteReminder(dispatch, reminder.id);
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
          <div>
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
                  reminderToggle: false,
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
          ></div>
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
