import { JourneyAttributes } from "@/core/domain/entities/journeyEntity";
import DataBaseNoSQL, { Filter } from "@/core/ports/DataBaseNoSQL";
import ResourceDAO from "@/core/ports/ResourceDAO";

function journeyDAO(database: DataBaseNoSQL<JourneyAttributes>): ResourceDAO<JourneyAttributes> {
  const COLLECTION = "journey"

  const insert = async (data: JourneyAttributes) => {
    const resut = await database.useCollection(COLLECTION).create([{ ...data, finishedAt: undefined, createdAt: Date.now() }]);
    return resut;
  }
  const find = async (filter: Filter<JourneyAttributes>, deleted?: boolean) => {
    const resut = await database.useCollection(COLLECTION).read(deleted ? filter : { ...filter });
    return resut;
  }
  const update = async (filter: Filter<JourneyAttributes>, data: Partial<JourneyAttributes>) => {
    const resut = await database.useCollection(COLLECTION).update({ ...filter }, data);
    return resut;
  }
  const remove = async (filter: Filter<JourneyAttributes>) => {
    const resut = await database.useCollection(COLLECTION).delete(filter);
    return resut;
  }

  const parseObjectId = database.parseObjectId

  return { insert, find, update, remove, parseObjectId }
}

export default journeyDAO
