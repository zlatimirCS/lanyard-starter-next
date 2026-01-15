function CustomCheckbox({
  onChange,
  value,
}: {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}) {
  return (
    <input
      type="checkbox"
      className="w-4 h-4 accent-brand-800 bg-gray-50 border-black rounded-[20px] focus:black"
      onChange={onChange}
      value={value}
    />
  );
}

export default CustomCheckbox;
