import React, { useCallback, useState } from "react";
import { FC } from "react";
import ButtonRounded from "../components/ButtonRounded";
import FormEmployee from "../components/FormEmployee";
import employee from "../gateway/employee";
import httpClientAdapter from "../infrastructure/httpClientaAdapter";


interface Create {
  setPage: (value: "home") => void
}

const Create: FC<Create> = ({ setPage }) => {
  const [status, setStatus] = useState({ color: "", message: "" })
  const employeeHandler = useCallback(() => employee(httpClientAdapter()), [])

  return (
    <div className="bg-gray-50 h-screen w-1/2 relative flex-col items-center ">
      <div className="h-full w-full overflow-y-auto">
        <div className="px-10 mb-10">
          <FormEmployee hideDisableButton onSave={(data) => employeeHandler().insert(data).then(({ keyErros, message }) => {
            if (keyErros.length) return setStatus({ color: "bg-red-400", message })
            setStatus({ color: "bg-green-800", message })
            setTimeout(() => setPage("home"), 2000)
          })} />
        </div>
        <span className={`${status.color} flex px-4 py-2 rounded-lg`}>
          {status.message}
        </span>
      </div>

      <div className="absolute right-10 bottom-10">
        <ButtonRounded label="<" color="bg-blue-100" onClick={() => setPage("home")} />
      </div>
    </div>
  )
}

export default Create
