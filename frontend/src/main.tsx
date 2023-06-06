import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "./store";
import App from "./App";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import User from "./pages/User";
import Users from "./pages/Users";
import Orgs from "./pages/Orgs";
import Org from "./pages/Org";
import Me from "./pages/Me";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="me" element={<Me />} />
          <Route path="users">
            <Route index element={<Users />} />
            <Route path=":userId" element={<User />} />
          </Route>
          <Route path="orgs">
            <Route index element={<Orgs />} />
            <Route path=":orgId" element={<Org />} />
          </Route>
        </Route>
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
