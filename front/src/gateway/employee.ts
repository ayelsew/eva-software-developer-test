import { EmployeeDTO } from "../employeeDTO"
import HttpClient from "../infrastructure/HttpClient"

interface RequestDTO<D> {
  message: string,
  data?: D,
  keyErros: {
    key: string,
    message: string
  }[]
}

const employee = (httpClient: HttpClient) => {
  const PATH = "/employee"

  return {
    async insert(data: Partial<EmployeeDTO>): Promise<RequestDTO<EmployeeDTO>> {
      delete data.id

      const response = await httpClient.post(PATH, data);
      if (response.status === 201) return {
        data: response.body?.user,
        message: response.body?.message,
        keyErros: []
      };

      return {
        data: undefined,
        message: response.body?.message,
        keyErros: response.body?.errors || [{}]
      };
    },
    async getAll(): Promise<RequestDTO<EmployeeDTO[]>> {
      const response = await httpClient.get(PATH);
      if (response.status === 200) return {
        data: response.body || [],
        message: response.body?.message,
        keyErros: []
      };

      return {
        data: undefined,
        message: response.body?.message,
        keyErros: response.body?.errors || [{}]
      };
    }
  }
}

export default employee
