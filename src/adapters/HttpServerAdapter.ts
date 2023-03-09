import express, { Express } from "express"

type Method = "get" | "post" | "patch" | "put" | "delete"
type Middleware = (request: Record<string, any>, response: Record<string, any>, callback: () => void) => void
type Handler = (request: Record<string, any>, response: Record<string, any>) => void

export interface IHttpServer {
    register(method: Method, path: string, handler: Handler): void
    register(method: Method, path: string, middlewares: Middleware[], handler: Handler): void
    register(method: Method, path: string, middlewares: Middleware[] | Handler, handler?: Handler): void
}

export default class HttpServer implements IHttpServer {
    private server: Express

    constructor(port: number, callback?: () => void) {
        this.server = express();

        this.server.listen(port, callback)
    }

    /**
     * 
     * @param method get, post...
     * @param path "/resource"
     * @param handler (req, res) => {} 
     */
    register(method: Method, path: string, handler: Handler): void
    register(method: Method, path: string, middlewares: Middleware[], handler: Handler): void
    register(method: Method, path: string, middlewares: Middleware[] | Handler, handler?: Handler): void {
        if (handler) {
            this.server[method](path, middlewares, handler);
            return;
        }

        this.server[method](path, middlewares)
    }


}
