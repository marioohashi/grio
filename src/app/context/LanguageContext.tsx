'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Language = 'pt' | 'en'

interface LanguageContextType {
    lang: Language
    setLang: (lang: Language) => void
    toggleLang: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLangState] = useState<Language>('pt')

    useEffect(() => {
        // Verifica se já existe preferência salva no navegador
        const savedLang = localStorage.getItem('grio_lang') as Language
        if (savedLang) {
            setLangState(savedLang)
            return
        }

        // Detecção automática baseada no fuso horário ou idioma do navegador se não houver preferência salva
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
        const browserLang = navigator.language || navigator.languages[0]

        // Se estiver no Brasil (fuso de Brasília/América) ou o idioma do browser for pt-BR
        const isBrazil = timezone.includes('America/Sao_Paulo') ||
            timezone.includes('America/Cuiaba') ||
            timezone.includes('America/Manaus') ||
            timezone.includes('America/Belem') ||
            browserLang.startsWith('pt')

        if (isBrazil) {
            setLangState('pt')
            localStorage.setItem('grio_lang', 'pt')
        } else {
            setLangState('en')
            localStorage.setItem('grio_lang', 'en')
        }
    }, [])

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