import { ForbiddenError } from "../errors/forbidden.js"

export function roleMiddleware(role) {
    return function(req, res, next) {
        try {
            const user = req.user
            if (!user) {
                throw new Error('Not Auth')
            }
            if (user.role == role) {
                next()
            }
            else {
                throw new Error('Not Role')
            }
        }
        catch (err) {
            next(new ForbiddenError(err.message))
        }
    }
}