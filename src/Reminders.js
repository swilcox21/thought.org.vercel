/* eslint-disable no-unused-vars */
import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import PropTypes from "prop-types";

const baseURL = "http://0.0.0.0:8000";

function Reminders(props) {
  const [loading, setLoading] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    axios
      .get(`${baseURL}/reminder/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then(function (response) {
        setReminders(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("access_token");
        window.location = "https://thought-org.vercel.app/login";
        window.location = "http://localhost:3000/login";
        alert("your session has expired please log back in");
      });
  }, []);

  async function reminderPost(text, recurring) {
    setLoading(true);
    const data = {
      text: text,
      recurring: recurring,
    };
    await axios
      .post(`${baseURL}/reminder/`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        setLoading(false);
        axios
          .get(`${baseURL}/reminder/`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          })
          .then(function (response) {
            setReminders(response.data);
            setText("");
          });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  async function reminderPut(text, recurring, reminder_id) {
    setLoading(true);
    const data = {
      text: text,
      recurring: recurring,
    };
    await axios
      .put(`${baseURL}/reminder/` + reminder_id, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        setLoading(false);
        axios
          .get(`${baseURL}/reminder/`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          })
          .then(function (response) {
            setReminders(response.data);
            setEditText("");
          });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  async function reminderDelete(reminder_id) {
    await axios
      .delete(`${baseURL}/reminder/` + reminder_id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) =>
        axios
          .get(`${baseURL}/reminder/`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          })
          .then(function (response) {
            setReminders(response.data);
          })
      );
  }

  const handleLogout = () => {
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("access_token");
    // window.location = 'http://localhost:3000/';
    window.location = "https://thought-org.vercel.app/";
  };

  return (
    <>
      <button
        className="addnewButton"
        onClick={() => {
          text === "" && reminderPost(text, checked);
          setText("");
        }}
      >
        addnew
      </button>
      <button className="logoutButton" onClick={() => handleLogout()}>
        &nbsp;logout&nbsp;
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
                    reminderPut(reminder.text, !reminder.recurring, reminder.id)
                  }
                />
                <TextareaAutosize
                  id="textareaautosize"
                  className="col-9 borderBottom mx-3 py-1 pl-2"
                  type="text"
                  defaultValue={reminder.text}
                  onChange={(e) => {
                    setEditText(e.target.value);
                  }}
                  onBlur={() => {
                    editText !== "" &&
                      reminderPut(editText, reminder.recurring, reminder.id);
                  }}
                />
                <button
                  className="submitButton"
                  onClick={() => {
                    reminderDelete(reminder.id);
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
            type="checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          <TextareaAutosize
            id="textareaautosize"
            className="col-9 borderBottom mx-3 py-1 pl-2"
            placeholder="Add new Reminder here..."
            type="text"
            defaultValue={""}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            onBlur={() => {
              text !== "" && reminderPost(text, checked);
            }}
          />
          <button
            className="submitButton"
            onClick={() => {
              text === "" && reminderPost(text, checked);
              setText("");
              setChecked(false);
            }}
          >
            +
          </button>
          <br />
          <br />
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
                    reminderPut(reminder.text, !reminder.recurring, reminder.id)
                  }
                />
                <TextareaAutosize
                  id="textareaautosize"
                  className="col-9 borderBottom mx-3 py-1 pl-2"
                  type="text"
                  defaultValue={reminder.text}
                  onChange={(e) => {
                    setEditText(e.target.value);
                  }}
                  onBlur={() => {
                    editText !== "" &&
                      reminderPut(editText, reminder.recurring, reminder.id);
                  }}
                />
                <button
                  className="submitButton"
                  onClick={() => {
                    reminderDelete(reminder.id);
                  }}
                >
                  X
                </button>
                <br />
                <br />
              </div>
            ))}
      </div>
    </>
  );
}

export default Reminders;
// vercel
// Reminders.propTypes = {
//   reminder: PropTypes.object,
// };
