import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { RootStoreProvider } from "./stores/RootStoreContext";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <RootStoreProvider>
      <App />
    </RootStoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
