import { User } from "../api/users/users.model.js";
import { NotAuthorizedError } from "../errors/not-authorized.js";
import jwt from 'jsonwebtoken'

export async function authMiddleware(req, res, next) {
    try {
        const token = req.headers['x-access-token']
        if (!token) {
            throw new Error('Token not found')
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN)
        req.user = await User.findById(decoded.userId)
        next()
    }
    catch (err) {
        next(new NotAuthorizedError(err.message))
    }
}