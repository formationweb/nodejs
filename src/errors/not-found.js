export class NotFoundError extends Error {
    status = 404

    constructor(message) {
        super('Not Found:' + message)
    }
}