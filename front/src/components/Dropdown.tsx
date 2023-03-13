import React from "react";
import { FC } from "react";

interface DropdownProps {
  label: string
  children: JSX.Element
  onChange: (value: any) => void
}

const Dropdown: FC<DropdownProps> = ({ label, children, onChange }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="employee-name" className="mb-2 px-2">{label}</label>
      <select id="employee-name" className={`py-1 px-6 rounded-full bg-gray-300`} onChange={({ target: { value } }) => onChange(value)}>
        <>
          {children}
        </>
      </select>
    </div>
  )
}

export default Dropdown
