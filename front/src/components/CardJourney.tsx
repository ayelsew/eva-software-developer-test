import React from "react";
import { FC } from "react";
import Button from "./Button";

interface CardJourneyProps {
  actions: JSX.Element
}

const CardJourney: FC<CardJourneyProps> = ({ actions }) => {
  return (
    <div className="bg-white rounded-lg block w-max">
      <div className="flex p-4 gap-4">
        <div className="flex flex-col p-4">
          <span>Envio de email</span>
          <span>Status: Agendado</span>
        </div>
        <div className="flex flex-col align-center justify-center gap-4">
          {actions}
        </div>
      </div>
    </div>
  )
}

export default CardJourney
