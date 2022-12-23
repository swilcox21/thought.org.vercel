/* eslint-disable no-unused-vars */
import "../../App.css";
import React, { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import PropTypes from "prop-types";
import { putReminder } from "../actions/apiCalls/put";
import { deleteReminder } from "../actions/apiCalls/delete";
import { SET_EDIT_TEXT, DASHBOARD } from "../reducer";

function Dashboard(props) {
  //   const [dispatch, state, dashboard] = props;
  useEffect(() => {
    console.log("DASHBOARD", props);
  }, []);

  return (
    <>
      <div className="reminder" key={props.dashboard.reminder.id}>
        <TextareaAutosize
          className="col-12 borderNone mx-3 py-1 pl-2"
          type="text"
          defaultValue={props.dashboard.reminder.text}
          onChange={(e) => {
            props.dispatch({ type: SET_EDIT_TEXT, editText: e.target.value });
          }}
          onBlur={() => {
            props.editText !== "" &&
              putReminder(
                props.dispatch,
                props.editText,
                props.dashboard.reminder.recurring,
                props.dashboard.reminder.id
              );
            props.dispatch({ type: SET_EDIT_TEXT, editText: "" });
          }}
        />
        <button
          className="submitButton"
          onClick={() => {
            deleteReminder(props.dispatch, props.dashboard.reminder.id);
          }}
        >
          X
        </button>
      </div>
      <br />
    </>
  );
}

export default Dashboard;
// vercel
