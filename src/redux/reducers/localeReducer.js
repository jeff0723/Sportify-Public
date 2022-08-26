import { SET_LOCALE } from '../actions';


const initialState = {
  locale: navigator.language,
};

const localeReducer = (state = initialState, action) => {
  if (action.type === SET_LOCALE) {
    return { ...state, locale: action.newLocale};
  }
  return state;
}


export default localeReducer;