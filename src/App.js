/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./App.css";
import { Navigate } from "react-router-dom";
import userEvent from "@testing-library/user-event";
// import axios from "axios";
// import Folder from "./components/folder";
// import Thought from "./components/thought";
// import NewThought from "./components/newThought";
// import Navbar from "./components/navbar2";
// import Dashboard from "./components/dashboard";
// import GoogleLogin from "react-google-login";
// import { gapi } from "gapi-script";

// const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
// const drfClientId = process.env.REACT_APP_DRF_CLIENT_ID;
// const drfClientSecret = process.env.REACT_APP_DRF_CLIENT_SECRET;
// const clientId =
// "1007332775808-q4j6sklcv5oi9stfl9j35etdvorooj9m.apps.googleusercontent.com";
const baseURL = "https://thotapi.herokuapp.com";

function App() {
  const [reminders, setReminders] = useState(false);
  const [login, setLogin] = useState(false);
  // onLoad Get Requests
  useEffect(() => {
    localStorage.getItem("refresh") ? setReminders(true) : setReminders(true);
  }, []);

  return (
    <>
      {reminders ? (
        <Navigate to="/reminders" replace={true} />
      ) : (
        <Navigate to="/login" replace={true} />
      )}
    </>
  );
}

export default App;
