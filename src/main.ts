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

const HTTP_PORT = Number(process.env.HTTP)
const REDIS = String(process.env.REDIS)
const MONGO = String(process.env.MONGO)
const MONGODB = String(process.env.MONGODB)

const httpServer = httpServerAdapter(HTTP_PORT, () => {
  console.log(`Server on localhost:${HTTP_PORT}`)
})

const registerJourney = bullQMAdapter(REDIS)

const connectionDB = dataBaseOnSQLAdapter(MONGO)
connectionDB.connect()
connectionDB.setDBName(MONGODB)

const employeeDB = employeeDAO(connectionDB as DataBaseNoSQL<EmployeeAttributes>)
const manager = employeeManager(employeeDB, employeeEntity)

const journeyDB = journeyDAO(connectionDB as  DataBaseNoSQL<JourneyAttributes>)

const JourneyUseCase = journeyHandler(journeyDB, journeyEntity, registerJourney)

journeyController(httpServer, JourneyUseCase)
employeeController(httpServer, manager)
eventsController(registerJourney, journeyDB)

