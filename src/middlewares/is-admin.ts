import { IUser } from "../api/users/users.model";
import { ForbiddenError } from "../errors/forbidden";

export async function isAdminMiddleware(req, _, next) {
    if (!req.user) {
        console.log('[Warning] Please, add authMiddleware before')
        return
    }
    try {
        const user = req.user as IUser
        if (user.role != 'admin') {
            throw new ForbiddenError()
        }
        next()
    }
    catch (err) {
        next(err)
    }
}