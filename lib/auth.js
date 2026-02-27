import { SignJWT, jwtVerify } from 'jose';

const SECRET_KEY = process.env.JWT_SECRET;

if (!SECRET_KEY && process.env.NODE_ENV === 'production') {
    throw new Error('FATAL: JWT_SECRET is not defined in environment variables.');
}

const key = new TextEncoder().encode(SECRET_KEY || 'dev-unsafe-key-extreme-fallback-32-chars-long');

/**
 * Assina um token JWT com expiração curta para maior segurança
 * @param {Object} payload 
 */
export async function signToken(payload) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('12h') // Reduzido de 24h para 12h
        .sign(key);
}

/**
 * Verifica e valida o token JWT
 * @param {string} token 
 */
export async function verifyToken(token) {
    if (!token) return null;
    try {
        const { payload } = await jwtVerify(token, key);
        return payload;
    } catch (error) {
        console.error('JWT Verification Error:', error.code || error.message);
        return null;
    }
}

/**
 * Configurações padrão de segurança para cookies
 */
export const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict', // Mudado de 'lax' para 'strict' para proteção máxima CSRF
    path: '/',
    maxAge: 60 * 60 * 12 // 12 horas
};
