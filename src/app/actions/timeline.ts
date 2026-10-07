'use server'

import { db } from '@/lib/prisma'
import { createTimelineSchema, createMemorySchema } from '@/lib/validations'
import { revalidatePath } from 'next/cache'

export async function createTimeline(userId: string, formData: unknown) {
  const result = createTimelineSchema.safeParse(formData)

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors }
  }

  try {
    const { title, description, category, visibility } = result.data

    const timeline = await db.timeline.create({
      data: {
        title,
        description,
        category,
        visibility,
        members: {
          create: {
            user_id: userId,
            role: 'OWNER',
          },
        },
      },
    })

    revalidatePath('/timelines')
    return { success: true, data: timeline }
  } catch (error) {
    console.error('Failed to create timeline:', error)
    return { success: false, error: 'Internal server error' }
  }
}

export async function createMemory(userId: string, formData: unknown) {
  const result = createMemorySchema.safeParse(formData)

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors }
  }

  try {
    const { timeline_id, title, description, date, mood, tags, media_urls } = result.data

    const memory = await db.memory.create({
      data: {
        timeline_id,
        user_id: userId,
        title,
        description,
        date,
        mood,
        tags,
        media_urls,
      },
    })

    revalidatePath(`/timelines/${timeline_id}`)
    return { success: true, data: memory }
  } catch (error) {
    console.error('Failed to create memory:', error)
    return { success: false, error: 'Internal server error' }
  }
}