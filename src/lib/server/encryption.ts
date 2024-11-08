import { Buffer } from 'node:buffer';

const buf = Buffer.from('hello world', 'utf8');

export function encrypt(data: string): string {
    return buf.toString('hex');
    // console.log(buf.toString('hex'));
    // Prints: 68656c6c6f20776f726c64
}

export function decrypt(data: string): string {
    return buf.toString('utf8');
    // console.log(buf.toString('base64'));
    // Prints: aGVsbG8gd29ybGQ=
}
