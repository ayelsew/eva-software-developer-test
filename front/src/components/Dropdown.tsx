import React from "react";
import { FC } from "react";

interface DropdownProps {
  label: string
  children: JSX.Element
  onChange: (value: any) => void
  defaultValue?: string
  disabled?: boolean
}

const Dropdown: FC<DropdownProps> = ({ label, children, onChange, defaultValue, disabled }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="employee-name" className="mb-2 px-2">{label}</label>
      <select id="employee-name" disabled={disabled} defaultValue={defaultValue} className={`py-1 px-6 rounded-full bg-gray-600`} onChange={({ target: { value } }) => onChange(value)}>
        <>
          {children}
        </>
      </select>
    </div>
  )
}

export default Dropdown
