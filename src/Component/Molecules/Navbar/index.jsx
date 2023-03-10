import { Button } from "../../Atoms";

export default function Navbar({ contact }) {
  const clickContactMe = () => {
    const elemen = document.getElementById(contact);
    if (elemen) {
      // 👇 Will scroll smoothly to the top of the next section
      elemen.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed w-full">
      <div className="flex justify-between text-white p-5">
        <div>Muchlis</div>
        <div className="hidden md:flex justify-between w-1/3">
          <div className="border-b-2">Home</div>
          <div>Portfolio</div>
          <div>About me</div>
        </div>
        <div>
          <Button
            text={"Contact me"}
            className="bg-orange-600 rounded-full p-1 px-5 text-xs md:text-lg"
            onClick={clickContactMe}
          />
        </div>
      </div>
    </nav>
  );
}
