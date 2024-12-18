import { z } from 'zod'
import { BadRequestError } from '../errors/bad-request'

export function isIdNumberMiddleware(paramId: string) {
    return function(req, res, next) {
        try {
            z.number().parse(+req.params[paramId])
            next()
        }
        catch (err: any) {
            next(new BadRequestError())
        }
    }
}