export interface TimelineMemory {
    id: string
    title: string
    description: string
    date: string
    image: string
    location: string
}

export interface TimelineData {
    id: string
    title: string
    description: string
    memories: TimelineMemory[]
    isExample?: boolean
    collaboratorCount?: number
    visibility?: 'PUBLIC' | 'PRIVATE' | 'SHARED'
    category?: string
}