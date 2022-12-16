const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    // text
    case SET_TEXT: {
      return { ...state, text: action.text };
    }
    case TEXT_RESET: {
      return { ...state, text: "" };
    }
    // editText
    case SET_EDIT_TEXT: {
      return { ...state, editText: action.editText };
    }
    case EDIT_TEXT_RESET: {
      return { ...state, editText: "" };
    }
    // checked
    case SET_CHECKED: {
      return { ...state, checked: !action.checked };
    }
    case CHECKED_RESET: {
      return { ...state, checked: false };
    }
    // showFull
    case SET_SHOW_FULL: {
      return { ...state, showFull: !action.showFull };
    }
    // thotToggle
    case SET_THOT_TOGGLE: {
      return { ...state, thotToggle: !action.thotToggle };
    }

    // reminders
    case REMINDER_GET: {
      return {
        ...state,
        loading: false,
        reminders: action.reminders,
      };
    }
    case REMINDER_POST: {
      return {
        ...state,
        reminders: [
          ...state.reminders,
          {
            id: action.id,
            owner: action.owner,
            created_date: action.date,
            due_date: action.date,
            recurring: action.recurring,
            text: action.text,
          },
        ],
        loading: false,
        text: "",
        checked: false,
      };
    }
    case REMINDER_PUT: {
      return {
        ...state,
        reminders: [
          ...state.reminders.filter((reminder) => reminder.id !== action.id),
          {
            id: action.id,
            owner: action.owner,
            created_date: action.date,
            due_date: action.date,
            recurring: action.recurring,
            text: action.text,
          },
        ],
        loading: false,
        text: "",
      };
    }
    case REMINDER_DELETE: {
      return {
        ...state,
        reminders: [
          ...state.reminders.filter((reminder) => reminder.id !== action.id),
        ],
        loading: false,
      };
    }
    default:
      return state;
  }
}

export const LOADING = "reminder/loadStart";
export const SET_TEXT = "text/setText";
export const TEXT_RESET = "text/textreset";
export const SET_EDIT_TEXT = "text/editText";
export const EDIT_TEXT_RESET = "text/editTextReset";
export const SET_CHECKED = "checked/setChecked";
export const CHECKED_RESET = "checked/checkedReset";
export const SET_SHOW_FULL = "showFull/setShowFull";
export const SET_THOT_TOGGLE = "thotToggle/setThotToggle";
export const REMINDER_GET = "reminder/reminderGet";
export const REMINDER_POST = "reminder/reminderPost";
export const REMINDER_PUT = "reminder/reminderPut";
export const REMINDER_DELETE = "reminder/reminderDelete";
