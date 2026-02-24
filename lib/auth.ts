import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'dev_secret_fallback'
);

export async function getAuthUser() {
    try {
        const token = cookies().get('auth_token')?.value;
        if (!token) return null;

        const { payload } = await jwtVerify(token, JWT_SECRET);
        return {
            id: payload.userId as string,
            email: payload.email as string
        };
    } catch (err) {
        return null;
    }
}

export async function requireAuth() {
    const user = await getAuthUser();
    if (!user) {
        throw new Error('Unauthorized');
    }
    return user;
}
