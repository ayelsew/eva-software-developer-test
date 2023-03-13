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
      delete data._id

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
    },
    async find(id: string): Promise<RequestDTO<EmployeeDTO>> {
      const response = await httpClient.get(`${PATH}/${id}`);
      if (response.status === 200) return {
        data: response.body,
        message: response.body?.message,
        keyErros: []
      };

      return {
        data: undefined,
        message: response.body?.message,
        keyErros: response.body?.errors || [{}]
      };
    },
    async update(id: string, data: Partial<EmployeeDTO>): Promise<RequestDTO<undefined>> {
      delete data._id
      delete data.createdAt
      delete data.deletedAt

      const response = await httpClient.patch(`${PATH}/${id}`, data);

      if (response.status === 204) return {
        data: undefined,
        message: "Atualizado.",
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
