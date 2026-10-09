import { FilmRollGallery } from '@/app/components/FilmRollGallery'

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-950 text-stone-100 selection:bg-amber-500 selection:text-stone-950 overflow-x-hidden">

      <div className="max-w-7xl mx-auto px-6 pt-12 pb-6">
        {/* Hero Banner */}
        <section className="mb-8 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-stone-100 mb-4 leading-tight">
            Preserve what time <span className="text-amber-400 italic">takes away.</span>
          </h1>
          <p className="text-stone-400 text-lg leading-relaxed">
            A collaborative digital vault for life&apos;s most meaningful chapters, free from algorithmic noise and social media clutter.
          </p>
        </section>
      </div>

      {/* <FilmRollGallery /> */}
    </main>
  )
}