import { variants } from "../../Constants";

export default function Button({
  id,
  color,
  text,
  icon,
  className = "",
  ...props
}) {
  return (
    <button
      id={id}
      className={`
    inline-flex items-center justify-center gap-2
    px-4 py-2 rounded-full 
    min-h-[48px]  
    min-w-[160px]  
    text-center
    ${variants[color]} 
    ${className}
  `}
      {...props}
    >
      <p className="break-words text-sm leading-snug text-center">{text}</p>
      {icon && <span className="flex items-center">{icon}</span>}
    </button>
  );
}
