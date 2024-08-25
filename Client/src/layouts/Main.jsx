import React from "react";
import { Outlet } from "react-router-dom";
const Main = () => {
  return (
    <section>
      <p className="text-xl text-fuchsia-600">Easy-Sell.io</p>
      <Outlet />
    </section>
  );
};

export default Main;
