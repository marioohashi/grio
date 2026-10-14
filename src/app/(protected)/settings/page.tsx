import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { SettingsContent } from './SettingsContent'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
    const user = await getSession()

    if (!user) {
        redirect('/login')
    }

    return <SettingsContent user={user} />
}