// no global reducers yet since the only compoment that works is reminders
const initialState = [];

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case SHOW_NAV: {
      return {
        ...state,
        showNav: !action.showNav,
      };
    }
    case SET_NAV: {
      return {
        ...state,
        nav: action.nav,
      };
    }
    case SET_TOUCH_POSITION: {
      return {
        ...state,
        touchPosition: action.touchPosition,
      };
    }
    case SET_TOUCH_STOP_POSITION: {
      return {
        ...state,
        touchStopPosition: action.touchStopPosition,
      };
    }

    default:
      return state;
  }
}

export const LOADING = "loading/setLoading";
export const SHOW_NAV = "showNav/setShowNav";
export const SET_NAV = "nav/setNav";
export const SET_TOUCH_POSITION = "touchPosition/setTouchPosition";
export const SET_TOUCH_STOP_POSITION = "touchStopPosition/setTouchStopPosition";

// vercel
