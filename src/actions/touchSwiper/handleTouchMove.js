import { SET_TOUCH_STOP_POSITION } from "../../store";

export const handleTouchMove = (dispatch, touchPosition, e) => {
  const touchDown = touchPosition;
  const currentTouch = e.touches[0].clientX;
  const diff = touchDown - currentTouch;
  if (diff > 5) {
    dispatch({ type: SET_TOUCH_STOP_POSITION, touchStopPosition: diff });

    return;
  }
  if (diff < -5) {
    dispatch({ type: SET_TOUCH_STOP_POSITION, touchStopPosition: diff });
    return;
  }
};
