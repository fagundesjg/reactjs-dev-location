import dotenv from "dotenv";
import React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import "./configs/ReactotronConfig";
import store from "./store";
import Routes from "./routes";

import "./styles.scss";
import "font-awesome/css/font-awesome.min.css";

import "react-toastify/dist/ReactToastify.css";

dotenv.config();

const App = () => (
  <Provider store={store}>
    <Routes />
    <ToastContainer autoClose={5000} />
  </Provider>
);

export default App;
