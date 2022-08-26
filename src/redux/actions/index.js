// Action Types
export const SET_LOCALE = "locale/SET_LOCALE";
export const LOG_IN = "auth/LOG_IN";
export const LOG_IN_BY_GOOGLE = "auth/LOG_IN_GOOGLE";
export const LOG_OUT = "auth/LOG_OUT";


// Action Creators
export const setLocale = (newLocale) => {
    return { type: SET_LOCALE, newLocale };
};

export const logIn = (payload) => {
    return { type: LOG_IN, payload };
};

export const logInByGoogle = (payload) => {
    return { type: LOG_IN_BY_GOOGLE, payload };
};

export const logOut = () => {
    return { type: LOG_OUT };
};