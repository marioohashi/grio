import { NextResponse } from 'next/server'
import { db } from '@/lib/prisma'
import { createSession } from '@/lib/session'

export async function GET(request: Request) {
    const url = new URL(request.url)
    const code = url.searchParams.get('code')

    if (!code) {
        return NextResponse.redirect(new URL('/login?error=google_failed', request.url))
    }

    try {
        // 1. Trocar o código de autorização pelos tokens do Google
        const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                code,
                client_id: process.env.GOOGLE_CLIENT_ID!,
                client_secret: process.env.GOOGLE_CLIENT_SECRET!,
                redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/api/auth/google/callback`,
                grant_type: 'authorization_code',
            }),
        })

        const tokenData = await tokenRes.json()
        if (!tokenData.access_token) {
            throw new Error('Falha ao obter access token do Google')
        }

        // 2. Buscar as informações do perfil do usuário no Google
        const userRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${tokenData.access_token}` },
        })
        const googleUser = await userRes.json()

        if (!googleUser.email) {
            throw new Error('E-mail não fornecido pelo Google')
        }

        const { email, name, picture } = googleUser

        // 3. Verificar se o usuário já existe no banco de dados
        let user = await db.user.findUnique({ where: { email } })

        if (!user) {
            // Se não existe, cria a conta automaticamente (já validada pelo Google)
            user = await db.user.create({
                data: {
                    email,
                    name: name || 'Usuário Google',
                    image: picture,
                    emailVerified: new Date(), // E-mail do Google já é verificado
                },
            })
        } else if (!user.emailVerified || !user.image) {
            // Atualiza dados caso necessário
            user = await db.user.update({
                where: { id: user.id },
                data: {
                    image: user.image || picture,
                    emailVerified: user.emailVerified || new Date(),
                },
            })
        }

        // 4. Cria a sessão utilizando a sua função existente
        await createSession(user.id)

        // 5. Redireciona para a home autenticado
        return NextResponse.redirect(new URL('/', request.url))
    } catch (error) {
        console.error('[Google OAuth Error]', error)
        return NextResponse.redirect(new URL('/login?error=google_failed', request.url))
    }
}