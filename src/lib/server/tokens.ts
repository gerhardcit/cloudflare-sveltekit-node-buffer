import { SignJWT, jwtVerify } from 'jose';

export async function generateToken (payload: any) {
    const secret = new TextEncoder().encode("somesecretkey");
      return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .sign(secret);
}

export async function verifyToken (token: string) {
    const secret = new TextEncoder().encode("somesecretkey");
    return await jwtVerify(token, secret);
}