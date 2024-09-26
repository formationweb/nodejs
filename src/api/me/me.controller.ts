import { userSchema } from "../users/users.schema";
import { UserModel } from "../users/users.model";

export function getMe(req, res, next) {
    res.json(req.user)
}

export async function updateMe(req, res, next) {
    try {
        userSchema.partial().parse(req.body);
        const { name, email, password } = req.body
        const id = req.user._id
        const userModified = await UserModel.findByIdAndUpdate(id, {
            name, 
            email, 
            password
        }, {
            new: true,
            select: '-password'
        })
        res.json(userModified)
    }
    catch (err) {
        next(err)
    }
}