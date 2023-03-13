import React from "react";
import { FC } from "react";
import Button from "./Button";
import Profile from "./Profile";

interface ListItemProps {
  onShow: () => void
  name: string,
  role: string
}

const ListItem: FC<ListItemProps> = ({ onShow, name, role }) => {
  return (
    <div className={`h-24 w-full border-b-2 border-gray-600 px-4 flex items-center justify-between`}>
      <div className="flex items-center">
        <Profile label={name.slice(0, 1)} color="bg-blue-500" />
        <div className="ml-10">
          <h2>{name}</h2>
          <span>{role || "Sem cargo"}</span>
        </div>
      </div>
      <Button label="Visualizar" color="bg-red-500" onClick={onShow} />
    </div>
  )
}

export default ListItem
