export type ServerActionResponse<T> = {
    data?: T,
    error?: {
        name: string,
        message: string
    }
}
