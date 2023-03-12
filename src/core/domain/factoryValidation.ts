import validation from "@/infrastructure/adapters/ValidationAdapter"

type Schema = Record<string, ReturnType<typeof validation["string"]>>
export type Validator = <D extends Record<string, any>>(data: D, presence?: "required" | "optional") => ReturnType<typeof validation["validate"]>
type CallBackSchema<S extends Schema> = (validators: typeof validation) => S 
type FactoryValidation = <S extends Schema>(schema: CallBackSchema<S>) => Validator

const factoryValidation: FactoryValidation = (callback) => {
  return (data, presence) => validation.validate(data, callback(validation), presence)
}

export default factoryValidation
