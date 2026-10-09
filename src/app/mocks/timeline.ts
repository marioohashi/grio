// src/app/mocks/timeline.ts
import type { TimelineData } from '@/app/types/timeline'

export const MOCK_TIMELINE: TimelineData = {
    id: 'mock-universal',
    title: 'Uma vida em capítulos',
    description:
        'Uma ode às memórias que moldam quem somos — da coragem de cruzar oceanos à beleza silenciosa dos recomeços. Cada marco é um fragmento de eternidade guardado no tempo.',
    isExample: true,
    collaboratorCount: 4,
    visibility: 'PRIVATE',
    category: 'PERSONAL',
    memories: [
        {
            id: '1',
            title: 'A coragem de cruzar oceanos',
            description: 'Deixar o conhecido para trás, desbravando mares e distâncias em busca de um horizonte fértil e de um novo destino.',
            date: 'Outubro 1934',
            location: 'Porto de Santos, SP',
            image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop',
        },
        {
            id: '2',
            title: 'O desabrochar de uma nova raiz',
            description: 'O instante em que a árvore genealógica ganha um novo galho, trazendo a promessa de um futuro fincado em solo forte.',
            date: 'Abril 1946',
            location: 'Paraná, Brasil',
            image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000&auto=format&fit=crop',
        },
        {
            id: '3',
            title: 'Os cadernos e a busca pelo saber',
            description: 'O silêncio das salas de aula, a tinta preenchendo as folhas em branco e a construção paciente do próprio caminho.',
            date: 'Março 1968',
            location: 'Curitiba, PR',
            image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000&auto=format&fit=crop',
        },
        {
            id: '4',
            title: 'A centelha de uma nova geração',
            description: 'O fôlego de um novo começo, onde o tempo parece pausar para dar lugar ao amor mais visceral e verdadeiro.',
            date: 'Fevereiro 1987',
            location: 'Curitiba, PR',
            image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1000&auto=format&fit=crop',
        },
        {
            id: '5',
            title: 'O calor dos encontros e da partilha',
            description: 'Onde o tempo desacelera: a mesa farta, as risadas compartilhadas e o abraço que acolhe todas as nossas estações.',
            date: 'Outubro 1998',
            location: 'Reunião de Família, PR',
            image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop',
        },
        {
            id: '6',
            title: 'O eco de um legado eterno',
            description: 'A certeza de que nenhuma história se apaga quando é cuidada com afeto, vivendo para sempre em quem amamos.',
            date: 'Presente',
            location: 'Brasil',
            image: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?q=80&w=1000&auto=format&fit=crop',
        },
    ],
}