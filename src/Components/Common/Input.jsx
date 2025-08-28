export default function Input({
  type = "text",
  placeholder = "",
  className = "",
  ...props
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full h-12 bg-[#e9e4da] shadow-[0_5px_5px_rgba(0,0,0,0.5)] mb-3 px-3 rounded-full font-montserrat text-base text-[#111827] placeholder-[#111827] outline-none ${className}`}
      {...props}
    />
  );
}
