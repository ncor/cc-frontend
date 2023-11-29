export type EndpointResponse<T> = {
    data?: T,
    error?: {
        message: string,
        code: string
    }
}
