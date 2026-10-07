import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Cleaning up existing database data...')
    await prisma.memory.deleteMany()
    await prisma.timelineMember.deleteMany()
    await prisma.timeline.deleteMany()
    await prisma.user.deleteMany()

    console.log('👤 Creating test user...')
    const user = await prisma.user.create({
        data: {
            email: 'mario@grio.app',
            name: 'Mario Ohashi',
        },
    })

    console.log('🗺️ Creating sample timeline and memories...')
    const timeline = await prisma.timeline.create({
        data: {
            title: 'Expedição Chama Sagrada: Rumo ao Norte',
            description: 'A multi-state overland backpacking journey and road trip through Brazil.',
            category: 'TRAVEL',
            visibility: 'PUBLIC',
            members: {
                create: {
                    user_id: user.id,
                    role: 'OWNER',
                },
            },
            memories: {
                create: [
                    {
                        user_id: user.id,
                        title: 'Start of the Journey in Curitiba',
                        description: 'Packing the backpack, checking gear, and hitting the road north.',
                        date: new Date('2025-11-15T08:00:00Z'),
                        mood: 'EXCITED',
                        tags: ['roadtrip', 'backpacking', 'curitiba'],
                        media_urls: [
                            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80',
                        ],
                    },
                    {
                        user_id: user.id,
                        title: 'Sunset at Chapada dos Veadeiros',
                        description: 'Breathtaking views after a 12km grueling hike under the sun.',
                        date: new Date('2025-11-20T18:30:00Z'),
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

    console.log('✅ Seed executed successfully!')
    console.log({ user: user.name, timeline: timeline.title })
}

main()
    .catch((e) => {
        console.error('❌ Error executing seed:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })