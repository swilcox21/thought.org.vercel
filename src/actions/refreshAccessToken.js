// no global actions yet since the only compoment that works is reminders
import axios from "axios";
import { baseURL, redirectURL } from "./";

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
    })
    .catch((err) => {
      localStorage.removeItem("refresh");
      localStorage.removeItem("access");
      alert("your session has expired please log back in");
      window.location = redirectURL + "login";
    });
}
