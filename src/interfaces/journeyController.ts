import { HttpServer } from "@/core/ports/HttpServer";
import UseCase from "@/core/ports/UseCase";

export default function journeyController(httpServer: HttpServer, handler: UseCase<any>) {

    httpServer.register("post", "/journey", async (request, response) => {
        const { status, payload } = await handler.insert(request.body);
        response.status(status ?? 200).send(payload)
    })

    httpServer.register("get", "/journey/employee/:id", async (request, response) => {
        const { status, payload } = await handler.find(request.params.id);
        response.status(status ?? 200).send(payload)
    })

    httpServer.register("delete", "/journey/:id", async (request, response) => {
        const { status, payload } = await handler.remove(request.params.id);
        response.status(status ?? 200).send(payload)
    })

}