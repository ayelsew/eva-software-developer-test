import React from "react";
import { FC } from "react";

interface DropdownProps {
  label: string
  size?: string
}

const TextArea: FC<DropdownProps> = ({ label, size }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="employee-name" className="mb-2 px-2">{label}</label>
      <textarea id="employee-name" className={`py-1 px-6 rounded-lg bg-gray-300 ${size}`}>
      </textarea>
    </div>
  )
}

export default TextArea
