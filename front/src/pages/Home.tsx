import React from "react";
import { FC } from "react";
import Button from "../components/Button";
import ButtonRounded from "../components/ButtonRounded";
import ListItem from "../components/ListItem";
import Profile from "../components/Profile";

interface HomeProps {
  setPage: (value: "edit" | "create") => void
}

const Home: FC<HomeProps> = ({ setPage }) => {
  return (
    <div className="bg-gray-50 h-screen w-1/2 flex flex-col items-center relative">
      <div className="px-10 w-full">
        <h2 className="mb-8 border-b-2 border-gray-600 text-3xl mt-4 pb-2 px-4 w-full">
          Colaboradores cadastrados
        </h2>
        <ListItem onShow={() => setPage("edit")} />
        <ListItem onShow={() => setPage("edit")} />
        <ListItem onShow={() => setPage("edit")} />
        <ListItem onShow={() => setPage("edit")} />
        <ListItem onShow={() => setPage("edit")} />
        <ListItem onShow={() => setPage("edit")} />
      </div>
      <div className="absolute right-10 bottom-10">
        <ButtonRounded label="+" color="bg-blue-100" onClick={() => setPage("create")} />
      </div>
    </div>
  )
}

export default Home
