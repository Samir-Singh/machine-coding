import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "1%",
        paddingTop: "2%",
      }}
    >
      <button onClick={() => navigate("/todo_app")}>Todo App</button>
      <button onClick={() => navigate("/otp_box")}>OTP Box</button>
    </div>
  );
};

export default Home;
