import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/prisma'

export async function GET(req: NextRequest) {
    const token = req.nextUrl.searchParams.get('token')
    const email = req.nextUrl.searchParams.get('email')

    if (!token || !email) {
        return NextResponse.redirect(
            new URL('/login?error=invalid_token', req.url)
        )
    }

    // Busca o token no banco
    const record = await db.verificationToken.findUnique({
        where: { token },
    })

    // Token não existe, não bate com o e-mail, ou expirou
    if (!record || record.identifier !== email || record.expires < new Date()) {
        // limpa o token expirado, se existir
        if (record) {
            await db.verificationToken.delete({ where: { token } })
        }
        return NextResponse.redirect(
            new URL('/login?error=expired_token', req.url)
        )
    }

    // Marca o e-mail como verificado
    await db.user.update({
        where: { email },
        data: { emailVerified: new Date() },
    })

    // Token é de uso único — apaga depois de usar
    await db.verificationToken.delete({ where: { token } })

    // Redireciona pro login com um sinal de sucesso
    return NextResponse.redirect(new URL('/login?verified=1', req.url))
}