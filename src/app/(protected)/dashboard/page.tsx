import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { DashboardContent } from './DashboardContent'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
    const user = await getSession()

    if (!user) {
        redirect('/login')
    }

    return <DashboardContent user={user} />
}