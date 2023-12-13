export function getUsers(req, res) {
    const searchValue = req.query.search
    res.json([
        {
            id: 1,
            name: searchValue,
            email: 'dzd@gmail.com'
        }
    ])
}

export function updateUser(req, res, next) {
    const id = +req.params.userId
    const body = req.body
    if (!isNaN(id)) {
        res.json({
            id: id,
            ...body
        })
        return
    }
    next(new NotFoundError('Utilisateur non trouvée'))
}