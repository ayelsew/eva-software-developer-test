export type Method = "get" | "post" | "patch" | "put" | "delete"
export type Middleware = (request: Record<string, any>, response: Record<string, any>, callback: () => void) => void
export type Handler = (request: Record<string, any>, response: Record<string, any>) => void

export interface HttpServer {
    register(method: Method, path: string, handler: Handler): void
    register(method: Method, path: string, middlewares: Middleware[], handler: Handler): void
    register(method: Method, path: string, middlewares: Middleware[] | Handler, handler?: Handler): void
}
