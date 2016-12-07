//
// This is the client side entry point for the React app.
//

import React from "react";
import { render } from "react-dom";
import { routes } from "./routes";
import { Router } from "react-router";
import { createStore, compose } from "redux";
import { Provider } from "react-redux";
import injectTapEventPlugin from "react-tap-event-plugin";
import "./styles/base.css";
import rootReducer from "./reducers";
import { reduxReactFirebase } from "redux-react-firebase";

//
// Add the client app start up code to a function as window.webappStart.
// The webapp's full HTML will check and call it once the js-content
// DOM is created.
//

const firebaseConfig = {
  apiKey: 'AIzaSyDB9yBw-7Q2Y3B_v3xRmfUyvtp-lTjObTY',
  authDomain: 'dashbutton-3b778.firebaseapp.com',
  databaseURL: 'https://dashbutton-3b778.firebaseio.com',
  storageBucket: 'dashbutton-3b778.appspot.com'
};

const createStoreWithFirebase = compose(
  reduxReactFirebase(firebaseConfig)
)(createStore);

window.webappStart = () => {
  injectTapEventPlugin();
  // const initialState = window.__PRELOADED_STATE__;
  const store = createStoreWithFirebase(rootReducer);
  render(
    <Provider store={store}>
      <Router>{routes}</Router>
    </Provider>,
    document.querySelector(".js-content")
  );
};

