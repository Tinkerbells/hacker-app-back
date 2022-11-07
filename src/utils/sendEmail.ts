import nodemailer from 'nodemailer'
import { config } from '../config/config'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.mail.address,
        pass: config.mail.password 
    },
    tls: {
        rejectUnauthorized: false
    }
})

export default transporter
