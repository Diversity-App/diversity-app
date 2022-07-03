import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { User } from '../types.d';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const generateToken = (user: User): string => {
    return sign(user, JWT_SECRET, {
        expiresIn: '12h',
    });
};

export function hashPassword(password: string) {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
}

export function checkPassword(password: string, hash: string) {
    return compareSync(password, hash);
}

export const verifyToken = (req: any, res: any, next: any) => {
    const bearerHeader = req.headers['authorization'] || req.cookies['API_TOKEN'];
    if (!bearerHeader) {
        return res.status(401).send({
            status: 'error',
            message: 'Access denied. No token provided.',
        });
    }

    let access_token: string;

    if (bearerHeader.startsWith('Bearer ')) {
        const [$bearer, token] = bearerHeader.split(' ');
        access_token = token;
    } else {
        access_token = bearerHeader;
    }

    try {
        const decoded = verify(access_token, JWT_SECRET) as unknown as User;
        if (typeof decoded != 'string' && decoded.id) {
            req.user = decoded;
            next();
        } else {
            return res.status(401).send({
                status: 'error',
                message: 'Access denied. Invalid token.',
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(400).send({
            status: 'error',
            message: 'Invalid token.',
        });
    }
};
