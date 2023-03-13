import factoryValidation from "../factoryValidation"

export default factoryValidation((test) => ({
  employeeId: test.string().required(),
  scheduled: test.timestamp().required(),
  actions: test.array(
    test.object({
      type: test.valid("SEND_WHATSAPP").required(),
      payload: test.object({
        message: test.string().required(),
      })
    }),
    test.object({
      type: test.valid("SEND_EMAIL").required(),
      payload: test.object({
        from: test.string().required(),
        to: test.string().required(),
        body: test.string().required(),
        attachement: test.string(),
      })
    })
  )
}))
