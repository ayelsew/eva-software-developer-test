interface Employee {
  id: string
  name: string
  email: string
  phone: string
  birthday: number
  role: string
}

export type EmployeeDTO = Employee

const employeeDTO = (data: Partial<Employee>): Employee => {
  return {
    id: "",
    name: "Zé "+ Date.now(),
    email: "Zé"+ Date.now()+"@teste.com",
    phone: "11940028922",
    birthday: Date.now(),
    role: "Developer",
    ...data
  }
}

export default employeeDTO
