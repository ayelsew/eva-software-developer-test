import factoryEntity from "../factoryEntity";
import journeyValidation from "./journeyValidation";

export interface JourneyAttributes {
  id: string
  employeeId: string
  actions: {
    id?: number | string
    result?: string
    type: "SEND_WHATSAPP" | "SEND_EMAIL",
    payload: Record<string, any>
  }[]
  createdAt: number
  finishedAt?: number
  scheduled: number 
}

const journeyEntity = factoryEntity<JourneyAttributes>({
  id: "",
  employeeId: "",
  actions: [],
  createdAt: Date.now(),
  finishedAt: undefined,
  scheduled: 0
},
  journeyValidation
)

export type JourneyEntity = typeof journeyEntity
export default journeyEntity
