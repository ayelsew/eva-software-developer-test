import React from "react";
import { FC } from "react";
import Button from "./Button";
import Profile from "./Profile";

interface ListItemProps {
  children?: JSX.Element
  onShow: () => void
}

const ListItem: FC<ListItemProps> = ({ children, onShow }) => {
  return (
    <div className={`h-24 w-full border-b-2 border-gray-600 px-4 flex items-center justify-between`}>
      <div className="flex items-center">
        <Profile label="W" color="bg-blue-500" />
        <div className="ml-10">
          <h2>Wesley araujo santos</h2>
          <span>Software developer</span>
        </div>
      </div>
      <Button label="Visualizar" color="bg-red-500" onClick={onShow} />
    </div>
  )
}

export default ListItem
