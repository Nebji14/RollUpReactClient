export default function Input({
  type = "text",
  placeholder = "",
  label = "",
  className = "",
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-[#e9e4da] font-bold font-montserrat text-sm mb-1 ml-3">
          <p>{label}</p>
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full h-12 bg-[#e9e4da] shadow-[0_5px_5px_rgba(0,0,0,0.5)] px-3 rounded-full font-montserrat text-base text-[#111827] placeholder-[#111827] outline-none ${className}`}
        {...props}
      />
    </div>
  );
}
