import { combineReducers } from "redux";
import remindersReducer from "./Reminders/reducer";

const rootReducer = combineReducers({
  reminders: remindersReducer,
});

export default rootReducer;
