import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'


export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const user = await getSession()
    if (!user) redirect('/login')
    return <>{children}</>
}
