import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import ReactDOM from "react-dom/client";
import { IntlProvider } from "react-intl";
import App from "./App.tsx";
import OpenID from "./config/OpenID.ts";
import en from "./config/locale/en.json";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <IntlProvider locale="en" messages={en}>
    <GoogleOAuthProvider clientId={OpenID.client_id}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </GoogleOAuthProvider>
  </IntlProvider>
);
