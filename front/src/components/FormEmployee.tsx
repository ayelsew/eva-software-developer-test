import React, { useEffect, useState } from "react";
import { FC } from "react";
import employeeDTO, { EmployeeDTO } from "../employeeDTO";
import Button from "./Button";
import Input from "./Input";

interface FormEmployeeProps {
  hideDisableButton?: boolean
  onSave(data: EmployeeDTO): void
  onRemove?: () => void
  values?: EmployeeDTO
}

const FormEmployee: FC<FormEmployeeProps> = ({ hideDisableButton, onSave, onRemove, values }) => {
  const [data, setData] = useState<EmployeeDTO>(employeeDTO({}))

  useEffect(() => {
    if (values) setData(values)
  }, [values])

  return (
    <form className="flex-col items-center">
      <h2 className="mb-8 border-b-2 border-gray-600 text-3xl mt-4 pb-2 px-4">
        Dados do colaborador
      </h2>
      <div className="mb-8">
        <Input type="text" label="Nome completo *" value={data.name} onInput={(name) => setData((info) => ({ ...info, name }))} />
      </div>
      <div className="flex gap-4 w-full mb-8">
        <div className="w-full">
          <Input type="datetime-local" label="Data de nascimento *" value={new Date(data.birthday).toISOString().slice(0,-5)}  onInput={(birthday) => setData((info) => ({ ...info, birthday: new Date(birthday).valueOf() }))} />
        </div>
        <div className="w-full">
          <Input type="text" label="Email *" value={data.email} onInput={(email) => setData((info) => ({ ...info, email }))} />
        </div>
      </div>
      <div className="flex gap-4 w-full mb-8">
        <div className="w-full">
          <Input type="text" label="Telefone ou celular *" value={data.phone} onInput={(phone) => setData((info) => ({ ...info, phone }))} />
        </div>
        <div className="w-full">
          <Input type="text" label="Cargo *" value={data.role} onInput={(role) => setData((info) => ({ ...info, role }))} />
        </div>
      </div>
      <div className="flex justify-end">
        <div className="flex gap-4">
          {hideDisableButton ? null : <Button label="Remove" onClick={() => {if (onRemove) onRemove()}} color="bg-red-800" />}
          <Button
            label="Salvar"
            onClick={() => onSave(data)}
            color="bg-green-800"
          />
        </div>
      </div>

    </form>
  )
}


export default FormEmployee