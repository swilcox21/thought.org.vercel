/* eslint-disable no-unused-vars */
import "./App.css";
import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { baseURL, redirectURL } from "./index";

function Login() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  async function handleLogin() {
    setLoading(true);
    const body = {
      username: username,
      password: password,
    };
    await axios
      .post(`${baseURL}/api/token/`, body, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);
        window.location = redirectURL + "reminders";
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <>
      {loading && (
        <div className="loadBar">
          ==============================================
        </div>
      )}
      <div className="loginContainer">
        <div className="loginCard">
          <h2>Welcome to Thought.org!</h2>
          <p>please log in</p>
          <img
            src="https://github.com/swilcox21/Thot.Org/blob/main/src/front/img/looping-down-arrows.gif?raw=true"
            alt=""
          />
          <div className="logindiv">
            <input
              type="text"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button onClick={() => handleLogin()}>LOGIN</button>
          </div>
          <br />
          <small>If you do not have google go away</small>
        </div>
      </div>
    </>
  );
}

export default Login;
// vercel
Login.propTypes = {};
