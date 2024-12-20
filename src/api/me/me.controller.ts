import { User } from "../users/users.model"
import { userSchemaDto } from "../users/users.schema"

export function getMe(req, res) {
    res.json(req.user)
}

export async function updateMe(req, res, next) {
    try {
        const data = userSchemaDto.partial().parse(req.body)
        const id = req.user._id
        const userModified = await User.findByIdAndUpdate(id, data, {
            new: true,
            select: '-password'
        })
        res.json(userModified)
    }
    catch (err) {
        next(err)
    }
}