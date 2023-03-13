import React, { useCallback, useEffect, useState } from "react";
import { FC } from "react";
import ButtonRounded from "../components/ButtonRounded";
import Input from "../components/Input";
import Button from "../components/Button";
import FormEmployee from "../components/FormEmployee";
import FormJourney from "../components/FormJourney";
import employee from "../gateway/employee";
import httpClientAdapter from "../infrastructure/httpClientaAdapter";
import employeeDTO, { EmployeeDTO } from "../employeeDTO";

interface EditProps {
  setPage: (value: "home") => void
}

const Edit: FC<EditProps> = ({ setPage }) => {
  const [employeeData, setEmployeeData] = useState<EmployeeDTO>(employeeDTO({}));
  const [statusEmployee, setStatusEmployee] = useState({ color: "", message: "" })
  const employeeHandler = useCallback(() => employee(httpClientAdapter()), [])

  useEffect(() => {
    employeeHandler().find(window.location.hash.slice(1)).then(({ data, keyErros, message }) => {
      if (!keyErros.length) return setEmployeeData(employeeDTO(data || {}))
      return setStatusEmployee({ color: "bg-red-400", message })
    })
  }, [])

  return (
    <div className="bg-gray-50 h-screen w-1/2 relative flex-col items-center ">
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
          <FormJourney />
        </div>
      </div>

      <div className="absolute right-10 bottom-10">
        <ButtonRounded label="<" color="bg-blue-100" onClick={() => setPage("home")} />
      </div>
    </div>
  )
}

export default Edit
