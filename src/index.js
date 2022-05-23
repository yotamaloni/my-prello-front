import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./store/store";

import "./styles/styles.scss";
import { RootCmp } from "./root-cmp";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <RootCmp />
        </MuiPickersUtilsProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
