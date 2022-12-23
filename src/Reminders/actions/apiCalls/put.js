import axios from "axios";
import { getReminders } from "./get";
import { LOADING, SET_EDIT_TEXT } from "../../reducer";
import { baseURL } from "../../../";
import { refreshAccessToken } from "../../../actions";

export function putReminder(dispatch, text, recurring, reminder_id) {
  dispatch({ type: LOADING });
  const data = {
    text: text,
    recurring: recurring,
  };
  async function reminderPut(data) {
    await axios
      .put(`${baseURL}/reminder/` + reminder_id, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => {
        getReminders(dispatch);
        dispatch({ type: SET_EDIT_TEXT, editText: "" });
        // console.log("PUTREMINDER:", response.data);
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
  reminderPut(data).catch((err) => {
    console.log(err);
    refreshAccessToken(dispatch).then(() => {
      reminderPut(data).catch((err) => {
        alert("invalid PUT request");
        console.log(err);
      });
    });
  });
}
