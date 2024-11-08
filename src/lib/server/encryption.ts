const algorithm = { name: 'AES-CTR', counter: null as ArrayBuffer | null, length: 128 };

// Convert a string to an ArrayBuffer
function textToArrayBuffer(text: string): ArrayBuffer {
    return new TextEncoder().encode(text).buffer;
}

// Convert an ArrayBuffer to a hex string
function arrayBufferToHex(buffer: ArrayBuffer): string {
    return Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

// Convert a hex string to an ArrayBuffer
function hexToArrayBuffer(hex: string): ArrayBuffer {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < bytes.length; i++) {
        bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
    }
    return bytes.buffer;
}

// Import the encryption key
async function getKey(secretKey: string): Promise<CryptoKey> {
    const keyBuffer = textToArrayBuffer(secretKey);
    return await crypto.subtle.importKey(
        'raw',
        keyBuffer,
        { name: 'AES-CTR' },
        false,
        ['encrypt', 'decrypt']
    );
}

export async function encrypt(text: string, secretKey: string, ivString: string): Promise<string> {
    const iv = textToArrayBuffer(ivString);
    algorithm.counter = iv;
    const key = await getKey(secretKey);
    
    const encrypted = await crypto.subtle.encrypt(
        algorithm,
        key,
        textToArrayBuffer(text)
    );

    return arrayBufferToHex(encrypted);
}

export async function decrypt(hash: string, secretKey: string, ivString: string): Promise<string> {
    const iv = textToArrayBuffer(ivString);
    algorithm.counter = iv;
    const key = await getKey(secretKey);
    
    const decrypted = await crypto.subtle.decrypt(
        algorithm,
        key,
        hexToArrayBuffer(hash)
    );

    return new TextDecoder().decode(decrypted);
}