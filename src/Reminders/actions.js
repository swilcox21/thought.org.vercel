import axios from "axios";
import {
  LOADING,
  REMINDER_GET,
  REMINDER_POST,
  REMINDER_PUT,
  REMINDER_DELETE,
} from "./reminderReducer";
import { baseURL, redirectURL } from "..";

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
      });
    })
    .catch((err) => {
      refreshAccessToken(dispatch);
    });
}

export function postReminder(dispatch, text, recurring) {
  dispatch({ type: LOADING });
  const data = {
    text: text,
    recurring: recurring,
  };
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
  }
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

export function reminderPut(dispatch, text, recurring, reminder_id) {
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
        getReminders(dispatch);
        // console.log("PUTREQUEST:", response.data);
        // dispatch({
        //   type: REMINDER_PUT,
        //   id: response.data.id,
        //   owner: response.data.owner,
        //   created_date: response.data.date,
        //   due_date: response.data.date,
        //   recurring: response.data.recurring,
        //   text: "",
        // });
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
