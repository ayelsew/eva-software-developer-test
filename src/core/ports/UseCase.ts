import ResourceDAO from "./ResourceDAO"

type Response = Promise<{ payload?: any, status?: number }>
type UseCase<EA extends Record<string, any>> = {
  insert(data: EA): Response
  find(id: string): Response
  update(id: string, data: EA): Response
  remove(id: string): Response
}

export default UseCase
