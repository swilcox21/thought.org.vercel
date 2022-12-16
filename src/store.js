// no global reducers yet since the only compoment that works is reminders
const initialState = [];

export default function rootReducer(state = initialState, action) {
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
    default:
      return state;
  }
}

export const LOADING = "loading/setLoading";
export const SHOW_NAV = "showNav/setShowNav";
export const SET_NAV = "nav/setNav";
