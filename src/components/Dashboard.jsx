import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/dashboard", {
        headers: { authorization: token },
      })
      .then((res) => {
        setMessage(res.data.message);
        setRole(res.data.role);
        localStorage.setItem("role", res.data.role); // store role
      })
      .catch(() => {
        navigate("/");
      });
  }, [navigate]);

  return (
    <div className="body">
      <div className="dashboard">
        <h1 className="dash-title">Portfolio Dashboard</h1>
        <p className="msg">{message} !!!</p>
        <p className="btns">
          <span
            className="enter"
            onClick={() => {
              navigate("/portfolio");
            }}
          >
            Enter Portfolio
          </span>
          <span
            className="logout"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Logout
          </span>
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
