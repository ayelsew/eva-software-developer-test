import React from "react";
import { FC } from "react";
import Button from "./Button";

interface CardJourneyProps {
  actions: JSX.Element
  type: "SEND_WHATSAPP" | "SEND_EMAIL"
  status: boolean
}

const CardJourney: FC<CardJourneyProps> = ({ actions, type, status }) => {
  return (
    <div className="bg-neutral-900 rounded-lg block w-max">
      <div className="flex p-4 gap-4">
        <div className="flex flex-col p-4">
          <span>{type === "SEND_EMAIL" ? "Envio de email" : "Envio de whatsapp"}</span>
          <span>Status: {status ? <span className="text-green-400">Concluído</span> : <span className="text-blue-400">Agendando</span>}</span>
        </div>
        <div className="flex flex-col align-center justify-center gap-4">
          {actions}
        </div>
      </div>
    </div>
  )
}

export default CardJourney
