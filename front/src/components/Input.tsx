import React from "react";
import { FC } from "react";

interface InputProps {
  type: "text" | "datetime-local"
  label?: string
  id?: string
  onInput: (value: string) => void
  value?: string
}

const Input: FC<InputProps> = ({ type, label, id, onInput, value }) => {
  return (
    <div className="flex flex-col">
      {label ? <label htmlFor={id} className="mb-2 px-2">{label}</label> : null}
      <input id={id} type={type} className={`py-1 px-6 rounded-full bg-gray-300`} value={value} onChange={({ target: { value } }) => onInput(value)}/>
    </div>
  )
}

export default Input
