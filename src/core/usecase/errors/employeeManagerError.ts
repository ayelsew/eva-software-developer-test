import ValidationError from "@/core/domain/errors/ValidationError"

const employeeManagerError = (error: unknown, status: number) => {
  if (error instanceof ValidationError) {
    return {
      status: status,
      payload: {
        message: error.message,
        errors: error.datails
      }
    }
  }

  console.error(error)
  return { status: 500 }
}

export default employeeManagerError