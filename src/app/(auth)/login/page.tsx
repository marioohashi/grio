import LoginForm from './LoginForm'

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ verified?: string; error?: string }>
}) {
    const params = await searchParams

    return (
        <LoginForm
            verified={params.verified === '1'}
            error={params.error}
        />
    )
}