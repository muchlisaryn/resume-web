import { useState, useEffect } from "react";
import { Button, Logo } from "../../Atoms";

export default function Navbar({ contact }) {
  const [bgNavbar, setBgNavbar] = useState(false);

  const clickContactMe = () => {
    const elemen = document.getElementById(contact);
    if (elemen) {
      elemen.scrollIntoView({ behavior: "smooth" });
    }
  };

  const changeBgNavbar = () => {
    if (window.scrollY >= 20) {
      setBgNavbar(true);
    } else {
      setBgNavbar(false);
    }
  };

  useEffect(() => {
    changeBgNavbar();
    window.addEventListener("scroll", changeBgNavbar);
  }, []);

  return (
    <nav className={`fixed w-full  ${bgNavbar ? `bg-orange-600` : ``}`}>
      <div className="flex justify-between text-white p-4 items-center">
        <Logo />
        <div className="hidden md:flex justify-between w-1/3 ">
          <div>Home</div>
          <div>Portfolio</div>
          <div>About me</div>
        </div>
        <div>
          <Button
            text={"Contact me"}
            className={`rounded-full p-1 px-5 text-xs md:text-lg ${
              bgNavbar ? `bg-white text-orange-600` : `bg-orange-600 `
            }`}
            onClick={clickContactMe}
          />
        </div>
      </div>
    </nav>
  );
}
