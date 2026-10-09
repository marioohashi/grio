'use client'

import { useId } from 'react'

export function LocalDate({
    date,
    options,
}: {
    date: string // ISO string: "2026-03-15T14:30:00.000Z"
    options?: Intl.DateTimeFormatOptions
}) {
    const id = useId()

    return (
        <time
            id={id}
            dateTime={date}
            suppressHydrationWarning
        >
            {new Date(date).toLocaleDateString('pt-BR', options)}
        </time>
    )
}