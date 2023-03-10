import "./style.css";

export default function Footer() {
  const date = new Date();
  let getYear = date.getFullYear();

  return (
    <footer>
      <div className="text-center text-white text-xs p-2">
        Copyright Muchlis {getYear}
      </div>
    </footer>
  );
}
