import { LogoRocket } from "../../../Asset/img";
import "./style.scss";

export default function Logo() {
  return (
    <div className="logo">
      <img src={LogoRocket} />
      <div className="title">My Portofolio</div>
    </div>
  );
}
