import axios from "axios";
import { LOADING, REMINDER_GET } from "../../reducer";
import { baseURL } from "../../../";
import { refreshAccessToken } from "../../../actions";

export function getReminders(dispatch) {
  dispatch({ type: LOADING });
  async function remindersGet() {
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
        return;
      });
  }
  remindersGet().catch((err) => {
    refreshAccessToken(dispatch).then(() => {
      remindersGet();
    });
  });
}
