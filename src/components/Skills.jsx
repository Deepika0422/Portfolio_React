import "./Skills.css";
import { useContext } from "react";
import { AppContext } from "../App";

const Skills = () => {
  const user = useContext(AppContext);
  return (
    <div className="skill-container" id="skills">
      <h1 className="skill-title">Skills</h1>
      <div>
        {user.map((userData, index) => (
          <div key={index} className="skill-box">
            {userData.skills.map((skillData, index) => (
              <div className="skill-section" key={index}>
                <h2>{skillData.skillTitle}</h2>
                <ul>
                  {skillData.skill.map((s, index) => (
                    <li key={index}>{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
