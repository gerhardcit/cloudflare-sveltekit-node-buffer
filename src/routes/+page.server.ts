import { decrypt, encrypt } from '$lib/server/encryption';
import type { PageServerLoad } from './$types';


export const load = (async () => {
    const sometext = 'hello world';

    const encrypted = encrypt(sometext);
    const decrypted = decrypt(encrypted);

    return {
        encrypted,
        decrypted,
    };
}) satisfies PageServerLoad;