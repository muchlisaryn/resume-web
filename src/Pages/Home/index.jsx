import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Button } from "../../Component/Atoms";
import { Navbar } from "../../Component/Molecules";
import Contact from "./Parts/Contact";
import Footer from "./Parts/Footer";
import "./style.css";

export default function Home() {
  const [input, setInput] = useState("");
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(200 - Math.random() * 100);
  const [disabled, setDisabled] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const period = 500;
  const toRotate = ["Muchlis Aryana S.Kom", "Frontend Developer"];
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

  const viewResume = () => {
    if (resumePW === input) {
      alert("Success");
    } else {
      alert("failed");
    }
  };

  const clickEmail = () => {
    Swal.fire({
      title: "Submit Your Email",
      input: "email",
      inputAttributes: {
        autocapitalize: "on",
      },
      showCancelButton: true,
      confirmButtonText: "Send",
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        return console.log(login);
        // return fetch(`//api.github.com/users/${login}`)
        //   .then((response) => {
        //     if (!response.ok) {
        //       throw new Error(response.statusText);
        //     }
        //     return response.json();
        //   })
        //   .catch((error) => {
        //     Swal.showValidationMessage(`Request failed: ${error}`);
        //   });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `${result.value.login}'s avatar`,
          imageUrl: result.value.avatar_url,
        });
      }
    });
  };
  return (
    <>
      <div className="App h-screen">
        <Navbar />
        <div className="grid items-center h-screen">
          <div className="flex justify-center">
            <div className="self-center text-white">
              <div className="flex justify-center mb-4">Hello Everyone! 👋</div>
              <h1 className="text-2xl max-w-xs md:max-w-screen-md md:text-4xl text-center ">
                Hi! I'm <span className="flex-wrap font-bold">{text}</span>
              </h1>
              <div>
                <div className="text-center py-2 text-sm md:text-xl opacity-75">
                  Please enter password to view my resume
                </div>
                <div className="relative  ">
                  <input
                    className="text-black p-2 pl-4  rounded-full focus:outline-none opacity-50 w-full  "
                    type="password"
                    placeholder="input password"
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <Button
                    text={disabled ? `Submit` : `Let's go`}
                    onClick={viewResume}
                    disabled={disabled}
                    className={
                      disabled
                        ? `bg-orange-700 absolute right-0 p-2 rounded-full px-4 cursor-not-allowed`
                        : `bg-orange-600 absolute right-0 p-2 rounded-full px-4`
                    }
                  />
                </div>
                <div className="text-center text-xs pt-3">
                  <span className="opacity-50">You want password? </span>
                  <span
                    onClick={clickEmail}
                    className="cursor-pointer hover:underline"
                  >
                    Request password
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Contact />
      <Footer />
    </>
  );
}