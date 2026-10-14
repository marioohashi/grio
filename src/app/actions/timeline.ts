'use server'

import { db } from '@/lib/prisma'
import { createTimelineSchema, createMemorySchema } from '@/lib/validations'
import { revalidatePath } from 'next/cache'
import { Category, Visibility, Role } from '@prisma/client'

// ============================================================
// CREATE TIMELINE
// ============================================================

export async function createTimeline(userId: string, formData: unknown) {
  const result = createTimelineSchema.safeParse(formData)

  if (!result.success) {
    return { success: false as const, errors: result.error.flatten().fieldErrors }
  }

  try {
    const { title, description, category, visibility } = result.data

    const timeline = await db.timeline.create({
      data: {
        title,
        description,
        // Cast seguro: o Zod já validou contra os valores do enum
        category: category as Category,
        visibility: visibility as Visibility,
        // ✅ Owner direto — não vai mais em members
        owner_id: userId,
      },
    })

    // Revalida tanto a home logada quanto a rota /timelines
    revalidatePath('/')
    revalidatePath('/timelines')

    return { success: true as const, data: timeline }
  } catch (error) {
    console.error('Failed to create timeline:', error)
    return { success: false as const, error: 'Internal server error' }
  }
}

// ============================================================
// CREATE MEMORY
// ============================================================

export async function createMemory(userId: string, formData: unknown) {
  const result = createMemorySchema.safeParse(formData)

  if (!result.success) {
    return { success: false as const, errors: result.error.flatten().fieldErrors }
  }

  try {
    const { timeline_id, title, description, date, mood, tags, media_urls } = result.data

    // 🔒 Verifica permissão — só OWNER e EDITOR podem adicionar memórias
    const timeline = await db.timeline.findUnique({
      where: { id: timeline_id },
      select: {
        id: true,
        owner_id: true,
        members: {
          where: { user_id: userId },
          select: { role: true },
        },
      },
    })

    if (!timeline) {
      return { success: false as const, error: 'Timeline not found' }
    }

    const isOwner = timeline.owner_id === userId
    const memberRole = timeline.members[0]?.role
    const canEdit = isOwner || memberRole === Role.EDITOR

    if (!canEdit) {
      return {
        success: false as const,
        error: 'You do not have permission to add memories to this timeline',
      }
    }

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

    revalidatePath('/')
    revalidatePath('/timelines')
    revalidatePath(`/timelines/${timeline_id}`)

    return { success: true as const, data: memory }
  } catch (error) {
    console.error('Failed to create memory:', error)
    return { success: false as const, error: 'Internal server error' }
  }
}