import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "App";
import configureAppStore from "store/store";
import "assets/styles/tailwind.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const store = configureAppStore();
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>
);
