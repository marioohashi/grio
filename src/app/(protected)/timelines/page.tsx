import { UserTimelines } from '@/app/components/UserTimelines'

export default function TimelinesPage() {
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