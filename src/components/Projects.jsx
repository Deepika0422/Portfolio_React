import "./Projects.css";

const Project = [
  {
    title: "Portfolio Website",
    description:
      "A personal portfolio website built with React and Vite to showcase my skills, projects, and contact information. The site features a modern design, smooth navigation, and responsive layouts for both desktop and mobile devices.",
    link: "https://github.com/Deepika0422/Personal-Portfolio.git",
    tools: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: " Weather App",
    description:
      "A weather dashboard that fetches real-time weather data from a public API and displays it in a clean, user-friendly interface. This project highlights my skills in API integration, asynchronous JavaScript, and responsive design.  ",
    link: "https://github.com/Deepika0422/WeatherApp.git",
    tools: ["HTML", "CSS", "React", "JavaScript", "API Integration"],
  },
  {
    title: "Todo list App",
    description:
      " A simple and intuitive task management application that allows users to add, edit, and delete tasks. Built using React, this app demonstrates my ability to manage state, handle user input, and create interactive UIs.",
    link: "https://github.com/Deepika0422/Todo.git",
    tools: ["HTML", "CSS", "React", "JavaScript"],
  },
];

const Projects = () => {
  return (
    <div className="project-container" id="projects">
      <h1 className="project-title">My Projects</h1>
      <div className="project-list">
        {Project.map((project, index) => (
          <div className="project-item">
            <h2 key={index}>{project.title}</h2>
            <p>{project.description}</p>

            <div className="project-tools">
              {project.tools.map((tool, index) => (
                <span key={index}>{tool}</span>
              ))}
            </div>
            <a href={project.link}>Project Link</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
