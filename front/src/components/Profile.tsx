import React from "react";
import { FC } from "react";

interface ButtonProps {
  label: string
  color: string
}

const Profile: FC<ButtonProps> = ({ label, color }) => {
  return (
    <div className={`rounded-full h-16 w-16 flex items-center justify-center ${color}`}>
      {label}
    </div>
  )
}

export default Profile
