import { EmployeeAttributes } from "@/core/domain/entities/employeeEntity";
import DataBaseNoSQL, { Filter } from "@/core/ports/DataBaseNoSQL";
import ResourceDAO from "@/core/ports/ResourceDAO";

function employeeDAO(database: DataBaseNoSQL<EmployeeAttributes>): ResourceDAO<EmployeeAttributes> {
  const COLLECTION = "employee"

  const insert = async (data: EmployeeAttributes) => {
    const resut = await database.useCollection(COLLECTION).create([{ ...data, createdAt: Date.now(), deletedAt: undefined }]);
    return resut;
  }
  const find = async (filter: Filter<EmployeeAttributes>, deleted?: boolean) => {
    const resut = await database.useCollection(COLLECTION).read(deleted ? filter : { ...filter, deletedAt: undefined });
    return resut;
  }
  const update = async (filter: Filter<EmployeeAttributes>, data: Partial<EmployeeAttributes>) => {
    const resut = await database.useCollection(COLLECTION).update({ ...filter, deletedAt: undefined }, data);
    return resut;
  }
  const remove = async (filter: Filter<EmployeeAttributes>) => {
    const resut = await database.useCollection(COLLECTION).delete(filter);
    return resut;
  }

  const parseObjectId = database.parseObjectId

  return { insert, find, update, remove, parseObjectId }
}

export default employeeDAO
