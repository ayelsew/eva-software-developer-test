import EmployeeDAO from "../ports/EmployeeDAO";
import { EmployeeAttributes, EmployeeEntity } from "../domain/entities/employeeEntity";
import employeeManagerError from "./errors/employeeManagerError";

type Response = Promise<{ payload?: any, status?: number }>
type EmployeeManager = <EA extends EmployeeAttributes>(dao: EmployeeDAO<EmployeeAttributes>, entity: EmployeeEntity) => {
  insert(data: EA): Response
  find(id: string): Response
  update(id: string, data: EA): Response
  remove(id: string): Response
}

const employeeManager: EmployeeManager = (employeeDAO, employeeEntity) => {

  const insert = async (employeeData: EmployeeAttributes): Response => {
    let employee: ReturnType<EmployeeEntity["create"]>

    try {
      employee = employeeEntity.create(employeeData)
    } catch (error) {
      return employeeManagerError(error, 400)
    }

    if ((await employeeDAO.find({ email: employee.attributes.email }, true)).length) {
      return { status: 409, payload: { message: "User aready exist" } }
    }

    const insertResult = await employeeDAO.insert(employee.attributes)

    if (!insertResult.length) return {
      status: 500,
      payload: {
        message: "The user has been created"
      }
    }

    return {
      status: 201,
      payload: {
        message: "The user has been created",
        user: {
          _id: insertResult[0],
          ...employee.attributes
        }
      }
    }
  }

  const find = async (employeeId: string): Response => {
    if (employeeId) {
      let _id: any

      try {
        _id = employeeDAO.parseObjectId(employeeId)
      } catch (error) {
        return {
          status: 400,
          payload: { message: `The ID:${employeeId} is invalid.` }
        }
      }

      const records = await employeeDAO.find({ _id });

      if (!records.length) return { status: 404, payload: [] }

      return {
        status: 200,
        payload: records[0]
      }
    }

    const records = await employeeDAO.find({});

    if (!records.length) {
      return { status: 404, payload: [] }
    }

    return {
      status: 200,
      payload: records
    }

  }

  const update = async (employeeId: string, employeeData: EmployeeAttributes): Response => {
    let employee: ReturnType<EmployeeEntity["create"]>
    let _id: any

    try {
      _id = employeeDAO.parseObjectId(employeeId)
    } catch (error) {
      return {
        status: 400,
        payload: { message: `The ID:${employeeId} is invalid.` }
      }
    }

    try {
      employee = employeeEntity.create(employeeData, "optional")
    } catch (error) {
      return employeeManagerError(error, 400)
    }

    const records = await employeeDAO.find({ _id });

    if (!records.length) return { status: 404, payload: { message: "User not found" } }
    
    employee.update(records[0]).update(employeeData)

    const insertResult = await employeeDAO.update({ _id }, employee.attributes)

    if (!insertResult) return {
      status: 304,
    }

    return {
      status: 204,
      payload: {
        message: "The user has been updated"
      }
    }
  }

  const remove = async (employeeId: string): Response => {
    let _id: any

    try {
      _id = employeeDAO.parseObjectId(employeeId)
    } catch (error) {
      return {
        status: 400,
        payload: { message: `The ID:${employeeId} is invalid.` }
      }
    }


    const records = await employeeDAO.update({ _id, deletedAt: undefined }, { deletedAt: Date.now() });

    if (records) return {
      status: 204,
    }


    return { status: 404, payload: { message: "User not found" } }
  }

  return {
    insert,
    update,
    find,
    remove
  }
}

export type EmployeeManagerReturn = ReturnType<EmployeeManager>
export default employeeManager
