import ValidationError from "./errors/ValidationError"
import { Validator } from "./factoryValidation"

type Attributes = { [name: string]: any }
type Update<A extends Attributes> = (data: Partial<A>) => {
  attributes: A
  update: Update<A>
  validate: () => ReturnType<Validator>
}
type CreateEntity<A extends Attributes> = (data: A, presence?: "required" | "optional") => {
  attributes: A
  update: Update<A>
  validate: () => ReturnType<Validator>
}
type FactoryEntity = <A extends Attributes>(attributes: A, validator: Validator) => {
  create: CreateEntity<A>
  validate(data: Partial<A>, presence?: "required" | "optional"): ReturnType<Validator>
}

const factoryEntity: FactoryEntity = (attributes, validator) => {
  return {
    create(data, presence) {
      let validationResult: ReturnType<typeof validator> = { errors: [], success: true }

      validationResult = validator(data, presence);
      if (!validationResult.success) throw new ValidationError(validationResult.errors);


      return ({
        attributes: data,
        validate() {
          return validator(this.attributes)
        },
        update(data) {
          this.attributes = {
            ...this.attributes,
            ...data
          }
          return this
        }
      })
    },
    validate(data, presence) {
      return validator(data, presence)
    }
  }
}

export default factoryEntity
