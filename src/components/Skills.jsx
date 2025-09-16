import "./Skills.css";
import { useContext, useState } from "react";
import { AppContext } from "../App";

const Skills = () => {
  const { user, role, refetchUsers } = useContext(AppContext);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedSkill, setEditedSkill] = useState({});

  const handleEdit = (index) => {
    const currentSkills = user[0]?.skills || [];
    if (currentSkills.length === 0) {
      setEditedSkill({ skillsTitle: "", skill: [] });
    } else {
      setEditedSkill(currentSkills[index]);
    }
    setEditingIndex(index);
  };

  const handleSkillChange = (field, value) => {
    setEditedSkill((prev) => ({ ...prev, [field]: value }));
  };

  const handleSkillListChange = (value) => {
    setEditedSkill((prev) => ({
      ...prev,
      skill: value.split(",").map((s) => s.trim()),
    }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      const currentSkills = [...(user[0]?.skills || [])];
      if (editingIndex < currentSkills.length) {
        currentSkills[editingIndex] = editedSkill;
      } else {
        currentSkills.push(editedSkill);
      }
      const response = await fetch("http://localhost:8000/userDb", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({ skills: currentSkills }),
      });
      if (response.ok) {
        setEditingIndex(null);
        setEditedSkill({});
        refetchUsers();
      } else {
        alert("Failed to update skill");
      }
    } catch (error) {
      console.error("Error updating skill:", error);
      alert("Error updating skill");
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditedSkill({});
  };

  const handleDelete = async (index) => {
    const token = localStorage.getItem("token");
    try {
      const currentSkills = [...(user[0]?.skills || [])];
      currentSkills.splice(index, 1);
      const response = await fetch("http://localhost:8000/userDb", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({ skills: currentSkills }),
      });
      if (response.ok) {
        refetchUsers();
      } else {
        alert("Failed to delete skill");
      }
    } catch (error) {
      console.error("Error deleting skill:", error);
      alert("Error deleting skill");
    }
  };

  const handleAddSkill = () => {
    const currentSkills = user[0]?.skills || [];
    const newSkill = {
      skillsTitle: "",
      skill: [],
    };
    setEditedSkill(newSkill);
    setEditingIndex(currentSkills.length);
  };

  const userData = user[0] || {};
  const skills = userData.skills || [];

  return (
    <div className="skill-container" id="skills">
      <h1 className="skill-title">Skills</h1>
      <div>
        <div className="skill-box">
          {skills.length > 0 || editingIndex === skills.length ? (
            skills.map((skillData, idx) => (
              <div className="skill-section" key={idx}>
                {editingIndex === idx ? (
                  <>
                    <input
                      type="text"
                      value={editedSkill.skillsTitle || ""}
                      onChange={(e) =>
                        handleSkillChange("skillsTitle", e.target.value)
                      }
                      placeholder="Skill Title"
                    />
                    <input
                      type="text"
                      value={editedSkill.skill?.join(", ") || ""}
                      onChange={(e) => handleSkillListChange(e.target.value)}
                      placeholder="Skills (comma separated)"
                    />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  <>
                    <h2>{skillData.skillsTitle}</h2>
                    <ul>
                      {skillData.skill.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                    {role === "admin" && (
                      <>
                        <button onClick={() => handleEdit(idx)}>Edit</button>
                        <button onClick={() => handleDelete(idx)}>
                          Delete
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            ))
          ) : (
            <p>No skills available</p>
          )}
          {editingIndex === skills.length && (
            <div className="skill-section">
              <input
                type="text"
                value={editedSkill.skillsTitle || ""}
                onChange={(e) =>
                  handleSkillChange("skillsTitle", e.target.value)
                }
                placeholder="Skill Title"
              />
              <input
                type="text"
                value={editedSkill.skill?.join(", ") || ""}
                onChange={(e) => handleSkillListChange(e.target.value)}
                placeholder="Skills (comma separated)"
              />
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          )}
        </div>
      </div>
      {role === "admin" && (
        <button onClick={handleAddSkill}>Add Skill Category</button>
      )}
    </div>
  );
};

export default Skills;
