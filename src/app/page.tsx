import { HomeContent } from '@/app/components/HomeContent'
import { UserTimelines } from '@/app/components/UserTimelines'
import { getSession } from '@/lib/session'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const user = await getSession()
  if (!user) {
    return <HomeContent />
  }
  return (
    <main
      className="min-h-screen pt-32 pb-24"
      style={{ backgroundColor: '#0E1712' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <UserTimelines />
      </div>
    </main>
  )
}