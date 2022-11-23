import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import User from '../models/User';
import hashPassword from '../utils/hashPassword';
import checkPassword from '../utils/checkPassword';
import generateAccessToken from '../utils/generateAccessToken';
import transporter from '../utils/sendEmail';

const createUser = (req: Request, res: Response, next: NextFunction) => {
    const { userName, email } = req.body;
    const password = hashPassword(req.body.password);
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        userName,
        email,
        password,
        activationCode: crypto.randomInt(100000, 999999),
        isVerifed: false
    });
    const mailOptions = {
        from: `"Подтвердите почту" <daniel.kasatkin.work@gmail.com`,
        to: user.email,
        subject: 'Hacker app - активация аккаунта',
        html: `<h2> ${user.userName}! Спасибо за регистрацию в мобильной игре Hacker</h2>
               <h4>Ваш код активации</h4>
               <h2>${user.activationCode}</h2>`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent');
        }
    });

    return user
        .save()
        .then((user) => res.status(201).json({ user }))
        .catch((error) => res.status(500).json({ error }));
};
const verifyUser = (req: Request, res: Response, next: NextFunction) => {
    const activationCode = req.body.activationCode;
    return User.findOne({ activationCode }).then((user) => {
        if (user) {
            user.activationCode = '';
            user.isVerifed = true;
            const token = generateAccessToken(user.id);
            return user
                .save()
                .then((user) => res.status(201).json({ user, token, message: 'User is verified' }))
                .catch((error) => res.status(500).json({ error }));
        } else {
            console.log(user);
            return res.status(400).json({ message: 'Wrong activation code!' });
        }
    });
};

const loginUser = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    return User.findOne({ email }).then((user) => {
        if (user) {
            const validPassword = checkPassword(user, password);
            if (validPassword) {
                const token = generateAccessToken(user.id);
                return res.status(201).json({ token });
            } else {
                return res.status(400).json({ message: 'Wrong password!' });
            }
        } else {
            return res.status(400).json({ message: 'User is not found!' });
        }
    });
};

const updateUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    return User.findById(userId)
        .then((user) => {
            if (user) {
                req.body.password = hashPassword(req.body.password);
                user.set(req.body);
                return user
                    .save()
                    .then((user) => res.status(201).json({ user }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    return User.findByIdAndDelete(userId)
        .then((user) => (user ? res.status(201).json({ user, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const getUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    console.log(userId);
    return User.findById(userId)
        .then((user) => (user ? res.status(201).json({ user }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const getUserList = (req: Request, res: Response, next: NextFunction) => {
    return User.find()
        .then((users) => res.status(200).json({ users }))
        .catch((error) => res.status(500).json({ error }));
};

export default {
    createUser,
    verifyUser,
    deleteUser,
    loginUser,
    updateUser,
    getUser,
    getUserList
};
