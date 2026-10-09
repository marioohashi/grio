'use server'

import { db } from '@/lib/prisma'
import { Resend } from 'resend'
import { z } from 'zod'
import { randomBytes } from 'crypto'

import { hash, compare } from 'bcryptjs'
import { redirect } from 'next/navigation'
import { createSession, destroySession } from '@/lib/session'

const resend = new Resend(process.env.RESEND_API_KEY)

const signupSchema = z.object({
    name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres.'),
    email: z.string().email('E-mail inválido.'),
    password: z
        .string()
        .min(8, 'A senha deve ter no mínimo 8 caracteres.')
        .regex(/[A-Z]/, 'A senha deve conter ao menos uma letra maiúscula.')
        .regex(/[a-z]/, 'A senha deve conter ao menos uma letra minúscula.')
        .regex(/[0-9]/, 'A senha deve conter ao menos um número.')
        .regex(/[^A-Za-z0-9]/, 'A senha deve conter ao menos um caractere especial.'),
})

const loginSchema = z.object({
    email: z.string().email('E-mail inválido.'),
    password: z.string().min(1, 'Informe a senha.'),
})

export type LoginState =
    | { status: 'idle' }
    | { status: 'error'; message?: string }
    | null

export type SignupState =
    | { status: 'idle' }
    | { status: 'error'; errors?: Record<string, string[] | undefined>; message?: string }
    | { status: 'sent'; email: string }
    | null

export async function handleLogin(
    prev: LoginState,
    formData: FormData
): Promise<LoginState> {
    const result = loginSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!result.success) {
        return { status: 'error', message: 'Dados inválidos.' }
    }
    const INVALID_CREDENTIALS = 'E-mail ou senha incorretos.'

    const { email, password } = result.data

    const user = await db.user.findUnique({ where: { email } })

    if (!user || !user.password) {
        return { status: 'error', message: INVALID_CREDENTIALS }
    }


    const passwordOk = await compare(password, user.password)

    if (!passwordOk) {
        return { status: 'error', message: INVALID_CREDENTIALS }
    }

    if (!user.emailVerified) {
        return {
            status: 'error',
            message: 'Confirmar seu e-mail antes de entrar.',
        }
    }

    await createSession(user.id)
    redirect('/')
}

export async function handleLogout() {
    await destroySession()
    redirect('/login')
}

export async function handleSignup(
    prev: SignupState,
    formData: FormData
): Promise<SignupState> {
    const result = signupSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!result.success) {
        return { status: 'error', errors: result.error.flatten().fieldErrors }
    }

    const { name, email, password } = result.data

    const existingUser = await db.user.findUnique({ where: { email } })
    if (existingUser) {
        return { status: 'error', message: 'Este e-mail já está cadastrado.' }
    }

    const hashedPassword = await hash(password, 10)

    await db.user.create({
        data: { name, email, password: hashedPassword },
    })

    const token = randomBytes(32).toString('hex')
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24) // 24h

    // limpa tokens antigos do mesmo e-mail e cria o novo
    await db.verificationToken.deleteMany({ where: { identifier: email } })
    await db.verificationToken.create({
        data: { identifier: email, token, expires },
    })

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
    const link = `${baseUrl}/api/auth/verify?token=${token}&email=${encodeURIComponent(email)}`

    const { error } = await resend.emails.send({
        from: process.env.RESEND_FROM ?? 'Griô <onboarding@resend.dev>',
        to: email,
        subject: 'Confirma teu e-mail, brother',
        html: `
            <p>E aí, ${name}!</p>
            <p>Confirma teu e-mail clicando no link abaixo (expira em 24h):</p>
            <p><a href="${link}">Confirmar e-mail</a></p>
            <p>Se não foi você, ignora essa mensagem.</p>
        `,
    })

    if (error) {
        console.error('[signup] Resend error:', error)
        return {
            status: 'error',
            message: 'Conta criada, mas não conseguimos enviar o e-mail. Tente novamente em instantes.',
        }
    }

    return { status: 'sent', email }
}