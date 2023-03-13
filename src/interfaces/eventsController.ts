import { JourneyAttributes, JourneyEntity } from "@/core/domain/entities/journeyEntity";
import RegisterJourney from "@/core/ports/RegisterJourney";
import ResourceDAO from "@/core/ports/ResourceDAO";

export default function eventsController(
  registerJourney: RegisterJourney,
  journeyDAO: ResourceDAO<JourneyAttributes>,
) {
  registerJourney.watchActions("completed", async (watchAction) => {
    console.log(watchAction)
    const _id = journeyDAO.parseObjectId(watchAction.journeyId)
    const [jounery] = await journeyDAO.find({ _id })

    jounery.actions = jounery.actions.map((action) => {
      if (watchAction.type === action.type && watchAction.id === action.id){
        jounery.finishedAt = watchAction.completedAt
        return { ...action, result: watchAction.result }
      }

      return action
    })

    await journeyDAO.update({ _id }, jounery)

    console.log("Completed", watchAction)
  })
  registerJourney.watchActions("failed", async (watchAction) => {
    const _id = journeyDAO.parseObjectId(watchAction.journeyId)
    const [jounery] = await journeyDAO.find({ _id })

    jounery.actions = jounery.actions.map((action) => {
      if (watchAction.type === action.type && watchAction.id === action.id)
        return { ...action, result: watchAction.result }

      return action
    })

    await journeyDAO.update({ _id }, jounery)

    console.log("Failed", watchAction)
  })
}
