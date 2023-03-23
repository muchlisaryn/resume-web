import { useRef, useState } from "react";
import { Button } from "../../../../Component/Atoms";
import emailjs from "@emailjs/browser";
import "./style.scss";
import Swal from "sweetalert2";

export default function Contact({ ref }) {
  const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.com+)*$/;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    if (email === "" || message === "" || name === "") {
      alert("form harus diisi di isi");
    } else if (!regexEmail.test(email)) {
      alert("Format email tidak sesuai");
    } else {
      emailjs
        .sendForm(
          "service_vthscjn",
          "template_eqvwj4p",
          form.current,
          process.env.REACT_APP_KEY_PUBLIC
        )
        .then(
          (result) => {
            console.log(result.text);
            Swal.fire({
              icon: "success",
              title: result.text,
            });
            setEmail("");
            setName("");
            setMessage("");
          },
          (error) => {
            console.log("error", error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.text,
            });
          }
        );
    }
  };

  return (
    <div className="contact" id={ref}>
      <div className="container">
        <div className="box-content">
          <div className="title">Write me a message </div>
          <form ref={form} onSubmit={sendEmail}>
            <div className="item-form">
              <div className="title-field">Name</div>
              <input
                type="text"
                name="user_name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="item-form">
              <div className="title-field">Email</div>
              <input
                type="email"
                name="user_email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="item-form">
              <div className="title-field">Message</div>
              <textarea
                name="message"
                className=""
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
            </div>
            <Button text="Send" className="btn-send" onClick={sendEmail} />
          </form>
        </div>
      </div>
    </div>
  );
}
