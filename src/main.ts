import DataBase from "./adapters/DataBaseAdapter"
import HttpServer from "./adapters/HttpServerAdapter"
import HttpController from "./interfaces/HttpController"

/* interface Employee {
  id: string
  name: string
  email: string
  phone: string
  birthday: string
  createdAt: number
  deletedAt: number
  active: boolean
}

interface Action {
  name: "SEND_EMAIL" | "SEND_WHATSAPP" | "ENABLE_ON_ACTIVE_DIRECTORY"
} */
const database = new DataBase("mongodb://admin:password@localhost:27017")

database.connect().then(() => {
  console.log("Database connected!")
})

/* const PORT = Number(process.env.PORT || 3000);

const httpServer = new HttpServer(PORT, () => console.info(`Server on localhost:${PORT}`));
new HttpController(httpServer); */

