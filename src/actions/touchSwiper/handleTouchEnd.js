import { SET_REMINDER_TOGGLE } from "../../Reminders/reducer";
import { SET_TOUCH_POSITION } from "../../store";
import { redirectURL } from "../..";
import { store } from "../..";
export const handleTouchEnd = (dispatch, touchStopPosition, e) => {
  // const touchDown = touchPosition;
  if (touchStopPosition === null) {
    dispatch({
      type: SET_REMINDER_TOGGLE,
      reminderToggle: true,
    });
    return;
  }
  if (touchStopPosition <= 60)
    dispatch({
      type: SET_REMINDER_TOGGLE,
      reminderToggle: true,
    });
  dispatch({ type: SET_TOUCH_POSITION, touchPosition: null });
  if (touchStopPosition >= -60)
    dispatch({
      type: SET_REMINDER_TOGGLE,
      reminderToggle: true,
    });
  dispatch({ type: SET_TOUCH_POSITION, touchPosition: null });
  if (touchStopPosition > 60) {
    dispatch({ type: SET_TOUCH_POSITION, touchPosition: null });
    window.location = redirectURL + "thots";
  }
  if (touchStopPosition < -60) {
    dispatch({ type: SET_TOUCH_POSITION, touchPosition: null });
    window.location = redirectURL + "reminders";
  }
};
