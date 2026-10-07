import Link from 'next/link'

export function Topbar() {
    return (
        <header className="w-full border-b border-stone-800 bg-stone-950/60 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <span className="font-serif text-xl tracking-tight text-stone-100 font-medium">
                        Griô <span className="text-amber-400">🏺</span>
                    </span>
                </Link>

                <div className="flex items-center gap-4">
                    <Link
                        href="/login"
                        className="text-xs font-mono text-stone-300 hover:text-stone-100 transition px-3 py-2"
                    >
                        Sign In
                    </Link>
                    <Link
                        href="/signup"
                        className="text-xs font-mono bg-amber-400 hover:bg-amber-300 text-stone-950 px-4 py-2 rounded-xl font-medium transition shadow-sm"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </header>
    )
}