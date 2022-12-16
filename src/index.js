import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import reminderReducer from "./reminders/reminderReducer";
import thotReducer from "./thots/thotReducer";
import rootReducer from "./store";
export const development = true;
export const dev = "http://localhost:3001/";
export const prod = "https://thought-org.vercel.app/";
export const baseURL = "https://thorgapi.herokuapp.com";

export const store = configureStore({
  reducer: combineReducers({ reminderReducer, rootReducer, thotReducer }),
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
