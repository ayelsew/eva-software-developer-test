import React from "react";
import { FC } from "react";

interface ButtonProps {
  label: string
  color: string
  onClick: () => void
}

const Button: FC<ButtonProps> = ({ label, color, onClick }) => {
  return (
    <button type="button" className={`py-1 px-6 rounded-full ${color}`} onClick={onClick}>
      {label}
    </button>
  )
}

export default Button
