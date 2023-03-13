import RegisterJourney, { ActionSendEmail, ActionSendWhatsapp } from "@/core/ports/RegisterJourney"
import Queue from "bull"


const bullQMAdapter = (url: string): RegisterJourney => {
  const whatsappQueue = new Queue<ActionSendWhatsapp["payload"]>("SEND_WHATSAPP", url)
  const emailQueue = new Queue<ActionSendEmail["payload"]>("SEND_EMAIL", url)

  whatsappQueue.process(function (job, done) {
    done(undefined, "Whatsapp enviado")
  })

  emailQueue.process(function (job, done) {
    done(undefined, "Email enviado")
  })

  const parseCron = (timestamp: number) => {
    const date = new Date(timestamp);
    const cron = `${date.getMinutes()} ${date.getHours()} ${date.getDate()} ${date.getMonth() + 1} *`
    console.log(`${timestamp} => `, cron)
    return cron
  }

  /* emailQueue.empty()
  whatsappQueue.empty() */

  emailQueue.count().then((value) => console.log("Email queue: ", value))
  whatsappQueue.count().then((value) => console.log("Whatsapp queue: ", value))

  return {
    watchActions(status, callback) {
      emailQueue.on(status, ({ id, failedReason, finishedOn, returnvalue, queue, data }) => callback({
        id,
        result: failedReason || returnvalue,
        completedAt: finishedOn,
        type: queue.name,
        journeyId: data.journeyId
      }))
      whatsappQueue.on(status, ({ id, failedReason, finishedOn, returnvalue, queue, data }) => callback({
        id,
        result: failedReason || returnvalue,
        completedAt: finishedOn,
        type: queue.name,
        journeyId: data.journeyId
      }))
    },
    async register(jobs) {
      return jobs.map(async ({ type, payload, scheduled, journeyId }) => {
        const data = {...payload, journeyId}
        const options = { repeat: { limit: 1, cron: parseCron(scheduled) } }

        switch (type) {
          case "SEND_EMAIL":
            return (await emailQueue.add(data, options)).id as (string | number)

          case "SEND_WHATSAPP":
            return (await whatsappQueue.add(data, options)).id as (string | number)

          default:
            return undefined
        }
      })
    },
    async delete(type, id) {
      switch (type) {
        case "SEND_EMAIL":
          return (await emailQueue.getJob(id))?.remove()

        case "SEND_WHATSAPP":
          return (await whatsappQueue.getJob(id))?.remove()

        default:
          return undefined
      }
    },
    async statusAction(type, id) {
      switch (type) {
        case "SEND_EMAIL":
          return await emailQueue.getJob(id).then((job) => {
            if (job === undefined || job === null) return;
            return {
              id,
              result: job?.failedReason || job?.returnvalue,
              completedAt: job.finishedOn,
              type: job.queue.name,
              journeyId: job.data.journeyId
            }
          })

        case "SEND_WHATSAPP":
          return await whatsappQueue.getJob(id).then((job) => {
            if (job === undefined || job === null) return;
            return {
              id,
              result: job?.failedReason || job?.returnvalue,
              completedAt: job.finishedOn,
              type: job.queue.name,
              journeyId: job.data.journeyId
            }
          })

        default:
          return undefined
      }
    }
  }

}

export default bullQMAdapter
