/* eslint-disable no-unused-vars */
// import PropTypes from "prop-types";
import "../App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useDispatch, useSelector } from "react-redux";
import { useThunkReducer } from "react-hook-thunk-reducer";
import { deleteReminder } from "../Reminders/actions/apiCalls/delete";
import { getReminders } from "../Reminders/actions/apiCalls/get";
import { postReminder } from "../Reminders/actions/apiCalls/post";
import { putReminder } from "../Reminders/actions/apiCalls/put";
import reducer, {
  SET_TEXT,
  SET_EDIT_TEXT,
  SET_CHECKED,
  SET_SHOW_FULL,
  SET_THOT_TOGGLE,
} from "./thotReducer";
import SET_NAV from "../store";

// REMINDERS

function Thots(props) {
  const initialState = {
    loading: false,
    text: "",
    editText: "",
    checked: true,
    thotToggle: false,
    reminders: [],
  };
  const [state, dispatch] = useThunkReducer(reducer, initialState);
  const { loading, text, editText, checked, thotToggle, reminders } = state;

  //
  // useEffect() will call the api when the page first loads using the access token for auth
  // if it exists in the cache, else it will use refreshToken() to return a new access token
  //
  useEffect(() => {
    dispatch({ type: SET_NAV, nav: window.location.pathname });
    getReminders(dispatch);
  }, []);

  //
  //  handleLogout() clears tokens from the cache and returns the user to the login screen
  //

  return (
    <>
      {loading && <div className="loadBar">I LOVE CHRISTINE</div>}

      <div className="remindersContainer">
        <div
          onClick={() =>
            dispatch({ type: SET_THOT_TOGGLE, thotToggle: thotToggle })
          }
          className="thotToggle"
        >
          <br />
          {thotToggle ? (
            <div className="thotsHeader">
              <i className="fa fa-angle-down" aria-hidden="true"></i>
              <h4>&nbsp; thots &nbsp;</h4>
              <i className="fa fa-angle-down" aria-hidden="true"></i>
            </div>
          ) : (
            <div className="thotsHeader">
              <i className="fa fa-angle-right" aria-hidden="true"></i>
              <h4>&nbsp; thots &nbsp;</h4>
              <i className="fa fa-angle-left" aria-hidden="true"></i>
            </div>
          )}
        </div>
        <br />
        <br />
        <br />
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
          <br />
        </div>
        {thotToggle && (
          <div>
            {reminders.length > 0 &&
              reminders
                .filter((reminders) => reminders.recurring === true)
                .map((reminder, index) => (
                  <div className="reminder" key={reminder.id}>
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
                          putReminder(
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
                        deleteReminder(dispatch, reminder.id);
                      }}
                    >
                      X
                    </button>
                    <br />
                    <br />
                  </div>
                ))}
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

export default Thots;
// vercel
// Reminders.propTypes = {
//   reminder: PropTypes.object,
// };
