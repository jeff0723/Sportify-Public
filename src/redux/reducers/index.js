import { combineReducers } from 'redux';
import localeReducer from './localeReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
    locale: localeReducer,
    auth: authReducer
});

export default rootReducer;