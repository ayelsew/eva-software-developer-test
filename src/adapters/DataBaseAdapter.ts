import IDataBaseNoSQL, { Collections, Filter, UseCollectionReturn } from "@/IDataBase";
import { MongoClient, Db } from "mongodb"

export default class DataBase<C extends Collections> implements IDataBaseNoSQL<C> {
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
}
