import { User } from "../users/users.model.js"

export function getMe(req, res, next) {
    res.json(req.user)
}

export async function updateMe(req, res, next) {
    try {
        const { name, email, password } = req.body
        const id = req.user._id
        const userModified = await User.findByIdAndUpdate(id, {
            name,
            email,
            password
        }, {
            new: true
        })
        userModified.password = undefined
        res.json(userModified)
    }
    catch (err) {
        next(err)
    }
}