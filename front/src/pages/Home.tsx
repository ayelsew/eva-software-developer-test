import React, { useCallback, useEffect, useState } from "react";
import { FC } from "react";
import ButtonRounded from "../components/ButtonRounded";
import ListItem from "../components/ListItem";
import { EmployeeDTO } from "../employeeDTO";
import employee from "../gateway/employee";
import httpClientAdapter from "../infrastructure/httpClientaAdapter";

interface HomeProps {
  setPage: (value: "edit" | "create") => void
}

const Home: FC<HomeProps> = ({ setPage }) => {
  const [status, setStatus] = useState({ color: "", message: "" })
  const [records, setRecords] = useState<EmployeeDTO[]>([])
  const employeeHandler = useCallback(() => employee(httpClientAdapter()), [])

  useEffect(() => {
    employeeHandler().getAll().then(({ data, keyErros, message }) => {
      if (!keyErros.length) return setRecords(data?.reverse() || [])
      return setStatus({ color: "bg-red-400", message })
    })
  }, [])

  return (
    <div className="bg-gray-50 h-screen w-1/2 flex flex-col items-center relative">
      <div className="px-10 w-full overflow-y-auto">
        <h2 className="mb-8 border-b-2 border-gray-600 text-3xl mt-4 pb-2 px-4 w-full">
          Colaboradores cadastrados
        </h2>
        {!records.length? (<h2>Não há colaboradores cadastrados</h2>) :records.map(({ name, role, email, _id }) => (
          <ListItem
            key={email}
            onShow={() => {
              window.location.hash = _id;
              setPage("edit")
            }}
            name={name} role={role}
          />
        ))}
        <span className={`${status.color} flex px-4 py-2 rounded-lg`}>
          {status.message}
        </span>
      </div>
      <div className="absolute right-10 bottom-10">
        <ButtonRounded label="+" color="bg-blue-100" onClick={() => setPage("create")} />
      </div>
    </div>
  )
}

export default Home
