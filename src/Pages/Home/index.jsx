import { useState, useEffect } from "react";
import { Button } from "../../Component/Atoms";
import { Navbar } from "../../Component/Molecules";
import Contact from "./Parts/Contact";
import Footer from "./Parts/Footer";
import "./style.scss";
import Portfolio from "./Parts/Portfolio";

export default function Home() {
  const [input, setInput] = useState("");
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(200 - Math.random() * 100);
  const [disabled, setDisabled] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const period = 500;
  const toRotate = ["Muchlis", "Frontend Developer"];
  const resumePW = "pw234";

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);
    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }
    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(200);
    }
  };

  useEffect(() => {
    if (input === "") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [input]);

  const viewResume = (e) => {
    e.preventDefault();
    if (resumePW === input) {
      alert("Success");
    } else {
      alert("Password Salah");
    }
  };

  return (
    <>
      <div className="header">
        <Navbar />
        <div className="container">
          <div className="content">
            <div>
              <div className="say-hello">Wellcome! 👋</div>
              <div className="text-2xl max-w-xs md:max-w-screen-md md:text-4xl text-center">
                Hi! I'm <span className="flex-wrap font-bold">{text}</span>
              </div>
              <div className="title-desc">Enter password to view my resume</div>
              <form onSubmit={viewResume}>
                <input
                  className="text-black "
                  type="password"
                  placeholder="input password"
                  onChange={(e) => setInput(e.target.value)}
                />
                <Button
                  text={disabled ? `Submit` : `Let's go`}
                  onClick={viewResume}
                  disabled={disabled}
                  className={`btn-submit ${
                    disabled ? `btn-disabled` : `btn-active `
                  }`}
                />
              </form>

              <div className="req-password">
                You want password?
                <span> Request password</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Portfolio />
      <Contact />
      <Footer />
    </>
  );
}
