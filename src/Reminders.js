/* eslint-disable no-unused-vars */
import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import PropTypes from "prop-types";

const baseURL = "https://thorgapi.herokuapp.com";

function Reminders(props) {
  const [loading, setLoading] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");
  const [checked, setChecked] = useState(false);

  //
  // RETREIVE EXPIRED ACCESS TOKEN WITH THIS REFRESH TOKEN FUNCTION
  //
  async function refreshAccessToken() {
    const body = { refresh: localStorage.getItem("refresh") };
    await axios
      .post(`${baseURL}/api/token/refresh/`, body, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        localStorage.setItem("access", response.data.access);
        setLoading(false);
      })
      .catch((err) => {
        localStorage.removeItem("refresh");
        localStorage.removeItem("access");
        window.location = "https://thought-org.vercel.app/login";
        // window.location = "http://localhost:3000/login";
        alert("your session has expired please log back in");
        setLoading(false);
      });
  }

  //
  // REUSABLE GET REQUEST FOR REMINDERS (will use refresh if access is expired)
  //
  async function getReminders() {
    await axios
      .get(`${baseURL}/reminder/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => {
        setReminders(response.data);
        setLoading(false);
      })
      .catch((err) => {
        refreshAccessToken();
      });
  }

  //
  // USEEFFECT CALL FOR EACH TIME THE PAGE LOADS
  // (WILL GET REMINDERS WITH THE ACCESS TOKEN OR
  // WILL USE THE REFRESH FUNCTION FOR NEW ACCESS
  // TOKEN IF ITS EXPIRED)
  //
  useEffect(() => {
    setLoading(true);
    getReminders();
  }, []);

  //
  //  POST PUT AND DELETE REQUESTS FOR REMINDERS
  //
  //  POST
  async function reminderPost(text, recurring) {
    setLoading(true);
    const data = {
      text: text,
      recurring: recurring,
    };
    await axios
      .post(`${baseURL}/reminder/`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => {
        getReminders();
        setText("");
      })
      .catch((err) => {
        refreshAccessToken();
        axios
          .post(`${baseURL}/reminder/`, data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          })
          .then((response) => {
            setLoading(false);
            getReminders();
          })
          .catch((err) => {
            alert("invalid POST request");
            setLoading(false);
            console.log(err);
          });
      });
  }
  // PUT
  async function reminderPut(text, recurring, reminder_id) {
    setLoading(true);
    const data = {
      text: text,
      recurring: recurring,
    };
    await axios
      .put(`${baseURL}/reminder/` + reminder_id, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => {
        setLoading(false);
        getReminders();
        setEditText("");
      })
      .catch((err) => {
        console.log(err);
        refreshAccessToken();
        axios
          .put(`${baseURL}/reminder/` + reminder_id, data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          })
          .then((response) => {
            setLoading(false);
            getReminders();
            setEditText("");
          })
          .catch((err) => {
            alert("invalid PUT request");
            setLoading(false);
            console.log(err);
          });
      });
  }
  // DELETE
  async function reminderDelete(reminder_id) {
    setLoading(true);
    await axios
      .delete(`${baseURL}/reminder/` + reminder_id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => {
        setLoading(false);
        getReminders();
      })
      .catch((err) => {
        refreshAccessToken();
        axios
          .delete(`${baseURL}/reminder/` + reminder_id, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          })
          .catch((err) => {
            alert("invalid DELETE request");
            setLoading(false);
            console.log(err);
          });
      });
  }

  const handleLogout = () => {
    localStorage.removeItem("refresh");
    localStorage.removeItem("access");
    // window.location = "http://localhost:3000/";
    window.location = "https://thought-org.vercel.app/";
  };

  return (
    <>
      {loading && (
        <div className="loadBar">
          ==============================================
        </div>
      )}
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
