import { EmployeeAttributes } from "@/core/domain/entities/employeeEntity";
import DataBaseNoSQL, { Filter } from "@/core/ports/DataBaseNoSQL";
import EmployeeDAO from "@/core/ports/EmployeeDAO";

function employeeDAO(database: DataBaseNoSQL<EmployeeAttributes>): EmployeeDAO<EmployeeAttributes> {
  database.setDBName("employee")
  database.connect()

  const insert = async (data: EmployeeAttributes) => {
    const resut = await database.useCollection("employee").create([{ ...data, createdAt: Date.now(), deletedAt: undefined }]);
    return resut;
  }
  const find = async (filter: Filter<EmployeeAttributes>, deleted?: boolean) => {
    const resut = await database.useCollection("employee").read(deleted ? filter : { ...filter, deletedAt: undefined });
    return resut;
  }
  const update = async (filter: Filter<EmployeeAttributes>, data: Partial<EmployeeAttributes>) => {
    const resut = await database.useCollection("employee").update({ ...filter, deletedAt: undefined }, data);
    return resut;
  }
  const remove = async (filter: Filter<EmployeeAttributes>) => {
    const resut = await database.useCollection("employee").delete(filter);
    return resut;
  }

  const parseObjectId = database.parseObjectId

  return { insert, find, update, remove, parseObjectId }
}

export default employeeDAO
