import { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const HandleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
      alert("Please fill in all fields");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }
    const url = "http://localhost:8000";
    try {
      fetch(url + "/contactDb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
        }),
      }).then((res) => {
        if (res.ok) {
          alert("Your details are successfully saved in the admin's Database");
          setName("");
          setEmail("");
          setMessage("");
        }
      });
    } catch (err) {
      console.log("error in sending data" + err);
    }
  };

  return (
    <div className="contact-container" id="contact">
      <h1 className="contact-title">Contact Me</h1>
      <div className="contact-box">
        <div className="contact-left">
          <p>
            <i className="fa-solid fa-phone"></i>+91 8248984590
          </p>
          <p>
            <i className="fa-solid fa-envelope"></i>deepikaperumal0405@gmail.com
          </p>
          <p className="icons">
            <a href="https://www.linkedin.com/in/deepika-perumal-8b52ab293/">
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a href="https://github.com/Deepika0422">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="https://www.instagram.com/prince_of_pearls_45/">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#home">
              <i className="fa-solid fa-house"></i>
            </a>
          </p>

          <a href="DEEPIKA_RESUME.pdf" className="cv-btn" download>
            Download CV
          </a>
        </div>
        <div className="contact-right">
          <form>
            <input
              type="text"
              placeholder="Your Name"
              id="name"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="email"
              placeholder="Your Email"
              id="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <textarea
              name="message"
              id="message"
              placeholder="Enter Message"
              required
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            ></textarea>
            <button className="submit" onClick={HandleSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
