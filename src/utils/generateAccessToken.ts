import { config } from '../config/config'
import { sign } from 'jsonwebtoken'

export default (id: string) => {
    return sign(id, config.jwt.key)
}
