import { UserModel } from "../api/users/users.model"
import { NotAuthorizedError } from "../errors/not-authorized"
import jwt from 'jsonwebtoken'

type JwtDecoded = {
    userId: string
}

export async function authMiddleware(req, _, next) {
    try {
        const token = req.headers['x-access-token']
        if (!token) {
            throw 'token not found'
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN as string) as JwtDecoded
        req.user = await UserModel.findById(decoded.userId) // amélioration possible: faire un cache (avec redis par exemple)
        req.user.password = undefined
        next()
    }
    catch (message) {
        next(new NotAuthorizedError(message))
    }
}