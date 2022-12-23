import { SET_TOUCH_POSITION } from "../../store";

export const handleTouchStart = (dispatch, e) => {
  const touchDown = e.touches[0].clientX;
  dispatch({ type: SET_TOUCH_POSITION, touchPosition: touchDown });
};
