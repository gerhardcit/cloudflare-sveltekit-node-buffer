import { decrypt, encrypt } from '$lib/server/encryption';
import type { PageServerLoad } from './$types';

const secretKey = "12345678901234567890123456789012"; // Must be 32 bytes for AES-256
const ivString = "1234567890123456"; // Must be 16 bytes for AES-CTR

export const load = (async ({url}) => {

    const textToEncrypt = url.searchParams.get('text') || 'hello world';

    const encrypted = await encrypt(textToEncrypt, secretKey, ivString);
    const decrypted = await decrypt(encrypted, secretKey, ivString);

    return {
        textToEncrypt,
        encrypted,
        decrypted,
    };
}) satisfies PageServerLoad;