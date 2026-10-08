
export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="min-h-screen bg-stone-950 flex items-center justify-center px-6">
                {children}
            </div>
        </>
    )
}