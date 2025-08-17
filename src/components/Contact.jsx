import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-container" id="contact">
      <h1 className="contact-title">Contact Me</h1>
      <div className="contact-box">
        <div className="contact-left">
          <p>
            <i class="fa-solid fa-phone"></i>+91 8248984590
          </p>
          <p>
            <i class="fa-solid fa-envelope"></i>deepikaperumal0405@gmail.com
          </p>
          <p className="icons">
            <a href="https://www.linkedin.com/in/deepika-perumal-8b52ab293/">
              <i class="fa-brands fa-linkedin"></i>
            </a>
            <a href="https://github.com/Deepika0422">
              <i class="fa-brands fa-github"></i>
            </a>
            <a href="https://www.instagram.com/prince_of_pearls_45/">
              <i class="fa-brands fa-instagram"></i>
            </a>
            <a href="#home">
              <i class="fa-solid fa-house"></i>
            </a>
          </p>

          <a href="DEEPIKA_RESUME.pdf" className="cv-btn" download>
            Download CV
          </a>
        </div>
        <div className="contact-right">
          <form>
            <input type="text" placeholder="Your Name" id="name" required />
            <input type="text" placeholder="Your Email" id="email" required />
            <textarea
              name="message"
              id="message"
              placeholder="Enter Message"
              required
            ></textarea>
            <button className="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
