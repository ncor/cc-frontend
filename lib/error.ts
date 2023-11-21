export type PlainError = {
    error: string,
    code: string
};

export class CustomError extends Error {
    constructor(
        public code: string,
        message: string
    ) {
        super(message);
    }
}
