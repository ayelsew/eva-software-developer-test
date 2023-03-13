import React, { useCallback, useEffect, useState } from "react";
import { FC } from "react";
import ButtonRounded from "../components/ButtonRounded";
import FormEmployee from "../components/FormEmployee";
import FormJourney from "../components/FormJourney";
import employee from "../gateway/employee";
import httpClientAdapter from "../infrastructure/httpClientaAdapter";
import employeeDTO, { EmployeeDTO } from "../employeeDTO";
import journey from "../gateway/journey";
import journeyDTO, { JourneyDTO } from "../gateway/journeyDTO";

interface EditProps {
  setPage: (value: "home") => void
}

const Edit: FC<EditProps> = ({ setPage }) => {
  const [employeeData, setEmployeeData] = useState<EmployeeDTO>(employeeDTO({}));
  const [journeyData, setJourneyData] = useState<JourneyDTO[]>([]);
  const [statusEmployee, setStatusEmployee] = useState({ color: "", message: "" })
  const [statusJourney, setStatusJourney] = useState({ color: "", message: "" })
  const employeeHandler = useCallback(() => employee(httpClientAdapter()), [])
  const journeyHandler = useCallback(() => journey(httpClientAdapter()), [])

  const getJourneys = useCallback(() => {
    journeyHandler().find(window.location.hash.slice(1)).then(({ data, keyErros, message }) => {
      return setJourneyData(data || [])
    })
  }, [])

  useEffect(() => {
    employeeHandler().find(window.location.hash.slice(1)).then(({ data, keyErros, message }) => {
      if (!keyErros.length) return setEmployeeData(employeeDTO(data || {}))
      return setStatusEmployee({ color: "bg-red-400", message })
    })
    const id = setInterval(() => {
      getJourneys()
    }, 1000 * 60)
    getJourneys()
    return () => {
      clearInterval(id)
    }
  }, [])

  return (
    <div className="bg-gray-800 h-screen w-1/2 relative flex-col items-center ">
      <div className="h-full w-full overflow-y-auto">
        <div className="px-10 mb-10">
          <FormEmployee
            values={employeeData}
            onSave={(data) => employeeHandler().update(employeeData._id, data).then(({ keyErros, message }) => {
              if (keyErros.length) return setStatusEmployee({ color: "bg-red-400", message })
              setStatusEmployee({ color: "bg-green-800", message })
              setTimeout(() => setPage("home"), 2000)
            })}
            onRemove={() => employeeHandler().delete(employeeData._id).then(({ keyErros, message }) => {
              if (keyErros.length) return setStatusEmployee({ color: "bg-red-400", message })
              setStatusEmployee({ color: "bg-green-800", message })
              setTimeout(() => setPage("home"), 2000)
            })}
          />
          <span className={`${statusEmployee.color} flex px-4 py-2 rounded-lg mt-4`}>
            {statusEmployee.message}
          </span>
        </div>
        <div className="px-10">
          <span className={`${statusJourney.color} flex px-4 py-2 rounded-lg mt-4`}>
            {statusJourney.message}
          </span>
          <FormJourney
            values={journeyData}
            employeeEmail={employeeData.name}
            employeeId={employeeData._id}
            onSave={(data) => journeyHandler().insert(data).then(({ keyErros, message }) => {
              if (keyErros.length) {
                setStatusJourney({ color: "bg-red-400", message })
                return Promise.reject()
              }
              getJourneys()
              setStatusJourney({ color: "bg-green-800", message })
              return;
            })}
            onRemove={(id) => journeyHandler().delete(id).then(({ keyErros, message }) => {
              if (keyErros.length) {
                setStatusJourney({ color: "bg-red-400", message })
                return Promise.reject()
              }
              getJourneys()
              setStatusJourney({ color: "bg-green-800", message })
              return;
            })}
          />

        </div>
      </div>

      <div className="absolute right-10 bottom-10">
        <ButtonRounded label="<" color="bg-blue-800" onClick={() => setPage("home")} />
      </div>
    </div>
  )
}

export default Edit
