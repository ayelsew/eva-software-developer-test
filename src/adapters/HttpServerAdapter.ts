import { IHttpServer, Method, Handler, Middleware } from "@/IHttpServer";
import express, { Express } from "express"

export default class HttpServer implements IHttpServer {
    private server: Express;

    constructor(port: number, callback?: () => void) {
        this.server = express();
        this.server.listen(port, callback);
    }

    /**
     * 
     * @param method get, post...
     * @param path "/resource"
     * @param handler (req, res) => {} 
     */
    register = (method: Method, path: string, middlewares: Middleware[] | Handler, handler?: Handler): void => {
        if (handler) {
            this.server[method](path, middlewares, handler);
            return;
        }
        this.server[method](path, middlewares)
    }


}
