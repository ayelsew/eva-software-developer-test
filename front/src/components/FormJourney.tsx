import React, { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid"
import { FC } from "react";
import journeyDTO, { JourneyDTO } from "../gateway/journeyDTO";
import Button from "./Button";
import CardJourney from "./CardJourney";
import Dropdown from "./Dropdown";
import Input from "./Input";
import TextArea from "./TextArea";

interface FormJourneyProps {
  values: JourneyDTO[]
  employeeEmail: string
  employeeId: string
  onSave(data: JourneyDTO): Promise<void>
  onRemove(journeyId: string): void
}

const FormJourney: FC<FormJourneyProps> = ({ values, employeeEmail, onSave, employeeId, onRemove }) => {
  const [journeyData, setJourneyData] = useState<JourneyDTO[]>([])
  const [newJourneyData, setNewJourneyData] = useState<JourneyDTO>(journeyDTO({}))
  const [editJourney, setEditJourney] = useState<boolean>(true)
  const [showJourney, setShowJourney] = useState<boolean>(false)
  const [newJourney, setNewJourney] = useState<boolean>(false)
  const [tmpEditJourney, setTmpEditJounery] = useState<{ type?: "SEND_WHATSAPP" | "SEND_EMAIL", content: Record<string, any> }>({
    type: undefined,
    content: {}
  })
  const [view, setView] = useState({ journey: 0, action: 0 })

  useEffect(() => {
    setJourneyData(values.reverse())
  }, [values])

  const parseDDMMYYYY = useCallback((timestamp: number, full?: boolean) => {
    const date = new Date(timestamp)
    const d = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    return `${d} ${full ? ` ${date.getHours()}:${date.getMinutes()}` : ""}`
  }, [])

  const addNewAction = useCallback(() => {
    if (tmpEditJourney.type === "SEND_EMAIL") {
      return setNewJourneyData((info) => ({
        ...info,
        employeeId: employeeId,
        actions: [
          ...info.actions,
          {
            type: "SEND_EMAIL",
            payload: {
              ...tmpEditJourney.content,
              from: "systema@teste.com",
              to: employeeEmail,
            }
          }
        ]
      }))
    }
    setNewJourneyData((info) => ({
      ...info,
      employeeId: employeeId,
      actions: [
        ...info.actions,
        {
          type: "SEND_WHATSAPP",
          payload: {
            message: tmpEditJourney.content.body,
          }
        }
      ]
    }))
    setTmpEditJounery({ type: undefined, content: {} })
  }, [tmpEditJourney, employeeEmail, employeeId])

  const renderForm = useCallback(() => {
    return (
      <div className="mb-8 w-full">
        <div className="flex justify-between px-8 mb-4">
          <div className="flex gap-4 items-center justify-center">

            <span>Criado em: </span><time>{parseDDMMYYYY(newJourneyData.createdAt)}</time>

            <span>Agendado para: </span><Input type="datetime-local" onInput={(value) => setNewJourneyData((info) => ({ ...info, scheduled: new Date(value).valueOf() }))} />

          </div>
          <div className="flex gap-4">
            <Button label="Ação +" onClick={() => setEditJourney(true)} color="bg-blue-600" />
            <span className={!newJourneyData.scheduled ? "hidden" : undefined}>
              <Button
                label="Salvar"
                onClick={() => {
                  onSave(newJourneyData).then(() => setNewJourney(false)).catch()

                }}
                color="bg-blue-600"
              />
            </span>
          </div>
        </div>
        {
          editJourney ?
            <div className="px-8 py-4 mb-4 flex flex-col gap-2 bg-neutral-900 rounded-lg block">
              <Dropdown label="Tipo de ação" onChange={(type: "SEND_WHATSAPP" | "SEND_EMAIL") => setTmpEditJounery((info) => ({ ...info, type }))}>
                <>
                  <option value="">Escolha uma opção</option>
                  <option value="SEND_WHATSAPP">Enviar mensagem por Whatsapp</option>
                  <option value="SEND_EMAIL">Enviar mensagem por Email</option>
                </>
              </Dropdown>
              <TextArea label="Mensagem" size="h-32" onChange={(body) => setTmpEditJounery((info) => ({ ...info, content: { ...info.content, body } }))} ></TextArea>
              <div className="flex gap-4 mt-2">
                <span className={!(tmpEditJourney.type && Object.keys(tmpEditJourney.content).length) ? "hidden" : "block"}>
                  <Button
                    label="Adicionar"
                    color="bg-blue-600"
                    onClick={() => {
                      addNewAction()
                      setEditJourney(false)
                    }}
                  />
                </span>
                <Button label="Fechar" color="bg-red-800" onClick={() => setEditJourney(false)} />
              </div>
            </div>
            : null
        }
        {newJourneyData.actions.length ? (
          <div className="grid grid-cols-2 gap-4 justify-items-center px-10">
            {newJourneyData.actions.map(({ payload, type, result }) => (
              <CardJourney
                key={`${payload}${type}`}
                type={type}
                status={false}
                actions={
                  <>
                    <Button label="remover" color="bg-red-800" onClick={() => undefined} />
                  </>
                }
              />
            ))}
          </div>
        ) : null}
      </div>
    )
  }, [editJourney, tmpEditJourney, newJourneyData])

  return (
    <form className="flex-col items-center">
      <div className="mb-8 border-b-2 border-gray-600 mt-4 pb-2 px-4 flex justify-between">
        <h2 className="text-3xl">
          Jornada do colaborador
        </h2>
        <div className="flex gap-4">
          {!newJourney ? <Button label="Adicionar" onClick={() => setNewJourney(true)} color="bg-blue-800" /> : null}
          {newJourney ? <Button label="Cancelar" onClick={() => setNewJourney(false)} color="bg-red-800" /> : null}
        </div>
      </div>
      {newJourney ? renderForm() : null}
      <div className="mb-8 w-full">
        {!journeyData.length ? (<h2>Não há jornadas cadastradas</h2>) :journeyData.map(({ actions, _id, scheduled, finishedAt, createdAt }, indexJourney) => (
          <div key={_id}>
            <div className="flex justify-between px-8 mb-4 mt-4">
              <div className="flex gap-4">
                <span>#{indexJourney + 1}</span>
                <span>Criado em: <time>{parseDDMMYYYY(createdAt)}</time></span>
                <span>Agendado para: <time>{parseDDMMYYYY(scheduled, true)}</time></span>
              </div>
              <div className="flex gap-4">
                <Button label="Apagar" onClick={() => onRemove(_id)} color="bg-red-800" />
              </div>
            </div>
            {
              showJourney && view.journey === indexJourney ?
                <div className="px-8 py-4 mb-4 flex flex-col gap-2 bg-neutral-900 rounded-lg block">
                  <Dropdown label="Tipo de ação" disabled defaultValue={journeyData[view.journey].actions[view.action].type} onChange={() => undefined} >
                    <>
                      <option
                        value="SEND_WHATSAPP"
                      >
                        Enviar mensagem por Whatsapp
                      </option>
                      <option
                        value="SEND_EMAIL"
                      >
                        Enviar mensagem por Email
                      </option>
                    </>
                  </Dropdown>
                  <TextArea
                    label="Mensagem"
                    size="h-32"
                    onChange={() => undefined}
                    disabled
                    defaultValue={
                      journeyData[view.journey].actions[view.action].payload?.body ||
                      journeyData[view.journey].actions[view.action].payload?.message
                    }
                  />
                  <div className="flex gap-4 mt-2">
                    <Button label="Fechar" color="bg-red-800" onClick={() => setShowJourney(false)} />
                  </div>
                </div>
                : null
            }
            <div className="grid grid-cols-2 gap-4 justify-items-center px-4">
              {actions.map(({ id, type, result }, indexAction) => (
                <CardJourney
                  key={`${id}${type}${uuidv4()}`}
                  type={type}
                  status={result !== null}
                  actions={
                    <>
                      <Button label="ver" color="bg-blue-600" onClick={() => {
                        setView({ journey: indexJourney, action: indexAction })
                        setShowJourney(true)
                      }} />
                    </>
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </form>
  )
}


export default FormJourney