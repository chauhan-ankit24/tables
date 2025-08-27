import React from "react";

interface CustomCheckboxProps {
  checked: boolean;
  onChange: () => void;
  id?: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
  id,
}) => (
  <div
    className={`custom-checkbox${checked ? " checked" : ""}`}
    onClick={onChange}
    id={id}
    role="checkbox"
    aria-checked={checked}
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === " " || e.key === "Enter") onChange();
    }}
  />
);

export default CustomCheckbox;
