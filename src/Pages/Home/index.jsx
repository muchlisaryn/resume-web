import { useState, useEffect } from "react";
import { Button } from "../../Component/Atoms";
import { Navbar } from "../../Component/Molecules";
import Contact from "./Parts/Contact";
import Footer from "./Parts/Footer";
import "./style.css";
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
      <div className="App h-screen">
        <Navbar />
        <div className="grid items-center h-screen">
          <div className="flex justify-center">
            <div className=" text-white">
              <div className="text-center mb-4">Wellcome! 👋</div>
              <div className="text-2xl max-w-xs md:max-w-screen-md md:text-4xl text-center">
                Hi! I'm <span className="flex-wrap font-bold">{text}</span>
              </div>
              <div>
                <div className="text-center py-2 text-xs md:text-lg opacity-40 ">
                  Enter password to view my resume
                </div>
                <div className="flex justify-center">
                  <form className="flex" onSubmit={viewResume}>
                    <input
                      className="text-black p-2 pl-4 rounded-full  focus:outline-none  "
                      type="password"
                      placeholder="input password"
                      onChange={(e) => setInput(e.target.value)}
                    />

                    <Button
                      text={disabled ? `Submit` : `Let's go`}
                      onClick={viewResume}
                      disabled={disabled}
                      className={`p-2 rounded-full px-4 ml-1 w-auto ${
                        disabled
                          ? `bg-orange-700 cursor-not-allowed`
                          : `bg-orange-600 `
                      }`}
                    />
                  </form>
                </div>
                <div className="text-center text-xs pt-3">
                  You want password?
                  <span className="cursor-pointer hover:underline text-orange-600 text-bold">
                    Request password
                  </span>
                </div>
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
