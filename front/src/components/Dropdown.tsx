import React from "react";
import { FC } from "react";

interface DropdownProps {
  label: string
}

const Dropdown: FC<DropdownProps> = ({ label }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="employee-name" className="mb-2 px-2">{label}</label>
      <select id="employee-name" className={`py-1 px-6 rounded-full bg-gray-300`}>
        <option value="">Enviar mensagem por Whatsapp</option>
        <option value="">Enviar mensagem por Email</option>
      </select>
    </div>
  )
}

export default Dropdown
