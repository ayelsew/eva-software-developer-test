import factoryValidation from "../factoryValidation"

export default factoryValidation((test) => ({
    id: test.forbidden(),
    name: test.string(),
    email: test.email(),
    phone: test.phone(),
    birthday: test.timestamp(),
    createdAt: test.forbidden(),
    deletedAt: test.forbidden(),
    active: test.boolean()
}))
