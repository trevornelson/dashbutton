import {combineReducers} from "redux";
import { reducer as formReducer } from 'redux-form';
import { firebaseStateReducer } from "redux-react-firebase";

const app = (store = { button_id: null }, action) => {
  switch(action.type) {
    case 'SET_BUTTON':
      return Object.assign({}, store, { button_id: action.button_id });
  }
  return store;
};

const reducers = {
  app,
  firebase: firebaseStateReducer,
  form: formReducer
};

export default combineReducers(reducers);
