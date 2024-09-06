import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
const Main = () => {
  return (
    <section className=" px-10 flex flex-col items-center justify-center">
      <Navbar />
      <div className="mt-20">
        <Outlet />
      </div>
    </section>
  );
};

export default Main;
