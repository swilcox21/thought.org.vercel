import axios from "axios";
import {
  LOADING,
  REMINDER_GET,
  REMINDER_POST,
  REMINDER_PUT,
  REMINDER_DELETE,
} from "./reminderReducer";
import { baseURL, redirectURL } from "..";

// RETREIVE EXPIRED ACCESS TOKEN WITH THIS REFRESH TOKEN FUNCTION
export async function refreshAccessToken(dispatch) {
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
      getReminders(dispatch);
    })
    .catch((err) => {
      localStorage.removeItem("refresh");
      localStorage.removeItem("access");
      alert("your session has expired please log back in");
      window.location = redirectURL + "login";
    });
}

export async function getReminders(dispatch) {
  dispatch({ type: LOADING });
  await axios
    .get(`${baseURL}/reminder/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
    .then((response) => {
      console.log("THE GET:", response.data);
      dispatch({
        type: REMINDER_GET,
        reminders: response.data,
        // ...response.body,
      });
    })
    .catch((err) => {
      refreshAccessToken(dispatch);
    });
}

// POST
export function postReminder(dispatch, text, recurring) {
  dispatch({ type: LOADING });
  const data = {
    text: text,
    recurring: recurring,
  };
  // declaring the post request here but not calling it quite yet so I can call it multiple times later without having to rewrite the entire function DRY
  // when more models are present can write this somewhere else (like reducers) and reuse for all the different api url locations...
  async function postRequest(data) {
    await axios
      .post(`${baseURL}/reminder/`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => {
        console.log("THE POST:", response.data);
        dispatch({
          type: REMINDER_POST,
          id: response.data.id,
          owner: response.data.owner,
          created_date: response.data.date,
          due_date: response.data.date,
          recurring: response.data.recurring,
          text: response.data.text,
        });
      });
    // .catch() will be called later because this function requires multiple different catches
    // 1. CATCH REFRESH:    for the refresh token which will happen by design quite often
    // 2. CATCH ALL ELSE:   for any other reason that an API might fail
  }
  // actual post request call here followed by the REFRESH CATCH
  // recalling post request with the new acces token from the refresh() return followed by the CATCH ALL ELSE
  postRequest(data).catch((err) => {
    console.log(err);
    refreshAccessToken(dispatch).then(() => {
      postRequest(data).catch((err) => {
        alert("invalid POST request");
        console.log(err);
      });
    });
  });
}

// PUT
export async function reminderPut(dispatch, text, recurring, reminder_id) {
  dispatch({ type: LOADING });
  const data = {
    text: text,
    recurring: recurring,
  };
  async function putRequest(data) {
    await axios
      .put(`${baseURL}/reminder/` + reminder_id, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => {
        dispatch({
          type: REMINDER_PUT,
          id: response.data.id,
          owner: response.data.owner,
          created_date: response.data.date,
          due_date: response.data.date,
          recurring: response.data.recurring,
          text: "",
        });
      });
  }
  putRequest(data).catch((err) => {
    console.log(err);
    refreshAccessToken(dispatch).then(() => {
      putRequest(data).catch((err) => {
        alert("invalid PUT request");
        console.log(err);
      });
    });
  });
}

// DELETE
export async function reminderDelete(dispatch, reminder_id) {
  dispatch({ type: LOADING });
  async function deleteRequest() {
    await axios
      .delete(`${baseURL}/reminder/` + reminder_id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => {
        console.log(response);
        dispatch({
          type: REMINDER_DELETE,
          id: reminder_id,
        });
      });
  }
  deleteRequest().catch((err) => {
    refreshAccessToken().then(() => {
      deleteRequest().catch((err) => {
        alert("invalid DELETE request");
        console.log(err);
      });
    });
  });
}
// vercel
