import { db } from '@/lib/prisma'
import { UserForm } from '@/app/components/UserForm'
import { Topbar } from '@/app/components/Topbar'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const timelines = await db.timeline.findMany({
    include: {
      members: {
        include: {
          user: true,
        },
      },
      memories: {
        orderBy: {
          date: 'desc',
        },
      },
    },
    orderBy: {
      created_at: 'desc',
    },
  })

  return (
    <main className="min-h-screen bg-stone-950 text-stone-100 selection:bg-amber-500 selection:text-stone-950">
      {/* Topbar Global com navegação para Sign In / Sign Up */}
      <Topbar />

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero Banner + Formulário de Cadastro */}
        <section className="mb-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-stone-100 mb-4 leading-tight">
              Preserve what time <span className="text-amber-400 italic">takes away.</span>
            </h1>
            <p className="text-stone-400 text-lg leading-relaxed mb-6">
              A collaborative digital vault for life&apos;s most meaningful chapters, free from algorithmic noise and social media clutter.
            </p>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-xs font-mono text-stone-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                PostgreSQL (Local Docker) Ativo
              </div>
            </div>
          </div>

          <div>
            <UserForm />
          </div>
        </section>

        {/* Timelines Section */}
        <section>
          <div className="flex items-center justify-between mb-8 border-b border-stone-800 pb-4">
            <h2 className="text-2xl font-serif font-normal text-stone-200">Active Timelines</h2>
            <span className="text-xs text-stone-500 font-mono">({timelines.length} loaded)</span>
          </div>

          {timelines.length === 0 ? (
            <div className="text-center py-20 rounded-2xl border border-dashed border-stone-800 bg-stone-900/30">
              <p className="text-stone-500 text-sm font-mono">No timelines found. Run <code className="text-amber-400">npx prisma db seed</code> to populate sample data.</p>
            </div>
          ) : (
            <div className="grid gap-8">
              {timelines.map((timeline) => (
                <article
                  key={timeline.id}
                  className="rounded-2xl bg-stone-900/60 border border-stone-800 overflow-hidden shadow-2xl transition hover:border-stone-700"
                >
                  {/* Timeline Header */}
                  <div className="p-6 md:p-8 border-b border-stone-800/60 bg-stone-900/40">
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20">
                        {timeline.category}
                      </span>
                      <span className="text-xs font-mono text-stone-500 uppercase">
                        {timeline.visibility}
                      </span>
                    </div>
                    <h3 className="text-2xl font-serif font-medium text-stone-100 mb-2">
                      {timeline.title}
                    </h3>
                    {timeline.description && (
                      <p className="text-stone-400 text-sm leading-relaxed">
                        {timeline.description}
                      </p>
                    )}
                  </div>

                  {/* Memories Feed */}
                  <div className="p-6 md:p-8 bg-stone-950/30">
                    <h4 className="text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-6">
                      Chronicles & Memories ({timeline.memories.length})
                    </h4>

                    {timeline.memories.length === 0 ? (
                      <p className="text-stone-600 text-sm italic font-mono">No memories recorded yet.</p>
                    ) : (
                      <div className="space-y-6">
                        {timeline.memories.map((memory) => (
                          <div
                            key={memory.id}
                            className="group relative pl-6 border-l-2 border-stone-800 hover:border-amber-400/50 transition-colors"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                              <h5 className="font-medium text-stone-200 text-base group-hover:text-amber-300 transition-colors">
                                {memory.title}
                              </h5>
                              <time className="text-xs font-mono text-stone-500">
                                {new Date(memory.date).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </time>
                            </div>

                            {memory.description && (
                              <p className="text-stone-400 text-sm mb-4 leading-relaxed">
                                {memory.description}
                              </p>
                            )}

                            {/* Tags & Mood */}
                            <div className="flex flex-wrap items-center gap-2 mb-4">
                              {memory.mood && (
                                <span className="text-xs px-2.5 py-0.5 rounded-full bg-stone-900 text-stone-300 font-mono border border-stone-800">
                                  ✨ {memory.mood}
                                </span>
                              )}
                              {memory.tags.map((tag) => (
                                <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full bg-stone-900 text-stone-400 font-mono border border-stone-800">
                                  #{tag}
                                </span>
                              ))}
                            </div>

                            {/* Media Gallery Preview */}
                            {memory.media_urls.length > 0 && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 max-w-lg">
                                {memory.media_urls.map((url, idx) => (
                                  <div key={idx} className="relative aspect-video rounded-xl overflow-hidden bg-stone-900 border border-stone-800">
                                    <img
                                      src={url}
                                      alt={memory.title}
                                      className="object-cover w-full h-full hover:scale-105 transition duration-500"
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}