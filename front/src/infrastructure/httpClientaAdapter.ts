import axios from "axios"
import HttpClient from "./HttpClient"

const httpClientAdapter = (): HttpClient => {
  const instance = axios.create({
    baseURL: "http://localhost:3000",
    validateStatus: () => true
  })

  return {
    async get(path: string) {
      const response = await instance.get(path);
      return {
        status: response.status,
        body: response.data
      }
    },
    async delete(path) {
      const response = await instance.delete(path);
      return {
        status: response.status,
        body: response.data
      }
    },
    async patch(path, payload) {
      const response = await instance.get(path, payload);
      return {
        status: response.status,
        body: response.data
      }
    },
    async post(path, payload) {
      const response = await instance.post(path, payload);
      return {
        status: response.status,
        body: response.data
      }
    },
  }
}

export default httpClientAdapter
