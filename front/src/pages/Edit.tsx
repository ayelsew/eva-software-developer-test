import React from "react";
import { FC } from "react";
import ButtonRounded from "../components/ButtonRounded";
import Input from "../components/Input";
import Button from "../components/Button";
import FormEmployee from "../components/FormEmployee";
import FormJourney from "../components/FormJourney";

interface EditProps {
  setPage: (value: "home") => void
}

const Edit: FC<EditProps> = ({ setPage }) => {
  return (
    <div className="bg-gray-50 h-screen w-1/2 relative flex-col items-center ">
      <div className="h-full w-full overflow-y-auto">
        <div className="px-10 mb-10">
          <FormEmployee />
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
