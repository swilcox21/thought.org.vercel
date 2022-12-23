import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import reminderReducer from "./Reminders/reducer";
import thotReducer from "./thots/thotReducer";
import appReducer from "./store";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import { createBrowserHistory } from "history";
import usePersistedReducer from "./usePersistantReducer";

export const development = false;

export const redirectURL = development
  ? "http://localhost:3001/"
  : "https://thought-org.vercel.app/";

export const baseURL = "https://thorgapi.herokuapp.com";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  reminderReducer,
  appReducer,
  thotReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
// vercel
