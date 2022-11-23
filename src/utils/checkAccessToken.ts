import { config } from '../config/config';
import { verify } from 'jsonwebtoken';

export default (token: string) => {
    return verify(token, config.jwt.key, (err: any, id: any) => {
        console.log(err);
        if (err) return err;
        return id;
    });
};
