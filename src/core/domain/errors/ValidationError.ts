import Validation from "@/core/ports/Validation"
import FactoryError from "./FactoryError"



export default FactoryError(
  "ValidationError",
  "There are some errors with payload",
  [] as ReturnType<Validation["validate"]>["errors"]
)



