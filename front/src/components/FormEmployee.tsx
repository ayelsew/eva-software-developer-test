import React from "react";
import { FC } from "react";
import Button from "./Button";
import Input from "./Input";

const FormEmployee: FC = () => {
  return (
    <form className="flex-col items-center">
      <h2 className="mb-8 border-b-2 border-gray-600 text-3xl mt-4 pb-2 px-4">
        Dados do colaborador
      </h2>
      <div className="mb-8">
        <Input type="text" label="Nome completo *" />
      </div>
      <div className="flex gap-4 w-full mb-8">
        <div className="w-full">
          <Input type="text" label="Data de nascimento *" />
        </div>
        <div className="w-full">
          <Input type="text" label="Email *" />
        </div>
      </div>
      <div className="flex gap-4 w-full mb-8">
        <div className="w-full">
          <Input type="text" label="Telefone ou celular *" />
        </div>
        <div className="w-full">
          <Input type="text" label="Cargo *" />
        </div>
      </div>
      <div className="flex justify-end">
        <div className="flex gap-4">
          <Button label="Desativar" onClick={() => undefined} color="bg-red-200" />
          <Button label="Salvar" onClick={() => undefined} color="bg-green-200" />
        </div>
      </div>
    </form>
  )
}


export default FormEmployee