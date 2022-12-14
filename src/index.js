import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Login from "./Login";
import Reminders from "./Reminders/remindersList";
// import { Provider } from "react-redux";
// import store from "./store";
// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import rootReducer from "./reducer";
// export const store = configureStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reminders" element={<Reminders />} />
      </Routes>
    </BrowserRouter>
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById("root")
);
