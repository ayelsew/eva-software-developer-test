import DataBaseOnSQL, { Filter, UseCollectionReturn } from "@/core/ports/DataBaseNoSQL";
import { MongoClient, Db, ObjectId } from "mongodb"

const dataBaseOnSQLAdapter = <C extends { [name: string]: any }>(url: string): DataBaseOnSQL<C> => {
  const connection: MongoClient = new MongoClient(url);
  let database: Db | undefined;

  const connect = async () => {
    try {
      await connection.connect()
    } catch (error) {
      throw error
    }
  }

  const close = async (): Promise<void> => {
    await connection.close();
    return;
  };

  const setDBName = (name: string) => {
    database = connection.db(name)
  }

  const parseObjectId = (value: string) => {
    if (!value) throw new Error("id inválid");
    
    return new ObjectId(value)
  }

  const useCollection = (name: string): UseCollectionReturn<any> => {
    if (!database) throw new Error("Select the databse before use.")

    const collection = database.collection(name as string);

    return {
      async create(data) {
        const result = await collection.insertMany(data);

        return Object.keys(result.insertedIds).map((key) => result.insertedIds[Number(key)].toString());
      },
      async read(query) {
        const result = collection.find(query as Filter<any>)
        return result.toArray()
      },
      async update(query, data) {
        const result = await collection.updateMany(query as Filter<any>, { $set: data })

        return result.modifiedCount
      },
      async delete(query) {
        const result = await collection.deleteMany(query as Filter<any>)

        return result.deletedCount
      }
    }
  }

  return { connect, close, setDBName, useCollection, parseObjectId }
}

/*export default class DataBase<C extends Collections> implements IDataBaseNoSQL<C> {
   private connection: MongoClient
  private database?: Db;

  constructor(url: string) {
    this.connection = new MongoClient(url);
  }

  useCollection = <K extends keyof C>(name: K): UseCollectionReturn<C[K]> => {
    if (!this.database) throw new Error("Select the databse before use.")

    const collection = this.database.collection(name as string);

    return {
      async create(data) {
        const result = await collection.insertMany(data);

        return result.insertedCount === data.length;
      },
      async read(query) {
        const result = collection.find(query as Filter<any>)

        return result.toArray() as Promise<C[K]>
      },
      async update(query, data) {
        const result = await collection.updateMany(query as Filter<any>, data)

        return result.modifiedCount
      },
      async delete(query) {
        const result = await collection.deleteMany(query as Filter<any>)

        return result.deletedCount
      }
    }
  }

  connect = async () => {
    try {
      await this.connection.connect()
    } catch (error) {
      throw error
    }
  }

  setDBName = (name: string) => {
    this.database = this.connection.db(name)
  }

  close = async ():Promise<void> => {
    await this.connection.close();
    return;
  };
} */

export default dataBaseOnSQLAdapter
