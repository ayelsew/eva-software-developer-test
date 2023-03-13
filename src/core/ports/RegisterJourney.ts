interface ActionSchema<T, P> {
    type: T,
    payload: P
    scheduled: number
    journeyId: string
}

export type ActionSendWhatsapp = ActionSchema<"SEND_WHATSAPP", {
    message: string
    journeyId: string
}>

export type ActionSendEmail = ActionSchema<"SEND_EMAIL", {
    from: string
    to: string
    body: string
    attachement?: string
    journeyId: string
}>

type Acumulator =  { [name: string]: any }

type RestActions<R> = R extends ActionSchema<any, any>[] ? R : []

type MapActions<A extends ActionSchema<string, any>[], AC extends Acumulator = { [name: string]: any }> = 
    A extends [infer FA, ...infer RA] ? 
    FA extends ActionSchema<string, any> ? 
    MapActions<RestActions<RA>, { type: FA["type"], payload: FA["payload"] } | AC> : AC : AC

type Action<S = MapActions<[ ActionSendWhatsapp, ActionSendEmail ]>> = S extends ActionSchema<string, any> ? S : never 

type RegisterJourneyReturn = Promise<Promise<string | number | undefined>[]>

type ActionStatus = "waiting"| "active" | "failed" | "completed"

interface ActionInfo<R extends string> {
    id: string | number,
    result: R,
    completedAt?: number
    type: string
    journeyId: string
}

type WatchCallback<R> = (info: ActionInfo<string>) => void

type RegisterJourney = {
    register(actions: ActionSchema<any, any>[]): RegisterJourneyReturn
    watchActions<R>(status: ActionStatus, callback: WatchCallback<R>): any
    delete(type: string,  id: string): Promise<void>
    statusAction(type: string, id: string): Promise<ActionInfo<any> | undefined>
}

export default RegisterJourney
