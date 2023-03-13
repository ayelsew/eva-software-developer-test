interface Employee {
  _id: string
  name: string
  email: string
  phone: string
  birthday: number
  role: string
  createdAt?: number
  deletedAt?: number
}

export type EmployeeDTO = Employee

const employeeDTO = (data: Partial<Employee>): Employee => {
  return {
    _id: "",
    name: "Zé "+ Date.now(),
    email: "Zé"+ Date.now()+"@teste.com",
    phone: "11940028922",
    birthday: Date.now(),
    role: "Developer",
    createdAt: undefined,
    deletedAt: undefined,
    ...data
  }
}

export default employeeDTO
