import 'server-only'
import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'
import { db } from '@/lib/prisma'

const secret = new TextEncoder().encode(process.env.SESSION_SECRET!)
const COOKIE = 'session'

export type SessionUser = {
    id: string
    name: string
    email: string
    image: string | null
    emailVerified: Date | null
}

export async function createSession(userId: string) {
    const token = await new SignJWT({ sub: userId })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(secret)

    const store = await cookies()
    store.set(COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
    })
}

export async function getSession() {
    const store = await cookies()
    const token = store.get(COOKIE)?.value
    if (!token) return null

    try {
        const { payload } = await jwtVerify(token, secret)
        const userId = payload.sub as string
        const user = await db.user.findUnique({
            where: { id: userId },
            select: { id: true, name: true, email: true, image: true, emailVerified: true }
        })
        return user
    } catch {
        return null
    }
}

export async function destroySession() {
    const store = await cookies()
    store.delete(COOKIE)
}
