import { User } from "../api/users/users.model";
import { NotAuthorizedError } from "../errors/not-authorized";
import jwt, { decode } from 'jsonwebtoken'

interface JwtPayload {
    userId: string
}

export async function authMiddleware(req, _, next) {
    try {
        const token = req.headers['x-access-token']
        if (!token) {
            throw 'token not found'
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN as string) as JwtPayload
        req.user = await User.findById(decoded.userId).select('-password')
        next()
    }
    catch (message: any) {
        next(new NotAuthorizedError(message))
    }
}