import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Cleaning up existing database data...')
    await prisma.memory.deleteMany()
    await prisma.timelineMember.deleteMany()
    await prisma.timeline.deleteMany()
    await prisma.user.deleteMany()

    console.log('👤 Creating test user...')
    const owner = await prisma.user.create({
        data: {
            name: 'Mario Ohashi',
            email: 'mario@example.com',
            image: null,
        },
    })

    console.log('🗺️ Creating sample timeline and memories...')
    const timeline = await prisma.timeline.create({
        data: {
            title: 'Expedição Chama Sagrada: Rumo ao Norte',
            description:
                'A multi-state overland backpacking journey and road trip through Brazil.',
            category: 'TRAVEL',
            visibility: 'PUBLIC',

            // ✅ Owner direto — não vai mais em members
            owner_id: owner.id,

            memories: {
                create: [
                    {
                        user_id: owner.id,
                        title: 'Start of the Journey in Curitiba',
                        description:
                            'Packing the backpack, checking gear, and hitting the road north.',
                        date: new Date('2025-11-15T08:00:00.000Z'),
                        mood: 'EXCITED',
                        tags: ['roadtrip', 'backpacking', 'curitiba'],
                        media_urls: [
                            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80',
                        ],
                    },
                    {
                        user_id: owner.id,
                        title: 'Sunset at Chapada dos Veadeiros',
                        description:
                            'Breathtaking views after a 12km grueling hike under the sun.',
                        date: new Date('2025-11-20T18:30:00.000Z'),
                        mood: 'NOSTALGIC',
                        tags: ['hiking', 'nature', 'sunset'],
                        media_urls: [
                            'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
                        ],
                    },
                ],
            },
        },
    })

    // ✨ Opcional — adicione um editor convidado para testar compartilhamento
    const editor = await prisma.user.create({
        data: {
            name: 'Ana Pereira',
            email: 'ana@example.com',
        },
    })

    await prisma.timelineMember.create({
        data: {
            user_id: editor.id,
            timeline_id: timeline.id,
            role: 'EDITOR', // ✅ apenas EDITOR ou VIEWER agora
        },
    })

    console.log(`✅ Seed complete.`)
    console.log(`   • User (owner): ${owner.email}`)
    console.log(`   • Timeline: ${timeline.title}`)
    console.log(`   • Editor convidado: ${editor.email}`)
}

main()
    .catch((e) => {
        console.error('❌ Error executing seed:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })