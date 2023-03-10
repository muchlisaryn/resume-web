import { LogoRocket } from "../../../Asset/img";

export default function Logo() {
  return (
    <div className="flex items-center">
      <img src={LogoRocket} style={{ width: 15 }} />
      <div className="ml-1">Muchlis</div>
    </div>
  );
}
