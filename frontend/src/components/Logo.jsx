const Logo = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "h-7 w-7 text-sm rounded-md",
    md: "h-9 w-9 text-lg rounded-lg",
    lg: "h-11 w-11 text-xl rounded-xl",
  };

  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-[#1DB954] to-emerald-700 font-black text-black shadow-lg shadow-emerald-900/40 shrink-0 select-none ${sizeClasses[size] || sizeClasses.md} ${className}`}
    >
      🎶
    </div>
  );
};

export default Logo;
