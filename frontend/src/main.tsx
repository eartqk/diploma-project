import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "./store";
import App from "./App";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import User from "./pages/User";
import Me from "./pages/Me";
import People from "./pages/People";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="me" element={<Me />} />
          <Route path="people" element={<People />}>
            <Route path=":userId" element={<User />} />
          </Route>
        </Route>
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
