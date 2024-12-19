import { z } from 'zod'
import isMongoId from 'validator/lib/isMongoId'
import { BadRequestError } from '../errors/bad-request'

export function isIdNumberMiddleware(paramId: string) {
    return function(req, res, next) {
        try {
            if (isMongoId(req.params[paramId])) {
                next()
            }
            else {
                throw new BadRequestError()
            }
        }
        catch (err: any) {
            next(err)
        }
    }
}