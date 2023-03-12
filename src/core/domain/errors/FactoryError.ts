interface ProductThis<A> extends Error {
  datails: A
}

type ClassError<R> = new (details: R) => ProductThis<R>

function FactoryError<N extends string, M extends string, A>(name: N, message: M, details: A) {
  const product = function (details: A) {
    const error = new Error(message as string) as unknown as ProductThis<A>
    Object.setPrototypeOf(error, product.prototype)

    error.datails = details

    return error;
  }

  product.prototype = Object.create(Error.prototype, {
    name: { value: name, enumerable: false }
  }) as ErrorConstructor

  return product as any as ClassError<A>
}

export default FactoryError