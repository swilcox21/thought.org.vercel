/* eslint-disable no-unused-vars */
import "../App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import PropTypes from "prop-types";
// import { useDispatch, useSelector } from "react-redux";

const baseURL = "https://thorgapi.herokuapp.com";

// const selectReminders = (state) => state.reminders;

function Reminders(props) {
  const [loading, setLoading] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");
  const [checked, setChecked] = useState(false);
  const [thotToggle, setThotToggle] = useState(false);

  // const dispatch = useDispatch();

  // const remindersList = useSelector(selectReminders);

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
        console.log("THE GET:", response.data);
        setReminders(response.data);
        setLoading(false);
      })
      .catch((err) => {
        refreshAccessToken();
      });
  }

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
        alert("your session has expired please log back in");
        setLoading(false);
        // window.location = "http://localhost:3000/login";
        window.location = "https://thought-org.vercel.app/login";
      });
  }

  const handleLogout = () => {
    localStorage.removeItem("refresh");
    localStorage.removeItem("access");
    // window.location = "http://localhost:3000/";
    window.location = "https://thought-org.vercel.app/";
  };

  //
  // USEEFFECT CALL FOR EACH TIME THE PAGE LOADS
  // (WILL GET REMINDERS WITH THE ACCESS TOKEN OR
  // WILL USE THE REFRESH FUNCTION FOR NEW ACCESS
  // TOKEN IF ITS EXPIRED)
  //
  useEffect(() => {
    setLoading(true);
    getReminders().then(() => {
      console.log("reminders:", reminders);
      // console.log("remindersList:", remindersList);
      // });
    });
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
    // declaring the post request here but not calling it quite yet so I can call it multiple times later without having to rewrite the entire function DRY
    // when more models are present can write this somewhere else (like reducers) and reuse for all the different api url locations...
    function postRequest(text, recurring) {
      axios
        .post(`${baseURL}/reminder/`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        })
        .then((response) => {
          getReminders();
          setText("");
        });
      // .catch() will be called later because this function requires multiple different catches
      // 1. CATCH REFRESH:    for the refresh token which will happen by design quite often
      // 2. CATCH ALL ELSE:   for any other reason that an API might fail
    }
    // actual post request call here followed by the REFRESH CATCH
    // recalling post request with the new acces token from the refresh() return followed by the CATCH ALL ELSE
    postRequest().catch((err) => {
      refreshAccessToken().then(() => {
        postRequest().catch((err) => {
          alert("invalid POST request");
          setLoading(false);
          console.log(err);
        });
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
    const id = reminder_id;
    async function putRequest() {
      await axios
        .put(`${baseURL}/reminder/` + id, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        })
        .then((response) => {
          setLoading(false);
          getReminders();
          setEditText("");
        });
    }
    putRequest().catch((err) => {
      console.log(err);
      refreshAccessToken().then(() => {
        putRequest().catch((err) => {
          alert("invalid PUT request");
          setLoading(false);
          console.log(err);
        });
      });
    });
  }

  // DELETE
  async function reminderDelete(reminder_id) {
    setLoading(true);
    async function deleteRequest() {
      await axios
        .delete(`${baseURL}/reminder/` + reminder_id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        })
        .then((response) => {
          setLoading(false);
          getReminders();
        });
    }
    deleteRequest().catch((err) => {
      refreshAccessToken().then(() => {
        deleteRequest().catch((err) => {
          alert("invalid DELETE request");
          setLoading(false);
          console.log(err);
        });
      });
    });
  }

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
            className="phantomCheckbox"
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
        {thotToggle ? (
          <div>
            <div
              className="thotToggle"
              onClick={() => setThotToggle(!thotToggle)}
            >
              <br />
              <div className="thotsHeader">
                <i class="fa fa-angle-down" aria-hidden="true"></i>
                <h4>&nbsp; thots &nbsp;</h4>
                <i class="fa fa-angle-down" aria-hidden="true"></i>
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
                          reminder.text,
                          !reminder.recurring,
                          reminder.id
                        )
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
                          reminderPut(
                            editText,
                            reminder.recurring,
                            reminder.id
                          );
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
        ) : (
          <div
            onClick={() => setThotToggle(!thotToggle)}
            className="thotToggle"
          >
            <br />
            <div className="thotsHeader">
              <i class="fa fa-angle-right" aria-hidden="true"></i>
              <h4>&nbsp; thots &nbsp;</h4>
              <i class="fa fa-angle-left" aria-hidden="true"></i>
            </div>
          </div>
        )}
      </div>
      <footer className="footer">thot.org</footer>
    </>
  );
}

export default Reminders;
// vercel
// Reminders.propTypes = {
//   reminder: PropTypes.object,
// };
