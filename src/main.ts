import employeeEntity, { EmployeeAttributes } from "./core/domain/entities/employeeEntity";
import employeeManager from "./core/usecase/employeeManager";
import dataBaseOnSQLAdapter from "./infrastructure/adapters/DataBaseAdapter";
import employeeDAO from "./infrastructure/employeeDAO";
import httpServerAdapter from "./interfaces/adapters/httpServerAdapter";
import httpController from "./interfaces/httpController";

const httpsServer = httpServerAdapter(3000, () => {
  console.log(`Server on localhost:3000`)
})

const connectionDB = dataBaseOnSQLAdapter<EmployeeAttributes>("mongodb://admin:password@localhost:27017")
const employeeDB = employeeDAO(connectionDB)
const manager = employeeManager(employeeDB, employeeEntity)

httpController(httpsServer, manager)

