import "./About.css";
import { useContext } from "react";
import { AppContext } from "../App";

const About = () => {
  const user = useContext(AppContext);
  return (
    <div className="about-container" id="about">
      <div className="about-left"></div>
      <div className="about-right">
        <h1>About Me</h1>
        {user.map((userData, index) => (
          <p key={index}>{userData.about}</p>
        ))}
      </div>
    </div>
  );
};

export default About;
