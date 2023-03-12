type Validators<C extends Validation = any> = {
  min(value: number): Validators<C>
  max(value: number): Validators<C>
  required(): Validators<C>
} & C

interface ValidateReturn {
  success: boolean
  errors: Array<{ key: string, message: string }>
}

export default interface Validation {
  [name: string]: any
  _acumulator: any
  _schema(): Validators<Validation>
  validate(data: any, schema: Record<string, Validators<Validation>>, presence?: "required" | "optional"): ValidateReturn
  string(): Validators<Validation>
  email(): Validators<Validation>
  integer(): Validators<Validation>
  timestamp(): Validators<Validation>
  boolean(): Validators<Validation>
  forbidden(): Validators<Validation>
  phone(): Validators<Validation>
}
