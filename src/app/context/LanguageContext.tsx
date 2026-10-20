'use client'

import React, { createContext, useContext, useState } from 'react'

type Language = 'pt' | 'en'

interface LanguageContextType {
    lang: Language
    setLang: (lang: Language) => void
    toggleLang: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLangState] = useState<Language>(() => {
        if (typeof window === 'undefined') return 'pt'

        const savedLang = localStorage.getItem('grio_lang') as Language
        if (savedLang) {
            return savedLang
        }

        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
        const browserLang = navigator.language || navigator.languages[0]

        const isBrazil = timezone.includes('America/Sao_Paulo') ||
            timezone.includes('America/Cuiaba') ||
            timezone.includes('America/Manaus') ||
            timezone.includes('America/Belem') ||
            browserLang.startsWith('pt')

        const initialLang = isBrazil ? 'pt' : 'en'
        localStorage.setItem('grio_lang', initialLang)
        return initialLang
    })

    const setLang = (newLang: Language) => {
        setLangState(newLang)
        localStorage.setItem('grio_lang', newLang)
    }

    const toggleLang = () => {
        const nextLang = lang === 'pt' ? 'en' : 'pt'
        setLang(nextLang)
    }

    return (
        <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}