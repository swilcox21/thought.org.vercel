/* eslint-disable no-unused-vars */
import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import PropTypes from "prop-types";
import NewThought from "./components/newThought";
// import TextareaAutosize from 'react-textarea-autosize';

function Reminders(props) {
  const [loading, setLoading] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");

  useEffect(() => {
    axios
      .get("https://thoughtorgapi.herokuapp.com/reminder/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then(function (response) {
        setReminders(response.data);
      });
  }, []);

  async function reminderPost(text) {
    setLoading(true);
    const data = {
      text: text,
    };
    await axios
      .post("https://thoughtorgapi.herokuapp.com/reminder/", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        setLoading(false);
        axios
          .get("https://thoughtorgapi.herokuapp.com/reminder/", {
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
  async function reminderPut(text, reminder_id) {
    setLoading(true);
    const data = {
      text: text,
    };
    await axios
      .put(
        "https://thoughtorgapi.herokuapp.com/reminder/" + reminder_id,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((response) => {
        setLoading(false);
        axios
          .get("https://thoughtorgapi.herokuapp.com/reminder/", {
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
      .delete("https://thoughtorgapi.herokuapp.com/reminder/" + reminder_id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) =>
        axios
          .get("https://thoughtorgapi.herokuapp.com/reminder/", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          })
          .then(function (response) {
            setReminders(response.data);
          })
      );
  }

  //   axios
  //   .get("https://thoughtorgapi.herokuapp.com/reminder/", {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  //     },
  //   })
  //   .then(function (response) {
  //     setReminders(response.data);
  //   });
  // }

  const handleLogout = () => {
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("access_token");
    window.location = "https://thought-org.vercel.app/";
  };

  return (
    <>
      <button onClick={() => handleLogout()}>HOME</button>
      <br />
      <br />
      <br />
      <div className="remindersContainer">
        <TextareaAutosize
          id="textareaautosize"
          className="col-9 borderBottom py-1 pl-2"
          placeholder="Type your Thought here"
          type="text"
          defaultValue={""}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          onBlur={() => {
            text !== "" && reminderPost(text);
          }}
        />
        <br />
        <br />
        <button
          // className="submitButton"
          onClick={() => {
            reminderPost(text);
            setText("");
          }}
        >
          submit
        </button>
        <br />
        <br />
        <br />
        {reminders.length > 0 &&
          reminders.map((reminder, index) => (
            <div key={reminder.id}>
              {" "}
              <TextareaAutosize
                id="textareaautosize"
                className="col-9 borderBottom py-1 pl-2"
                placeholder="Type your Thought here"
                type="text"
                defaultValue={reminder.text}
                // value={editText}
                onChange={(e) => {
                  setEditText(e.target.value);
                }}
                onBlur={() => {
                  editText !== "" && reminderPut(editText, reminder.id);
                  // setEditText("");
                }}
              />
              <button
                // className="submitButton"
                onClick={() => {
                  reminderDelete(reminder.id);
                }}
              >
                x
              </button>
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
