import { JourneyDTO } from "./journeyDTO"
import HttpClient from "../infrastructure/HttpClient"

interface RequestDTO<D> {
  message: string,
  data?: D,
  keyErros: {
    key: string,
    message: string
  }[]
}

const journey = (httpClient: HttpClient) => {
  const PATH = "/journey"

  return {
    async insert(data: Partial<JourneyDTO>): Promise<RequestDTO<JourneyDTO>> {
      delete data._id
      delete data.createdAt
      delete data.finishedAt

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
    async find(id: string): Promise<RequestDTO<JourneyDTO>> {
      const response = await httpClient.get(`${PATH}/employee/${id}`);
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
    async update(id: string, data: Partial<JourneyDTO>): Promise<RequestDTO<undefined>> {
      delete data._id
      delete data.createdAt
      delete data.finishedAt

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
    },
    async delete(id: string): Promise<RequestDTO<undefined>> {
      const response = await httpClient.delete(`${PATH}/${id}`);

      if (response.status === 204) return {
        data: undefined,
        message: "Removido.",
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

export default journey
