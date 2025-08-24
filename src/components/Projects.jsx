import { useContext } from "react";
import { AppContext } from "../App";
import "./Projects.css";

const Projects = () => {
  const user = useContext(AppContext);

  return (
    <div className="project-container" id="projects">
      <h1 className="project-title">My Projects</h1>
      <div className="project-list">
        {user.map((userData, index) => (
          <div key={index} className="project-box">
            {userData.projects.map((project, index) => (
              <div key={index} className="project-item">
                <h2 key={index}>{project.projectTitle}</h2>
                <p>{project.projectDesc}</p>

                <div className="project-tools">
                  {project.projectTools.map((tool, index) => (
                    <span key={index}>{tool}</span>
                  ))}
                </div>
                <a href={project.projectLink}>Project Link</a>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
