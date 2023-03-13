import { resolve } from "path"
import { HttpServer, Method, Handler, Middleware } from "@/core/ports/HttpServer";
import express from "express"

export default function httpServerAdapter(port: number, callback?: () => void): HttpServer {
  const server = express()
  server.use(express.json())
  server.use(express.urlencoded({ extended: true }))

  server.listen(port, callback);

  server.use("/", express.static(resolve("front/dist")))

  /**
   * 
   * @param method get, post...
   * @param path "/resource"
   * @param handler (req, res) => {} 
   */
  const register = (method: Method, path: string, middlewares: Middleware[] | Handler, handler?: Handler): void => {
    if (handler) {
      server[method](path, middlewares, handler);
      return;
    }
    server[method](path, middlewares)
  }

  return { register }
}
