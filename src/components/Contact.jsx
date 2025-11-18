import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
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

    let hasError = false;

    if (!user_name.value.trim()) {
      setUserNameErrorMsg("* Required");
      hasError = true;
    } else {
      setUserNameErrorMsg("");
    }

    if (!user_email.value.trim()) {
      setUserEmailErrorMsg("* Required");
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(user_email.value)) {
      setUserEmailErrorMsg("* Invalid email address");
      hasError = true;
    } else {
      setUserEmailErrorMsg("");
    }

    if (!message.value.trim()) {
      setUserMessageErrorMsg("* Required");
      hasError = true;
    } else {
      setUserMessageErrorMsg("");
    }

    // Only send email if there are no validation errors
    if (hasError) {
      return;
    }

    console.log("Sending email with:", { serviceId, templateId, publicKey });

    emailjs
      .sendForm(
        serviceId,
        templateId,
        form.current,
        publicKey
      )
      .then(
        () => {
          setMessage("Message sent!");
          form.current.reset();
          // Clear success message after 4 seconds
          setTimeout(() => {
            setMessage("");
          }, 4000);
        },
        (error) => {
          console.error("EmailJS Error Details:", error);
          console.error("Error text:", error.text);
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
      {/* Floating abstract shapes */}
      <div className="contact-floating-shapes">
        <div className="contact-shape contact-shape-1"></div>
        <div className="contact-shape contact-shape-2"></div>
        <div className="contact-shape contact-shape-3"></div>
        <div className="contact-shape contact-shape-4"></div>
        <div className="contact-shape contact-shape-5"></div>
      </div>

      <div className="contact-wrapper ">

        <div className="contact-container ">

        <div className="contact-header-wrapper ">

          <div className="contact-header-left ">
            <h3 className="contact-heading  section-heading select-none">
              Contact
            </h3>
            <h4 className="contact-subheading section-subheading select-none">
              I&apos;ll get back to you soon...
            </h4>
          </div>

          <div className="contact-info-wrapper">

            <div className="contact-info-item">
              <IconEmailAlt />
              <div className="contact-info-text-wrapper">
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
