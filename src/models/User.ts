import mongoose, { Document, Schema } from 'mongoose'

export interface IUser {
    userName: string
    password: string
    email: string
    level: number
    exp: number
    money: number
    activationCode: string
    isVerifed: boolean
    date: string
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
    {
        userName: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        level: { type: Number, default: 0 },
        exp: { type: Number, default: 0 },
        money: { type: Number, default: 0 },
        activationCode: { type: String },
        isVerifed: { type: Boolean },
        date: { type: Date, default: Date.now() }
    },
    {
        versionKey: false
    }
)

export default mongoose.model<IUserModel>('User', UserSchema)
