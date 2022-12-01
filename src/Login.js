/* eslint-disable no-unused-vars */
import "./App.css";
import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { gapi } from "gapi-script";

const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const drfClientId = process.env.REACT_APP_DRF_CLIENT_ID;
const drfClientSecret = process.env.REACT_APP_DRF_CLIENT_SECRET;
const baseURL = "http://0.0.0.0:8000";

const handleGoogleLogin = (response) => {
  axios
    .post(`${baseURL}/auth/convert-token`, {
      token: response.accessToken,
      backend: "google-oauth2",
      grant_type: "convert_token",
      client_id: drfClientId,
      client_secret: drfClientSecret,
    })
    .then((res) => {
      const { access_token, refresh_token } = res.data;
      console.log(res.data);
      console.log({ access_token, refresh_token });
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      window.location = "http://localhost:3000";
      // window.location = "https://thought-org.vercel.app";
    })
    .catch((err) => {
      console.log("Error Google login", err);
    });
};
function Login() {
  return (
    <>
      <div className="loginContainer">
        <div className="loginCard">
          <h2>Welcome to Thought.org!</h2>
          <p>please log in</p>
          <img
            src="https://github.com/swilcox21/Thot.Org/blob/main/src/front/img/looping-down-arrows.gif?raw=true"
            alt=""
          />
          <div className="loginButton">
            <GoogleLogin
              clientId={googleClientId}
              buttonText="LOGIN WITH GOOGLE"
              onSuccess={(response) => handleGoogleLogin(response)}
              onFailure={(err) => console.log("Google Login failed", err)}
              cookiePolicy={"single_host_origin"}
            ></GoogleLogin>
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
