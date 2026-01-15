"use client";

import { useState } from "react";

function CustomCheckbox({
  onChange,
  value,
  checked,
}: {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  checked?: boolean;
}) {
  const [isChecked, setIsChecked] = useState(checked || false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    onChange?.(event);
  };

  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only"
        onChange={handleChange}
        value={value}
        checked={isChecked}
      />
      <span
        className={`w-4 h-4 border border-black rounded-[4px] inline-flex items-center justify-center transition-all ${
          isChecked ? "bg-brand-800" : "bg-white"
        }`}
      >
        <svg
          className={`w-[20px] h-[20px] text-white ${
            isChecked ? "block" : "hidden"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </label>
  );
}

export default CustomCheckbox;
