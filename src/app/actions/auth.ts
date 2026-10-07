'use server'

import { db } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { z } from 'zod'
import { redirect } from 'next/navigation'

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

export async function handleSignup(prevState: any, formData: FormData) {
    const result = signupSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!result.success) {
        return { success: false, errors: result.error.flatten().fieldErrors }
    }

    const { name, email, password } = result.data

    const existingUser = await db.user.findUnique({ where: { email } })
    if (existingUser) {
        return { success: false, message: 'Este e-mail já está cadastrado.' }
    }

    // Criptografando a senha
    const hashedPassword = await hash(password, 10)

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    })

    redirect('/login?registered=true')
}