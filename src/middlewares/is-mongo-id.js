import pkg from 'validator';
import { BadRequestError } from '../errors/bad-request';

const { isMongoId } = pkg;

export function isMongoIdMiddleware(req, res, next) {
    const id = req.params.userId
    if (!isMongoId(id)) {
        next(new BadRequestError('Id non valide'))
        return
    }
    next()
}