export class NotFoundError extends Error {
    status = 404

    constructor(message: string) {
        super('Not Found: ' + message)
    }
}