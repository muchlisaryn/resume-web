import { useRef, useState } from "react";
import { Button } from "../../../../Component/Atoms";
import emailjs from "@emailjs/browser";
import "./style.css";

export default function Contact({ ref }) {
  const [email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [message, setMessage] = useState("");
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_vthscjn",
        "template_eqvwj4p",
        form.current,
        "lDTRe59WjIC2Z8fRd"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
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
                  className="w-full rounded px-2"
                />
              </div>
              <div className="mb-2">
                <div className="text-white mb-1">Email</div>
                <input
                  type="email"
                  name="user_email"
                  className="w-full rounded px-2"
                />
              </div>
              <div className="mb-2">
                <div className="text-white mb-1 ">Message</div>
                <textarea name="message" className="w-full h-36 rounded px-2" />
              </div>
              <Button
                text="Send"
                className="btn-send w-full text-white rounded mt-1"
                onClick={sendEmail}
              />
            </form>
          </form>
        </div>
      </div>
    </div>
  );
}
