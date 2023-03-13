import React from "react";
import { FC } from "react";

interface InputProps {
  type: "text" | "datetime-local"
  label?: string
}

const Input: FC<InputProps> = ({ type, label }) => {
  return (
    <div className="flex flex-col">
      {label ? <label htmlFor="employee-name" className="mb-2 px-2">{label}</label> : null}
      <input id="employee-name" type={type} className={`py-1 px-6 rounded-full bg-gray-300`} />
    </div>
  )
}

export default Input
