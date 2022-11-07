import dotenv from 'dotenv'

dotenv.config()

const MONGO_USERNAME = process.env.MONGO_USERNAME || ''
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || ''
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.tiu5pif.mongodb.net/db`

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 5000
const SECRET_KEY = process.env.SECRET_KEY || ''

const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS || ''
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || ''

export const config = {
    mongo: {
        username: MONGO_USERNAME,
        password: MONGO_PASSWORD,
        url: MONGO_URL
    },
    mail: {
        address: EMAIL_ADDRESS,
        password: EMAIL_PASSWORD
    },
    server: {
        port: SERVER_PORT
    },
    jwt: {
        key: SECRET_KEY
    }
}
