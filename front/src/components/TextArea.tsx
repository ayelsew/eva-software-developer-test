import React from "react";
import { FC } from "react";

interface DropdownProps {
  label: string
  size?: string
  onChange: (value: string) => void
}

const TextArea: FC<DropdownProps> = ({ label, size, onChange }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="employee-name" className="mb-2 px-2">{label}</label>
      <textarea id="employee-name" className={`py-1 px-6 rounded-lg bg-gray-300 ${size}`} onChange={({ target: { value } }) => onChange(value)}>
      </textarea>
    </div>
  )
}

export default TextArea
