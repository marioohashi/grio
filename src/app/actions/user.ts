'use server'

import { db } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const createUserSchema = z.object({
    name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres.'),
    email: z.string().email('Digite um e-mail válido.'),
})

export type UserFormState = {
    success?: boolean
    message?: string
    errors?: {
        name?: string[]
        email?: string[]
    }
}

export async function registerUser(prevState: UserFormState, formData: FormData): Promise<UserFormState> {
    const validatedFields = createUserSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
    })

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Erro de validação. Verifique os campos.',
        }
    }

    const { name, email } = validatedFields.data

    try {
        const existingUser = await db.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return {
                success: false,
                message: 'Este e-mail já está cadastrado no sistema.',
            }
        }

        // Cria o usuário no banco local
        await db.user.create({
            data: {
                name,
                email,
            },
        })

        revalidatePath('/')
        return {
            success: true,
            message: `Usuário ${name} cadastrado com sucesso!`,
        }
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error)
        return {
            success: false,
            message: 'Erro interno no servidor ao tentar salvar o usuário.',
        }
    }
}