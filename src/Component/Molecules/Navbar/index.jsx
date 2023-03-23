import { useState, useEffect } from "react";
import { Button, Logo } from "../../Atoms";
import "./style.scss";

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
    <nav className={`${bgNavbar ? `nav-active` : ``}`}>
      <Logo />

      <Button
        text={"Contact me"}
        className={`btn-contact ${
          bgNavbar ? `btn-scroll-active` : `nav-active`
        }`}
        onClick={clickContactMe}
      />
    </nav>
  );
}
