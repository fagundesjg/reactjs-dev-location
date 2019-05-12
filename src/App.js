import React from "react";
import { Provider } from "react-redux";

import "./configs/ReactotronConfig";
import store from "./store";
import Routes from "./routes";

import "./styles.scss";

const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

export default App;
