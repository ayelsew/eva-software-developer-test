import ResourceDAO from "../ports/ResourceDAO";
import UseCase from "../ports/UseCase";
import { JourneyAttributes, JourneyEntity } from "../domain/entities/journeyEntity";
import employeeManagerError from "./errors/employeeManagerError";
import RegisterJourney from "../ports/RegisterJourney";


const journeyHandler = (
  journeyDAO: ResourceDAO<JourneyAttributes>,
  journeyEntity: JourneyEntity,
  registerJourney: RegisterJourney
): UseCase<JourneyAttributes> => {

  const insert = async (journeyData: JourneyAttributes): ReturnType<UseCase<any>["insert"]> => {
    let employeeId: any
    let journey: ReturnType<JourneyEntity["create"]>

    try {
      journey = journeyEntity.create(journeyData, "optional")
    } catch (error) {
      return employeeManagerError(error, 400)
    }

    try {
      employeeId = journeyDAO.parseObjectId(journeyData.employeeId)
    } catch (error) {
      return {
        status: 400,
        payload: { message: `The employee ID:${journeyData.employeeId} is invalid.` }
      }
    }

    const result = await journeyDAO.insert(journey.attributes)

    if (!result.length) {
      return {
        status: 500,
        payload: {
          message: "Error",
        }
      }
    }

    const actions = journey.attributes.actions.map((action) => ({
      ...action, scheduled: journey.attributes.scheduled, journeyId: result[0]
    }));

    (await Promise.all(await registerJourney.register(actions))).map((id, index) => {
      return journey.attributes.actions[index].id = id
    })

    await journeyDAO.update({ _id: journeyDAO.parseObjectId(result[0]) }, journey.attributes)

    return {
      status: 201,
      payload: {
        message: "The journey has been created",
        id: result[0]
      }
    }
  }

  const find = async (id: string): ReturnType<UseCase<any>["find"]> => {
    let employeeId: any

    try {
      employeeId = journeyDAO.parseObjectId(id)
    } catch (error) {
      return {
        status: 400,
        payload: { message: `The employee ID:${id} is invalid.` }
      }
    }

    const results = await journeyDAO.find({ employeeId: id })

    if (!results.length) {
      return {
        status: 404,
        payload: []
      }
    }

    const response = results.map(async (result) => {
      const actions = await Promise.all(result.actions.map( async ({ type, id, payload }) => {
        const status = await registerJourney.statusAction(type, id as string)
        return {
          ...(status || {}),
          payload
        }
      }))

      return {
        ...result,
        actions: actions
      } 
    })

    return {
      status: 200,
      payload: await Promise.all(response)
    }

  }

  const update = async (journeyId: string, journeyData: Partial<JourneyAttributes>): ReturnType<UseCase<any>["update"]> => {
    let _id: any

    try {
      _id = journeyDAO.parseObjectId(journeyId)
    } catch (error) {
      return {
        status: 400,
        payload: { message: `The journey ID:${journeyId} is invalid.` }
      }
    }

    await journeyDAO.update({ _id }, journeyData)

    return {
      status: 204,
      payload: {
        message: "The user has been updated"
      }
    }
  }

  const remove = async (id: string): ReturnType<UseCase<any>["remove"]> => {
    let journeyId: any

    try {
      journeyId = journeyDAO.parseObjectId(id)
    } catch (error) {
      return {
        status: 400,
        payload: { message: `The employee ID:${id} is invalid.` }
      }
    }

    const resultFind = await journeyDAO.find({ _id: journeyId})

    if (!resultFind.length) {
      return {
        status: 404,
        payload: {
          message: `Journey not found for ${id}`,
        }
      }
    }

    const deletedActions = resultFind[0].actions.map(({ type, id }) => {
      return registerJourney.delete(type, id as string)
    })
    
    await Promise.all(deletedActions)

    await journeyDAO.remove({ _id: journeyId })

    return { status: 204 }
  }

  return {
    insert,
    update,
    find,
    remove
  }
}

export default journeyHandler
