import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Footer from "./Footer";
import "./Contact.css";

const Contact = () => {
  const form = useRef();

  // emailjs errormsg
  const [message, setMessage] = useState("");
  const [userNameErrorMsg, setUserNameErrorMsg] = useState("");
  const [userEmailErrorMsg, setUserEmailErrorMsg] = useState("");
  const [userMessageErrorMsg, setUserMessageErrorMsg] = useState("");

  // emailjs
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICEID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATEID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLICKEY;

  const sendEmail = (e) => {
    e.preventDefault();
    const { user_name, user_email, message } = e.target.elements;

    let hasErrors = false;

    if (!user_name.value.trim()) {
      setUserNameErrorMsg("* Required");
      hasErrors = true;
    } else {
      setUserNameErrorMsg("");
    }

    if (!user_email.value.trim()) {
      setUserEmailErrorMsg("* Required");
      hasErrors = true;
    } else if (!/\S+@\S+\.\S+/.test(user_email.value)) {
      setUserEmailErrorMsg("* Invalid email address");
      hasErrors = true;
    } else {
      setUserEmailErrorMsg("");
    }

    if (!message.value.trim()) {
      setUserMessageErrorMsg("* Required");
      hasErrors = true;
    } else {
      setUserMessageErrorMsg("");
    }

    if (hasErrors) {
      return;
    }

    emailjs
      .sendForm(serviceId, templateId, form.current, publicKey)
      .then(
        () => {
          setMessage("Message sent!");
          form.current.reset();
          setTimeout(() => setMessage(""), 5000);
        },
        () => {
          setMessage("Failed to send. Please try again.");
          setTimeout(() => setMessage(""), 5000);
        }
      );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "user_name") {
      setUserNameErrorMsg(value.trim() ? "" : "* Required");
    } else if (name === "user_email") {
      setUserEmailErrorMsg(value.trim() ? "" : "* Required");
    } else if (name === "message") {
      setUserMessageErrorMsg(value.trim() ? "" : "* Required");
    }
  };

  return (
    <section id="contact" className="contact-section">
      {/* Floating abstract shapes */}
      <div className="contact-floating-shapes">
        <div className="contact-shape contact-shape-1"></div>
        <div className="contact-shape contact-shape-2"></div>
        <div className="contact-shape contact-shape-3"></div>
      </div>

      <div className="contact-wrapper">
        <div className="contact-container">
          <div className="contact-grid">
            {/* Left Column - Info */}
            <div className="contact-info-column">
              <h3 className="contact-heading select-none">
                Let's work together
              </h3>
              <p className="contact-subtext select-none">
                Have a project in mind? Send me a message and I'll get back to you soon.
              </p>
              <div className="contact-email-wrapper">
                <span className="contact-email-label">Email</span>
                <a href="mailto:marv@marv-dev.com" className="contact-email">
                  marv@marv-dev.com
                </a>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="contact-form-column">
              <form ref={form} onSubmit={sendEmail} className="contact-form">
                <div className="contact-form-row">
                  <div className="contact-input-group">
                    <input
                      onChange={handleInputChange}
                      type="text"
                      name="user_name"
                      placeholder="Name"
                      className="contact-input"
                    />
                    {userNameErrorMsg && <span className="contact-error">{userNameErrorMsg}</span>}
                  </div>
                  <div className="contact-input-group">
                    <input
                      onChange={handleInputChange}
                      type="email"
                      name="user_email"
                      placeholder="Email"
                      className="contact-input"
                    />
                    {userEmailErrorMsg && <span className="contact-error">{userEmailErrorMsg}</span>}
                  </div>
                </div>

                <div className="contact-input-group">
                  <textarea
                    onChange={handleInputChange}
                    name="message"
                    className="contact-textarea"
                    placeholder="Your message..."
                    rows="5"
                  />
                  {userMessageErrorMsg && <span className="contact-error">{userMessageErrorMsg}</span>}
                </div>

                <div className="contact-submit-wrapper">
                  <button type="submit" className="contact-submit-btn">
                    Send Message
                  </button>
                  {message && <p className="contact-success-message">{message}</p>}
                </div>
              </form>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </section>
  );
};

export default Contact;
