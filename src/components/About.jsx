import "./About.css";
import { useContext, useState } from "react";
import { AppContext } from "../App";

const About = () => {
  const { user, role, refetchUsers } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [aboutText, setAboutText] = useState("");

  const handleEdit = () => {
    const currentAbout = user[0]?.about || "";
    setAboutText(currentAbout);
    setIsEditing(true);
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:8000/userDb", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({ about: aboutText }),
      });
      if (response.ok) {
        setIsEditing(false);
        refetchUsers();
      } else {
        alert("Failed to update about");
      }
    } catch (error) {
      console.error("Error updating about:", error);
      alert("Error updating about");
    }
  };

  return (
    <div className="about-container" id="about">
      <div className="about-left"></div>
      <div className="about-right">
        <h1>About Me</h1>
        {isEditing ? (
          <div>
            <textarea
              value={aboutText}
              onChange={(e) => setAboutText(e.target.value)}
              rows="5"
              cols="50"
            />
            <br />
            <button onClick={handleSave} className="save">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="cancel">
              Cancel
            </button>
          </div>
        ) : (
          user.map((userData, index) => {
            const about = userData.about || "About content not available";
            return <p key={index}>{about}</p>;
          })
        )}
        {role === "admin" && !isEditing && (
          <button onClick={handleEdit} className="edit">
            Edit About
          </button>
        )}
      </div>
    </div>
  );
};

export default About;
