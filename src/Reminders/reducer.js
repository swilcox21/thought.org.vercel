import axios from "axios";

const initialState = [];
const baseURL = "https://thorgapi.herokuapp.com";
// const initialState = axios
//   .get(`${baseURL}/reminder/`, {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("access")}`,
//     },
//   })
//   .then((response) => {
//     console.log("reducer:", response.data);
//     return response.data;
//   })
//   .catch((err) => {
//     refreshAccessToken().then(() => {
//       axios
//         .get(`${baseURL}/reminder/`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("access")}`,
//           },
//         })
//         .then((response) => {
//           console.log("reducer:", response.data);
//           return response.data;
//         });
//     });
//   });

async function refreshAccessToken() {
  const baseURL = "https://thorgapi.herokuapp.com";
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
      getReminders();
    })
    .catch((err) => {
      console.log(err);
      //   localStorage.removeItem("refresh");
      //   localStorage.removeItem("access");
      //   window.location = "https://thought-org.vercel.app/login";
      //   window.location = "http://localhost:3000/login";
      //   alert("your session has expired please log back in");
    });
}

function getReminders() {
  const baseURL = "https://thorgapi.herokuapp.com";
  axios
    .get(`${baseURL}/reminder/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
    .then((response) => {
      console.log("reducer:", response.data);
      return response.data;
    })
    .catch((err) => {
      refreshAccessToken();
    });
}

export default function remindersReducer(state = initialState, action) {
  switch (action.type) {
    case "reminder/reminderGet": {
      const baseURL = "https://thorgapi.herokuapp.com";
      // Can return just the new todos array - no extra object around it
      return [
        ...state,
        axios
          .get(`${baseURL}/reminder/`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          })
          .then((response) => {
            console.log("reducer:", response.data);
            return response.data;
          })
          .catch((err) => {
            refreshAccessToken();
          }),
      ];
    }
    case "reminder/reminderPost": {
      // Can return just the new todos array - no extra object around it
      return [
        ...state,
        {
          text: action.payload.text,
          recurring: action.payload.recurring,
        },
      ];
    }
    default:
      return state;
  }
}
