/* eslint-disable no-unused-vars */
// import PropTypes from "prop-types";
import "../App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
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
  SET_THOT_TOGGLE,
} from "./reducer";
import { development, dev, prod } from "..";
import { SET_NAV } from "../reducer";

// REMINDERS

function Reminders() {
  const initialState = {
    loading: false,
    text: "",
    editText: "",
    checked: false,
    showFull: false,
    thotToggle: false,
    reminders: [],
  };
  const [state, dispatch] = useThunkReducer(reducer, initialState);
  const { loading, text, editText, checked, thotToggle, reminders, showFull } =
    state;

  //
  // useEffect() will call the api when the page first loads using the access token for auth
  // if it exists in the cache, else it will use refreshToken() to return a new access token
  //
  useEffect(() => {
    getReminders(dispatch);
    dispatch({ type: SET_NAV, nav: "/reminders" });
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
    <>
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
      <div className="remindersContainer">
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
        <div className="reminder">
          <input
            className="phantomCheckbox"
            type="checkbox"
            checked={checked}
            onChange={() => dispatch({ type: SET_CHECKED, checked: checked })}
          />
          <TextareaAutosize
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
            }}
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
          <br />
          <br />
        </div>
        {thotToggle ? (
          <div>
            <div
              className="thotToggle"
              onClick={() =>
                dispatch({ type: SET_THOT_TOGGLE, thotToggle: thotToggle })
              }
            >
              <br />
              <div className="thotsHeader">
                <i className="fa fa-angle-down" aria-hidden="true"></i>
                <h4>&nbsp; thots &nbsp;</h4>
                <i className="fa fa-angle-down" aria-hidden="true"></i>
              </div>
            </div>
            {reminders.length > 0 &&
              reminders
                .filter((reminders) => reminders.recurring === true)
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
                      className="col-9 borderBottom textareaAutosize mx-3 py-1 pl-2"
                      type="text"
                      defaultValue={reminder.text}
                      onChange={(e) => {
                        dispatch({
                          type: SET_EDIT_TEXT,
                          editText: e.target.value,
                        });
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
          </div>
        ) : (
          <div
            onClick={() =>
              dispatch({ type: SET_THOT_TOGGLE, thotToggle: thotToggle })
            }
            className="thotToggle"
          >
            <br />
            <div className="thotsHeader">
              <i className="fa fa-angle-right" aria-hidden="true"></i>
              <h4>&nbsp; thots &nbsp;</h4>
              <i className="fa fa-angle-left" aria-hidden="true"></i>
            </div>
          </div>
        )}
      </div>
      <br />
      <br />
      <br />
      <footer className="footer">thot.org</footer>
    </>
  );
}

export default Reminders;
// vercel
// Reminders.propTypes = {
//   reminder: PropTypes.object,
// };
