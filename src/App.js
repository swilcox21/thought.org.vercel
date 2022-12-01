/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Folder from "./components/folder";
import Thought from "./components/thought";
import NewThought from "./components/newThought";
import Navbar from "./components/navbar2";
import Dashboard from "./components/dashboard";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";

const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const drfClientId = process.env.REACT_APP_DRF_CLIENT_ID;
const drfClientSecret = process.env.REACT_APP_DRF_CLIENT_SECRET;
const baseURL = "http://0.0.0.0:8000";
const clientId =
  "1007332775808-q4j6sklcv5oi9stfl9j35etdvorooj9m.apps.googleusercontent.com";

function App() {
  // const [loading, setLoading] = useState(false);
  // const [allFolders, setAllFolders] = useState([]);
  // const [allThoughts, setAllThoughts] = useState([]);
  // const [reminders, setReminders] = useState([]);
  // const [loginData, setLoginData] = useState(
  //   localStorage.getItem("access_token")
  //     ? localStorage.getItem("access_token")
  //     : null
  // );

  // google-login functions
  // const handleGoogleLogin = (response) => {
  //   axios
  //     .post(`${baseURL}/auth/convert-token`, {
  //       token: response.accessToken,
  //       backend: "google-oauth2",
  //       grant_type: "convert_token",
  //       client_id: drfClientId,
  //       client_secret: drfClientSecret,
  //     })
  //     .then((res) => {
  //       const { access_token, refresh_token } = res.data;
  //       console.log(res.data);
  //       console.log({ access_token, refresh_token });
  //       localStorage.setItem("access_token", access_token);
  //       setLoginData(access_token);
  //       localStorage.setItem("refresh_token", refresh_token);
  //     })
  //     .catch((err) => {
  //       console.log("Error Google login", err);
  //     });
  // };
  // local storage logout function
  // const handleLogout = () => {
  //   localStorage.removeItem("refresh_token");
  //   localStorage.removeItem("access_token");
  //   setLoginData(null);
  // };

  // onLoad Get Requests
  useEffect(() => {
    localStorage.getItem("access_token")
      ? (window.location = "https://thought-org.vercel.app/reminders")
      : (window.location = "https://thought-org.vercel.app/login");
  }, []);
  // useEffect(() => {
  //   localStorage.getItem("access_token")
  //     ? (window.location = "http://localhost:3000/reminders")
  //     : (window.location = "http://localhost:3000/login");
  // }, []);

  // Post Requests
  // async function newThoughtPost(name, thought) {
  //   setLoading(true);
  //   const data = {
  //     name: name,
  //     thought: [thought],
  //   };
  //   await axios
  //     .post("https://thought-org.herokuapp.com/folder", data)
  //     .then((response) => {
  //       setLoading(false);
  //       axios
  //         .get("https://thought-org.herokuapp.com/folder")
  //         .then(function (response) {
  //           setAllFolders(response.data);
  //         });
  //       axios
  //         .get("https://thought-org.herokuapp.com/thought")
  //         .then(function (response) {
  //           setAllThoughts(response.data);
  //         });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setLoading(false);
  //     });
  // }
  // async function folderPost(name, thought_id, thought, dashboard) {
  //   setLoading(true);
  //   const data = {
  //     name: name,
  //     thought: [thought],
  //   };
  //   await axios
  //     .post("https://thought-org.herokuapp.com/folder/new/", data)
  //     .then((response) => {
  //       setLoading(false);
  //       thoughtPut(thought_id, thought, dashboard, response.data.id);
  //       axios
  //         .get("https://thought-org.herokuapp.com/folder")
  //         .then(function (response) {
  //           setAllFolders(response.data);
  //         });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setLoading(false);
  //     });
  // }
  // async function thoughtPost(thought, folder_id) {
  //   setLoading(true);
  //   const data = {
  //     thought: thought,
  //     folder: folder_id,
  //   };
  //   await axios
  //     .post("https://thought-org.herokuapp.com/thought", data)
  //     .then((response) => {
  //       setLoading(false);
  //       axios
  //         .get("https://thought-org.herokuapp.com/thought")
  //         .then(function (response) {
  //           setAllThoughts(response.data);
  //         });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setLoading(false);
  //     });
  // }
  // // Put Requests
  // async function folderPut(folder_id, name, dashboard, toggle) {
  //   setLoading(true);
  //   const data = {
  //     name: name,
  //     dashboard: dashboard,
  //     toggle: toggle,
  //   };
  //   await axios
  //     .put("https://thought-org.herokuapp.com/folder/" + folder_id, data)
  //     .then(function (response) {
  //       setLoading(false);
  //       axios
  //         .get("https://thought-org.herokuapp.com/folder")
  //         .then(function (response) {
  //           setAllFolders(response.data);
  //         });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setLoading(false);
  //     });
  // }
  // async function thoughtPut(thought_id, thought, dashboard, folder_id) {
  //   setLoading(true);
  //   const data = {
  //     thought: thought,
  //     dashboard: dashboard,
  //     folder: folder_id,
  //   };
  //   await axios
  //     .put("https://thought-org.herokuapp.com/thought/" + thought_id, data)
  //     .then(function (response) {
  //       setLoading(false);
  //       axios
  //         .get("https://thought-org.herokuapp.com/thought")
  //         .then(function (response) {
  //           setAllThoughts(response.data);
  //         });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setLoading(false);
  //     });
  // }
  // // delete requests
  // async function thoughtDelete(thought_id) {
  //   await axios
  //     .delete("https://thought-org.herokuapp.com/thought/" + thought_id)
  //     .then((response) =>
  //       axios
  //         .get("https://thought-org.herokuapp.com/thought")
  //         .then(function (response) {
  //           setAllThoughts(response.data);
  //         })
  //     );
  // }
  // async function folderDelete(thought_id) {
  //   await axios
  //     .delete("https://thought-org.herokuapp.com/folder/" + thought_id)
  //     .then((response) => {
  //       setLoading(false);
  //       axios
  //         .get("https://thought-org.herokuapp.com/folder")
  //         .then(function (response) {
  //           setAllFolders(response.data);
  //         });
  //       axios
  //         .get("https://thought-org.herokuapp.com/thought")
  //         .then(function (response) {
  //           setAllThoughts(response.data);
  //         });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setLoading(false);
  //     });
  // }
  // HTML code
  return <></>;
}

export default App;
