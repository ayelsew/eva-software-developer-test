import { HttpServer } from "@/core/ports/HttpServer";
import { EmployeeManagerReturn as EmployeeManager } from "@/core/usecase/employeeManager";

export default function employeeController(httpServer: HttpServer, employeeManager: EmployeeManager) {

    httpServer.register("post", "/employee", async (request, response) => {
        const { status, payload } = await employeeManager.insert(request.body);
        response.status(status ?? 200).send(payload)
    })

    httpServer.register("get", "/employee/:id?", async (request, response) => {
        const { status, payload } = await employeeManager.find(request.params.id);
        response.status(status ?? 200).send(payload)
    })

    httpServer.register("patch", "/employee/:id", async (request, response) => {
        const { status, payload } = await employeeManager.update(request.params.id, request.body);
        response.status(status ?? 200).send(payload)
    })

    httpServer.register("delete", "/employee/:id", async (request, response) => {
        const { status, payload } = await employeeManager.remove(request.params.id);
        response.status(status ?? 200).send(payload)
    })

}