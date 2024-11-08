import jwt from 'jsonwebtoken';

export const generateToken = (payload: any) => {
    return jwt.sign(payload, 'somesecret', { expiresIn: '1h' });
}