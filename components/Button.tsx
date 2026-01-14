function Button({
  variant = "primary",
  size = "fit",
  children,
  className,
  onClick,
}: {
  variant: "primary" | "secondary" | "transparent";
  size: "full" | "fit";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const buttonClasses = {
    primary: "bg-brand-800 rounded-[8px] text-[16px] text-brand-100",
    secondary: "bg-white rounded-[8px] p-[12px] border border-gray-300",
    transparent: "bg-transparent rounded-[8px] text-gray-900",
    full: "w-full",
    fit: "w-fit",
  };
  return (
    <button
      className={`cursor-pointer ${buttonClasses[variant]} ${buttonClasses[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
