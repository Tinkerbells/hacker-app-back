import Joi, { ObjectSchema } from 'joi'
import { NextFunction, Request, Response } from 'express'
import { IUser } from '../models/User'
import Logging from '../library/Logging'

export const ValidateJoi = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body)

            next()
        } catch (error) {
            Logging.error(error)

            return res.status(422).json({ error })
        }
    }
}

export const Schemas = {
    user: {
        create: Joi.object<IUser>({
            userName: Joi.string().required().label('Username'),
            email: Joi.string()
                .email({
                    minDomainSegments: 2
                })
                .label('Email'),
            password: Joi.string().required().min(6).label('Password'),
            level: Joi.number(),
            exp: Joi.number(),
            money: Joi.number()
        }),
        update: Joi.object<IUser>({
            userName: Joi.string().required().label('Username'),
            email: Joi.string()
                .email({
                    minDomainSegments: 2
                })
                .label('Email'),
            password: Joi.string().required().min(6).label('Password'),
            level: Joi.number(),
            exp: Joi.number(),
            money: Joi.number()
        }),
        login: Joi.object<IUser>({
            email: Joi.string()
                .email({
                    minDomainSegments: 2
                })
                .label('Email'),
            password: Joi.string().required().min(6).label('Password')
        })
    }
}
