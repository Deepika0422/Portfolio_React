import { useContext, useState } from "react";
import { AppContext } from "../App";
import "./Projects.css";

const Projects = () => {
  const { user, role, refetchUsers } = useContext(AppContext);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedProject, setEditedProject] = useState({});

  const handleEdit = (index) => {
    const currentProjects = user[0]?.projects || [];
    if (currentProjects.length === 0) {
      setEditedProject({
        projectTitle: "",
        projectDesc: "",
        projectTools: [],
        projectLink: "",
      });
    } else {
      setEditedProject(currentProjects[index]);
    }
    setEditingIndex(index);
  };

  const handleProjectChange = (field, value) => {
    setEditedProject((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      const currentProjects = [...(user[0]?.projects || [])];
      if (editingIndex < currentProjects.length) {
        currentProjects[editingIndex] = editedProject;
      } else {
        currentProjects.push(editedProject);
      }
      const response = await fetch("http://localhost:8000/userDb", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({ projects: currentProjects }),
      });
      if (response.ok) {
        setEditingIndex(null);
        setEditedProject({});
        refetchUsers();
      } else {
        alert("Failed to update project");
      }
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Error updating project");
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditedProject({});
  };

  const handleDelete = async (index) => {
    const token = localStorage.getItem("token");
    try {
      const currentProjects = [...(user[0]?.projects || [])];
      currentProjects.splice(index, 1);
      const response = await fetch("http://localhost:8000/userDb", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({ projects: currentProjects }),
      });
      if (response.ok) {
        refetchUsers();
      } else {
        alert("Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Error deleting project");
    }
  };

  const handleAddProject = () => {
    const currentProjects = user[0]?.projects || [];
    const newProject = {
      projectTitle: "",
      projectDesc: "",
      projectTools: [],
      projectLink: "",
    };
    setEditedProject(newProject);
    setEditingIndex(currentProjects.length);
  };

  const userData = user[0] || {};
  const projects = userData.projects || [];

  return (
    <div className="project-container" id="projects">
      <h1 className="project-title">My Projects</h1>
      <div className="project-list">
        <div className="project-box">
          {projects.length > 0 || editingIndex === projects.length ? (
            projects.map((project, idx) => (
              <div key={idx} className="project-item">
                {editingIndex === idx ? (
                  <>
                    <input
                      type="text"
                      value={editedProject.projectTitle || ""}
                      onChange={(e) =>
                        handleProjectChange("projectTitle", e.target.value)
                      }
                      placeholder="Project Title"
                    />
                    <textarea
                      value={editedProject.projectDesc || ""}
                      onChange={(e) =>
                        handleProjectChange("projectDesc", e.target.value)
                      }
                      placeholder="Project Description"
                    />
                    <input
                      type="text"
                      value={editedProject.projectLink || ""}
                      onChange={(e) =>
                        handleProjectChange("projectLink", e.target.value)
                      }
                      placeholder="Project Link"
                    />
                    <input
                      type="text"
                      value={editedProject.projectTools?.join(", ") || ""}
                      onChange={(e) =>
                        handleProjectChange(
                          "projectTools",
                          e.target.value.split(",").map((tool) => tool.trim())
                        )
                      }
                      placeholder="Project Tools (comma separated)"
                    />
                    <button onClick={handleSave} className="save">
                      Save
                    </button>
                    <button onClick={handleCancel} className="cancel">
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <h2>{project.projectTitle}</h2>
                    <p>{project.projectDesc}</p>
                    <div className="project-tools">
                      {project.projectTools.map((tool, i) => (
                        <span key={i}>{tool}</span>
                      ))}
                    </div>
                    <a href={project.projectLink}>Project Link</a>
                    {role === "admin" && (
                      <div className="project-btn">
                        <button
                          onClick={() => handleEdit(idx)}
                          className="edit"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(idx)}
                          className="delete"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))
          ) : (
            <p>No projects available</p>
          )}
          {editingIndex === projects.length && (
            <div className="project-item">
              <input
                type="text"
                value={editedProject.projectTitle || ""}
                onChange={(e) =>
                  handleProjectChange("projectTitle", e.target.value)
                }
                placeholder="Project Title"
              />
              <textarea
                value={editedProject.projectDesc || ""}
                onChange={(e) =>
                  handleProjectChange("projectDesc", e.target.value)
                }
                placeholder="Project Description"
              />
              <input
                type="text"
                value={editedProject.projectLink || ""}
                onChange={(e) =>
                  handleProjectChange("projectLink", e.target.value)
                }
                placeholder="Project Link"
              />
              <input
                type="text"
                value={editedProject.projectTools?.join(", ") || ""}
                onChange={(e) =>
                  handleProjectChange(
                    "projectTools",
                    e.target.value.split(",").map((tool) => tool.trim())
                  )
                }
                placeholder="Project Tools (comma separated)"
              />
              <button onClick={handleSave} className="save">
                Save
              </button>
              <button onClick={handleCancel} className="cancel">
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
      {role === "admin" && (
        <button onClick={handleAddProject} className="add-btn">
          Add Project
        </button>
      )}
    </div>
  );
};

export default Projects;
