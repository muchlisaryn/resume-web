import { useRef, useState } from "react";
import { Button } from "../../../../Component/Atoms";
import emailjs from "@emailjs/browser";
import "./style.css";
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
    <div className="bg-orange-600 p-8" id={ref}>
      <div className="grid justify-center items-center h-full w-full">
        <div className="bg-contact p-3 rounded">
          <div className="text-center text-white">Write me a message </div>
          <form className="mt-3 w-80 md:w-96">
            <form ref={form} onSubmit={sendEmail}>
              <div className="mb-2">
                <div className="text-white mb-1">Name</div>
                <input
                  type="text"
                  name="user_name"
                  className="w-full rounded px-2 p-1"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div className="mb-2">
                <div className="text-white mb-1">Email</div>
                <input
                  type="email"
                  name="user_email"
                  className="w-full rounded px-2 p-1"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="mb-2">
                <div className="text-white mb-1 ">Message</div>
                <textarea
                  name="message"
                  className="w-full h-36 rounded px-2"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                />
              </div>
              <Button
                text="Send"
                className="btn-send w-full text-white rounded mt-1 p-1"
                onClick={sendEmail}
              />
            </form>
          </form>
        </div>
      </div>
    </div>
  );
}
