import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }
    try {
      const res = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.log("error while Log in" + err);
      alert("User doesn't exists!. Please Enter Valid User credentials");
    }
  };

  return (
    <div className="body">
      <div className="form">
        <h2>Login Here</h2>
        <input
          type="text"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="input-box"
          required
        />
        <input
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => {
            setpassword(e.target.value);
          }}
          className="input-box"
          required
        />
        <button onClick={HandleSubmit} className="login">
          Login
        </button>
        <p className="login-msg">
          Don't have any Account?{" "}
          <button
            className="sign-in"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
