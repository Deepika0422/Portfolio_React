import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/dashboard", {
        headers: { authorization: token },
      })
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch(() => {
        navigate("/");
      });
  }, [navigate]);

  return (
    <div>
      <h1>Portfolio Dashboard</h1>
      <p>{message}</p>
      <button
        onClick={() => {
          navigate("/portfolio");
        }}
      >
        Enter Portfolio
      </button>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
