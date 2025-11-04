import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import IconEmail from "../icons/iconEmail";
import IconLocation from "../icons/IconLocation";
import IconEmailAlt from "../icons/IconEmailAlt";
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

    if (!user_name.value.trim()) {
      setUserNameErrorMsg("* Required");
    } else {
      setUserNameErrorMsg("");
    }

    if (!user_email.value.trim()) {
      setUserEmailErrorMsg("* Required");
    } else if (!/\S+@\S+\.\S+/.test(user_email.value)) {
      setUserEmailErrorMsg("* Invalid email address");
    } else {
      setUserEmailErrorMsg("");
    }

    if (!message.value.trim()) {
      setUserMessageErrorMsg("* Required");
      hasError = true;
    } else {
      setUserMessageErrorMsg("");
    }

    emailjs
      .sendForm(
        serviceId,
        templateId,
        form.current,
        publicKey
      )
      .then(
        (result) => {
          setMessage("Message sent!");
          form.current.reset();
        },
        (error) => {
          setMessage("Failed to send email. Please try again.");
        }
      );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Remove error message when input field is not empty
    if (name === "user_name") {
      setUserNameErrorMsg(value.trim() ? "" : "* Required");
    } else if (name === "user_email") {
      setUserEmailErrorMsg(value.trim() ? "" : "* Required");
    } else if (name === "message") {
      setUserMessageErrorMsg(value.trim() ? "" : "* Required");
    }
  };

  const copyEmailToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Email address copied to clipboard: ", text);
      })
      .catch((error) => {
        console.error("Failed to copy email:", error);
      });
  };

  return (
    <section id="contact" className="contact-section ">
      <div className="contact-wrapper">

        <div className="contact-container">

        <div className="contact-header-wrapper">

          <div className="contact-header-left">
            <h3 className="contact-heading  section-heading ">
              CONTACT
              <img
                src={`${import.meta.env.BASE_URL}assets/point.png`}
                alt="point icon"
                className="contact-icon"
              />
            </h3>
            <h4 className="contact-subheading section-subheading">
              Hit me up, I'll get back to you soon...
            </h4>
          </div>

          <div className="contact-info-wrapper">

            <div className="contact-info-item">
              <IconEmailAlt />
              <div className="contact-info-text-wrapper">
                <span className="contact-info-label">
                  Mail
                </span>
                <span
                  onClick={() =>
                    copyEmailToClipboard("marv@marv-dev.com")
                  }
                  className="contact-email"
                >
                  marv@marv-dev.com
                </span>
              </div>
            </div>

          </div>

        </div>

        <form ref={form} onSubmit={sendEmail}>

          <div className="contact-form-container ">

            <div className="contact-form-inputs-wrapper">
              <div className="contact-input-group">
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="user_name"
                  placeholder="Name"
                  className="contact-input"
                />
                <span className="contact-error ">{userNameErrorMsg}</span>
              </div>
              <div className="contact-input-group">
                <input
                  onChange={handleInputChange}
                  type="email"
                  name="user_email"
                  placeholder="Email"
                  className="contact-input"
                />
                <span className="contact-error">{userEmailErrorMsg}</span>
              </div>
            </div>

            <div className="contact-textarea-wrapper">
              <textarea
                onChange={handleInputChange}
                name="message"
                className="contact-textarea "
                placeholder="Message..."
              />
              <span className="contact-error">{userMessageErrorMsg}</span>
            </div>

          </div>

          <div className="contact-submit-wrapper">
            <button type="submit" value="Send" className="contact-submit-btn btn-primary">
              Send it
            </button>
            {message && <p className="contact-success-message">{message}</p>}
          </div>

        </form>

        </div>

        <Footer />
      </div>
    </section>
  );
};

export default Contact;
