import React, { Fragment } from "react";
import "./styles.scss";

import Sidebar from "../../components/Sidebar";
import Map from "../../components/Map";
import AddUser from "../../components/AddUser";

const Main = () => (
  <Fragment>
    <AddUser />
    <Sidebar />
    <Map />
  </Fragment>
);

export default Main;
