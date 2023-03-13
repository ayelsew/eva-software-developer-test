interface Journey {
  _id: string
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

export type JourneyDTO = Journey

const journeyDTO = (data: Partial<Journey>): JourneyDTO => {
  return {
    _id: "",
    employeeId: "",
    actions: [],
    createdAt: Date.now(),
    finishedAt: undefined,
    scheduled: 0,
    ...data
  }
}

export default journeyDTO
