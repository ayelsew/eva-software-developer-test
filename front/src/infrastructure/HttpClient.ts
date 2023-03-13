type ResCliente<B extends any> = Promise<{
    status: number,
    body: B
}>

interface HttpClient {
    post(path: string, payload: any): ResCliente<any>
    patch(path: string, payload: any): ResCliente<any>
    get(path: string): ResCliente<any>
    delete(path: string): ResCliente<any>
}

export default HttpClient;
