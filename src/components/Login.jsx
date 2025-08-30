import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const HandleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.log("error while Log in" + err);
      alert("Please Enter Valid User credentials");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        required
      />
      <input
        type="password"
        placeholder="Enter your Password"
        value={password}
        onChange={(e) => {
          setpassword(e.target.value);
        }}
        required
      />
      <button onClick={HandleSubmit}>Login</button>
      <p>
        Don't have any Account?
        <span
          onClick={() => {
            navigate("/signup");
          }}
        >
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default Login;
