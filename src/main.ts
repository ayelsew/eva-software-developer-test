process.env.TZ = "America/Sao_Paulo";

import employeeEntity, { EmployeeAttributes } from "./core/domain/entities/employeeEntity";
import employeeManager from "./core/usecase/employeeManager";
import bullQMAdapter from "./infrastructure/adapters/bullQMAdapter";
import dataBaseOnSQLAdapter from "./infrastructure/adapters/DataBaseAdapter";
import employeeDAO from "./infrastructure/employeeDAO";
import httpServerAdapter from "./interfaces/adapters/httpServerAdapter";
import eventsController from "./interfaces/eventsController";
import employeeController from "./interfaces/employeeController";
import journeyController from "./interfaces/journeyController";
import journeyHandler from "./core/usecase/journeyHandler";
import journeyEntity, { JourneyAttributes } from "./core/domain/entities/journeyEntity";
import DataBaseNoSQL from "./core/ports/DataBaseNoSQL";
import journeyDAO from "./infrastructure/journeyDAO";

const httpServer = httpServerAdapter(3000, () => {
  console.log(`Server on localhost:3000`)
})

const registerJourney = bullQMAdapter("redis://localhost:6379")

const connectionDB = dataBaseOnSQLAdapter("mongodb://admin:password@localhost:27017")
connectionDB.connect()
connectionDB.setDBName("eva")

const employeeDB = employeeDAO(connectionDB as DataBaseNoSQL<EmployeeAttributes>)
const manager = employeeManager(employeeDB, employeeEntity)

const journeyDB = journeyDAO(connectionDB as  DataBaseNoSQL<JourneyAttributes>)

const JourneyUseCase = journeyHandler(journeyDB, journeyEntity, registerJourney)

journeyController(httpServer, JourneyUseCase)
employeeController(httpServer, manager)
eventsController(registerJourney, journeyDB)

