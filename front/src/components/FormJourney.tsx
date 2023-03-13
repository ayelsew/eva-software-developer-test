import React, { useCallback, useState } from "react";
import { FC } from "react";
import Button from "./Button";
import CardJourney from "./CardJourney";
import Dropdown from "./Dropdown";
import Input from "./Input";
import TextArea from "./TextArea";

const FormJourney: FC = () => {
  const [editJourney, setEditJourney] = useState<boolean>(false)
  const [showJourney, setShowJourney] = useState<boolean>(false)

  const renderForm = useCallback(() => {
    return (
      <div className="mb-8 w-full">
        <div className="flex justify-between px-8 mb-4">
          <div className="flex gap-4 items-center justify-center">
       
              <span> Criado em: </span><time>13/03/2023</time>
       
              <span>Agendado para: </span><Input type="datetime-local" />
            
          </div>
          <div className="flex gap-4">
            <Button label="Cancelar" onClick={() => undefined} color="bg-red-200" />
            <Button label="Salvar" onClick={() => undefined} color="bg-blue-600" />
          </div>
        </div>
        {
          editJourney ?
            <div className="px-8 py-4 mb-4 flex flex-col gap-2 bg-white rounded-lg block">
              <Dropdown label="Tipo de ação" />
              <TextArea label="Mensagem" size="h-32" />
              <div className="flex gap-4 mt-2">
                <Button label="Adicionar" color="bg-blue-600" onClick={() => setEditJourney(false)} />
                <Button label="Fechar" color="bg-red-800" onClick={() => setEditJourney(false)} />
              </div>
            </div>
            : null
        }
        <div className="grid grid-cols-3 gap-4 justify-items-center px-10">
          <CardJourney
            actions={
              <>
                <Button label="Editar" color="bg-blue-600" onClick={() => setEditJourney(true)} />
                <Button label="remover" color="bg-red-800" onClick={() => undefined} />
              </>
            }
          />
        </div>
      </div>
    )
  }, [editJourney])

  return (
    <form className="flex-col items-center">
      <div className="mb-8 border-b-2 border-gray-600 mt-4 pb-2 px-4 flex justify-between">
        <h2 className="text-3xl">
          Jornada do colaborador
        </h2>
        <div className="flex gap-4">
          <Button label="Adicionar" onClick={() => undefined} color="bg-blue-200" />
        </div>
      </div>
      {renderForm()}
      <div className="mb-8 w-full">
        <div className="flex justify-between px-8 mb-4">
          <div className="flex gap-4">
            <span>Criado em: <time>13/03/2023</time></span>
            <span>Agendado para: <time>13/03/2023</time></span>
          </div>
          <div className="flex gap-4">
            <Button label="Apagar" onClick={() => undefined} color="bg-red-800" />
          </div>
        </div>
        {
          showJourney ?
            <div className="px-8 py-4 mb-4 flex flex-col gap-2 bg-white rounded-lg block">
              <Dropdown label="Tipo de ação" />
              <TextArea label="Mensagem" size="h-32" />
              <div className="flex gap-4 mt-2">
                <Button label="Fechar" color="bg-red-800" onClick={() => setShowJourney(false)} />
              </div>
            </div>
            : null
        }
        <div className="grid grid-cols-3 gap-4 justify-items-center px-4">
          <CardJourney actions={<><Button label="ver" color="bg-blue-600" onClick={() => setShowJourney(true)} /></>} />
          <CardJourney actions={<><Button label="ver" color="bg-blue-600" onClick={() => setShowJourney(true)} /></>} />
          <CardJourney actions={<><Button label="ver" color="bg-blue-600" onClick={() => setShowJourney(true)} /></>} />
        </div>
      </div>
    </form>
  )
}


export default FormJourney