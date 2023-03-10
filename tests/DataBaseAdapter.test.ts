jest.mock("mongodb")
import { MongoClient } from "mongodb"
import DataBase from "@/adapters/DataBaseAdapter"
import { UseCollectionReturn } from "@/IDataBase"

describe("Test adapter DataBase", () => {
  beforeEach(() => {
    jest.mocked(MongoClient).mockClear()
  })

  test("Can be initialized", () => {

    const url = "mongodb://test"
    new DataBase(url)

    expect(MongoClient).toHaveBeenCalledTimes(1)
    expect(MongoClient).toHaveBeenCalledWith(url)
  });

  test("Can connect to database", () => {
    const connect = jest.fn()
    let database: DataBase<any>;

    jest.mocked(MongoClient).mockReturnValue({ connect } as unknown as MongoClient)

    database = new DataBase("mongodb://test")
    database.connect()

    expect(connect).toHaveBeenCalledTimes(1)
  });

  test("Throw execption when connection fail", async () => {
    const connect = jest.fn(() => { throw new Error("Connection error") })
    let database: DataBase<any>;

    jest.mocked(MongoClient).mockReturnValue({ connect } as unknown as MongoClient)

    database = new DataBase("mongodb://test")

    await expect(database.connect).rejects.toThrow(new Error("Connection error"))
  });

  test("Set database name", () => {
    const db = jest.fn()
    let database: DataBase<any>;

    jest.mocked(MongoClient).mockReturnValue({ db } as unknown as MongoClient)

    database = new DataBase("mongodb://test")

    database.setDBName("testing")

    expect(db).toHaveBeenCalledTimes(1)
    expect(db).toHaveBeenCalledWith("testing")
  })

  test("Throw execption when collection has no db defined", () => {
    const db = jest.fn(() => undefined)
    let database: DataBase<any>;

    jest.mocked(MongoClient).mockReturnValue({ db } as unknown as MongoClient)

    database = new DataBase("mongodb://test")
    database.setDBName("teste")

    expect(database.useCollection).toThrow(new Error("Select the databse before use."))
  })

  test("useCollection recives name of schema", () => {
    const collection = jest.fn()
    let database: DataBase<any>;

    jest.mocked(MongoClient).mockReturnValue({ db: jest.fn(() => ({ collection })) } as unknown as MongoClient)

    database = new DataBase("mongodb://test")
    database.setDBName("teste")
    database.useCollection("collection_test")

    expect(collection).toHaveBeenCalledTimes(1)
    expect(collection).toHaveBeenCalledWith("collection_test")
  })

  test("Connection could be closed", async () => {
    const close = jest.fn()
    let database: DataBase<any>;

    jest.mocked(MongoClient).mockReturnValue({ close } as unknown as MongoClient)

    database = new DataBase("mongodb://test")

    await expect(database.close()).resolves.toBeUndefined()
    expect(close).toHaveBeenCalledTimes(1)
    expect(close).toHaveBeenCalledWith()
  })

  describe("Test CRUD returned from useCollection()", () => {
    const insertMany = jest.fn((arr: []) => Promise.resolve({ insertedCount: arr.length }))
    const find = jest.fn(() => ({ toArray: jest.fn(() => [{}, {}]) }))
    const updateMany = jest.fn(() => Promise.resolve({ modifiedCount: 4 }))
    const deleteMany = jest.fn(() => Promise.resolve({ deletedCount: 1 }))
    let database: DataBase<any>;
    let collection: UseCollectionReturn<any>;

    jest.mocked(MongoClient).mockReturnValue({
      db: jest.fn(() => ({
        collection: jest.fn(() => ({
          insertMany,
          find,
          updateMany,
          deleteMany
        }))
      }))
    } as unknown as MongoClient)

    database = new DataBase("mongodb://test")
    database.setDBName("teste")

    test("Create", async () => {

      collection = database.useCollection("collection_test")

      await expect(collection.create([{}])).resolves.toBeTruthy()
      expect(insertMany).toHaveBeenCalledWith([{}])
      expect(insertMany).toHaveBeenCalledTimes(1)
    })

    test("Read", async () => {

      collection = database.useCollection("collection_test")

      await expect(collection.read({ id: "test" })).resolves.toEqual(expect.arrayContaining([{}, {}]))
      expect(find).toHaveBeenCalledWith({ id: "test" })
      expect(find).toHaveBeenCalledTimes(1)
    })

    test("Update", async () => {

      collection = database.useCollection("collection_test")

      await expect(collection.update({ id: "test" }, { msg: "jest" })).resolves.toBe(4)
      expect(updateMany).toHaveBeenCalledWith({ id: "test" }, { msg: "jest" })
      expect(updateMany).toHaveBeenCalledTimes(1)
    })

    test("Delete", async () => {

      collection = database.useCollection("collection_test")

      await expect(collection.delete({ id: "test123" })).resolves.toBe(1)
      expect(deleteMany).toHaveBeenCalledWith({ id: "test123" })
      expect(deleteMany).toHaveBeenCalledTimes(1)
    })
  })
})