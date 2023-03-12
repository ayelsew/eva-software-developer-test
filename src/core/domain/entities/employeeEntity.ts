import { boolean } from "joi";
import factoryEntity from "../factoryEntity";
import employeeValidation from "./employeeValidation";

export interface EmployeeAttributes {
  id: string,
  name: string,
  email: string,
  phone: string,
  birthday: string,
  createdAt: number,
  deletedAt?: number,
  active: boolean,
}

const employeeEntity = factoryEntity<EmployeeAttributes>({
  id: "",
  name: "",
  email: "",
  phone: "",
  birthday: "",
  createdAt: 0,
  deletedAt: undefined,
  active: false,
},
  employeeValidation
)

export type EmployeeEntity = typeof employeeEntity
export default employeeEntity
