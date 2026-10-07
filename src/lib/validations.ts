import { z } from 'zod'

export const createTimelineSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters long').max(100),
    description: z.string().max(500).optional(),
    category: z.enum(['RELATIONSHIP', 'PET', 'PERSONAL', 'TRAVEL']),
    visibility: z.enum(['PUBLIC', 'PRIVATE', 'SHARED']).default('PRIVATE'),
})

export const createMemorySchema = z.object({
    timeline_id: z.string().uuid(),
    title: z.string().min(2, 'Title is required').max(150),
    description: z.string().optional(),
    date: z.string().transform((val) => new Date(val)),
    mood: z.string().optional(),
    tags: z.array(z.string()).default([]),
    media_urls: z.array(z.string().url()).default([]),
})

export type CreateTimelineInput = z.infer<typeof createTimelineSchema>
export type CreateMemoryInput = z.infer<typeof createMemorySchema>