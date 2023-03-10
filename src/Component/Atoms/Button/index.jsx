export default function Button({ onClick, text, className, disabled }) {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}
