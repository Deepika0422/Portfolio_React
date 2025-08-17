import "./Skills.css";

const Frontend = ["HTML", "CSS", "JavaScript", "React"];
const Backend = ["MongoDB", "MySQL", "Servlets", "PHP"];
const Tools = ["Git", "Docker", "Postman", "VS Code"];

const Skills = () => {
  return (
    <div className="skill-container" id="skills">
      <h1 className="skill-title">Skills</h1>
      <div className="skill-box">
        <div className="skill-section">
          <h2>Frontend</h2>
          <ul>
            {Frontend.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
        <div className="skill-section">
          <h2>Backend</h2>
          <ul>
            {Backend.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
        <div className="skill-section">
          <h2>Tools</h2>
          <ul>
            {Tools.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Skills;
