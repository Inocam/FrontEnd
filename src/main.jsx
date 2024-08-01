import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/config/configure.js";

import Header from "./components/Header"
import Sidenav from "./components/Sidenav"
import Access from "./components/Access"


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Header/>
      <Sidenav/>
      <Access/>
    </Provider>
  </React.StrictMode>
);
