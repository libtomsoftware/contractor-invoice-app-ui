import "babel-polyfill";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router";
import history from "./providers/history.js";
import routes from "./routes";
import DataLoader from "./services/data-loader";
import configureStore from "./store/configure-store";

const store = configureStore();

DataLoader.store = store;

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById("root")
);
