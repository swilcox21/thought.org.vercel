import axios from "axios";
import { LOADING, REMINDER_DELETE } from "../../reducer";
import { baseURL } from "../../../";
import { refreshAccessToken } from "../../../actions";

export async function deleteReminder(dispatch, reminder_id) {
  dispatch({ type: LOADING });
  async function reminderDelete() {
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
  reminderDelete().catch((err) => {
    refreshAccessToken().then(() => {
      reminderDelete().catch((err) => {
        alert("invalid DELETE request");
        console.log(err);
      });
    });
  });
}
