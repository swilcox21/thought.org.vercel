import axios from "axios";
import { LOADING, REMINDER_POST } from "../../reducer";
import { baseURL } from "../../../";
import { refreshAccessToken } from "../../../actions";

export function postReminder(dispatch, text, recurring) {
  dispatch({ type: LOADING });
  const data = {
    text: text,
    recurring: recurring,
  };
  async function reminderPost(data) {
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
  reminderPost(data).catch((err) => {
    console.log(err);
    refreshAccessToken(dispatch).then(() => {
      reminderPost(data).catch((err) => {
        alert("invalid POST request");
        console.log(err);
      });
    });
  });
}
