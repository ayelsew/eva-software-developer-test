import React from "react";
import { FC } from "react";

interface ButtonRoundedProps {
  label: string
  color: string
  onClick: () => void
}

const ButtonRounded: FC<ButtonRoundedProps> = ({ label, color, onClick }) => {
  return (
    <button type="button" className={`rounded-full h-16 w-16 flex items-center justify-center ${color}`} onClick={onClick}>
      {label}
    </button>
  )
}

export default ButtonRounded
