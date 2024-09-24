import { Router } from 'express'

const router = Router()

router.get('/', (req, res ,next) => {
    res.json([
        {
            id: 1,
            name: 'ana',
            email: 'ana@gmail.com'
        }
    ])
})

router.get('/:userId', (req, res, next) => {
    const testValue = req.query.test
    console.log(testValue)
    const id = req.params.userId
    res.json({
        id, // équivalent à id: id
        name: 'ana',
        email: 'ana@gmail.com'
    })
})

export default router