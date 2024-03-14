import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Home";
import TodoApp from "../Projects/TodoApp";
import OtpBox from "../Projects/OtpBox";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/todo_app" element={<TodoApp />} />
      <Route path="/otp_box" element={<OtpBox />} />
    </Routes>
  );
};

export default Routing;
