'use server'

import { db } from '@/lib/prisma'
import { getSession } from '@/lib/session'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import bcrypt from 'bcryptjs'

const createUserSchema = z.object({
    name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres.'),
    email: z.string().email('Digite um e-mail válido.'),
})

const updateProfileSchema = z.object({
    name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres.'),
    email: z.string().email('Digite um e-mail válido.'),
    image: z.string()
        .url('URL de imagem inválida.')
        .optional()
        .or(z.literal('')), currentPassword: z.string().optional().or(z.literal('')),
    newPassword: z.string().min(6, 'A nova senha deve ter pelo menos 6 caracteres.').optional().or(z.literal('')),
    confirmPassword: z.string().optional().or(z.literal('')),
}).refine((data) => {
    if (data.newPassword && data.newPassword.length > 0) {
        return data.newPassword === data.confirmPassword
    }
    return true
}, {
    message: 'As senhas não coincidem.',
    path: ['confirmPassword'],
})
export type UserFormState = {
    success?: boolean
    message?: string
    errors?: {
        name?: string[]
        email?: string[]
        image?: string[]
        currentPassword?: string[]
        newPassword?: string[]
        confirmPassword?: string[]
    }
} | null

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

export async function updateUserProfile(prevState: UserFormState, formData: FormData): Promise<UserFormState> {
    const sessionUser = await getSession()
    if (!sessionUser) {
        return {
            success: false,
            message: 'Usuário não autenticado.',
        }
    }

    const rawData = {
        name: formData.get('name'),
        email: formData.get('email'),
        image: formData.get('image'),
        currentPassword: formData.get('currentPassword'),
        newPassword: formData.get('newPassword'),
        confirmPassword: formData.get('confirmPassword'),
    }

    const validatedFields = updateProfileSchema.safeParse(rawData)

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Erro de validação. Verifique os campos.',
        }
    }

    const { name, email, image, currentPassword, newPassword } = validatedFields.data

    try {
        if (email !== sessionUser.email) {
            const emailExists = await db.user.findUnique({
                where: { email },
            })
            if (emailExists) {
                return {
                    success: false,
                    errors: { email: ['Este e-mail já está em uso por outra conta.'] },
                    message: 'E-mail indisponível.',
                }
            }
        }
        const dbUser = await db.user.findUnique({
            where: { id: sessionUser.id },
        })

        if (!dbUser) {
            return { success: false, message: 'Usuário não encontrado.' }
        }

        const updateData: any = {
            name,
            email,
            image: image || null,
        }

        // Lógica de atualização de senha
        if (newPassword && newPassword.length > 0) {
            if (dbUser.password) {
                if (!currentPassword) {
                    return {
                        success: false,
                        errors: { currentPassword: ['Informe sua senha atual para definir uma nova senha.'] },
                        message: 'Senha atual obrigatória.',
                    }
                }
                const passwordMatch = await bcrypt.compare(currentPassword, dbUser.password)
                if (!passwordMatch) {
                    return {
                        success: false,
                        errors: { currentPassword: ['Senha atual incorreta.'] },
                        message: 'A senha atual informada está incorreta.',
                    }
                }
            }
            updateData.password = await bcrypt.hash(newPassword, 10)
        }

        await db.user.update({
            where: { id: sessionUser.id },
            data: updateData,
        })

        revalidatePath('/settings')
        revalidatePath('/')

        return {
            success: true,
            message: 'Informações atualizadas com sucesso!',
        }
    } catch (error) {
        console.error('Erro ao atualizar perfil:', error)
        return {
            success: false,
            message: 'Erro interno no servidor ao tentar atualizar as informações.',
        }
    }
}