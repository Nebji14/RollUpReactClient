import { variants } from "../../Constants";

export default function Button({ id, color, text, className = "", ...props }) {
  return (
    <button
      id={id}
      className={`
        inline-flex items-center justify-center 
        px-4 py-2 rounded-full 
        min-w-[140px]   /* largeur minimale */
        ${variants[color]} 
        ${className}
      `}
      {...props}
    >
      <p className="truncate">{text}</p>
    </button>
  );
}
