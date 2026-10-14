'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

interface ImageUploadProps {
    defaultValue?: string | null
    name?: string
    label?: string
}

export function ImageUpload({ defaultValue, name = 'image', label = 'Foto de Perfil' }: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(defaultValue || null)
    const [value, setValue] = useState<string>(defaultValue || '')
    const [isUploading, setIsUploading] = useState(false)

    // Estados para o modo de corte e ajuste interativo
    const [isEditing, setIsEditing] = useState(false)
    const [rawImageSrc, setRawImageSrc] = useState<string | null>(null)
    const [imgAspect, setImgAspect] = useState<number>(1)
    const [zoom, setZoom] = useState(1)
    const [offset, setOffset] = useState({ x: 0, y: 0 })

    // Controle de arraste com o mouse / toque
    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

    const fileInputRef = useRef<HTMLInputElement>(null)
    const containerSize = 220 // Tamanho da moldura em pixels

    // Calcula dimensões base exatas para garantir cobertura total de 100%
    const getBaseDimensions = (aspect: number) => {
        let w = containerSize
        let h = containerSize
        if (aspect > 1) {
            w = containerSize * aspect
        } else {
            h = containerSize / aspect
        }
        return { w, h }
    }

    // Limites estritos de arraste para evitar qualquer borda preta ou espaço vazio
    const getClampedOffset = (x: number, y: number, currentZoom: number, aspect: number) => {
        const { w, h } = getBaseDimensions(aspect)
        const scaledW = w * currentZoom
        const scaledH = h * currentZoom

        const maxOffsetX = Math.max(0, (scaledW - containerSize) / 2)
        const maxOffsetY = Math.max(0, (scaledH - containerSize) / 2)

        return {
            x: Math.min(Math.max(x, -maxOffsetX), maxOffsetX),
            y: Math.min(Math.max(y, -maxOffsetY), maxOffsetY)
        }
    }

    // Inicializa o editor com uma imagem (seja nova do upload ou a já salva)
    const initEditorWithImage = (src: string) => {
        const img = new window.Image()
        img.crossOrigin = 'anonymous' // Evita bloqueio de CORS do Cloudinary ao reajustar foto salva
        img.src = src
        img.onload = () => {
            const aspect = img.width / img.height
            setImgAspect(aspect)
            setRawImageSrc(src)
            setZoom(1)
            setOffset({ x: 0, y: 0 })
            setIsEditing(true)
        }
    }

    // Quando o usuário escolhe um arquivo novo da máquina
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (event) => {
            const result = event.target?.result as string
            initEditorWithImage(result)
        }
        reader.readAsDataURL(file)
    }

    // Clicar na foto salva permite reajustá-la a qualquer momento
    const handleAvatarClick = () => {
        if (preview && !isUploading) {
            initEditorWithImage(preview)
        } else {
            fileInputRef.current?.click()
        }
    }

    const handleZoomChange = (newZoom: number) => {
        setZoom(newZoom)
        setOffset(prev => getClampedOffset(prev.x, prev.y, newZoom, imgAspect))
    }

    const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDragging(true)
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
        setDragStart({ x: clientX - offset.x, y: clientY - offset.y })
    }

    const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging) return
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

        const rawX = clientX - dragStart.x
        const rawY = clientY - dragStart.y

        const clamped = getClampedOffset(rawX, rawY, zoom, imgAspect)
        setOffset(clamped)
    }

    const handleDragEnd = () => {
        setIsDragging(false)
    }

    // Processa o enquadramento final via Canvas de forma idêntica ao preview e envia para o Cloudinary
    const handleConfirmCrop = async () => {
        if (!rawImageSrc) return

        try {
            setIsUploading(true)
            setIsEditing(false)

            const img = new window.Image()
            img.crossOrigin = 'anonymous'
            img.src = rawImageSrc
            await new Promise((resolve, reject) => {
                img.onload = resolve
                img.onerror = reject
            })

            const canvas = document.createElement('canvas')
            const size = 600 // Resolução final quadrada de alta nitidez
            canvas.width = size
            canvas.height = size
            const ctx = canvas.getContext('2d')

            if (!ctx) return

            ctx.fillStyle = '#1c1917'
            ctx.fillRect(0, 0, size, size)

            ctx.save()
            const ratio = size / containerSize

            // ORDEM CORRIGIDA: Aplica o translate considerando o centro + offset proporcional, e depois o scale
            ctx.translate(
                (size / 2) + (offset.x * ratio),
                (size / 2) + (offset.y * ratio)
            )
            ctx.scale(zoom, zoom)

            const { w, h } = getBaseDimensions(imgAspect)
            const drawWidth = w * ratio
            const drawHeight = h * ratio

            ctx.drawImage(img, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight)
            ctx.restore()

            const dataUrl = canvas.toDataURL('image/jpeg', 0.85)
            const res = await fetch(dataUrl)
            const blob = await res.blob()

            const formData = new FormData()
            formData.append('file', blob, 'avatar.jpg')
            formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '')

            const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ''

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            )

            const data = await response.json()

            if (data.secure_url) {
                setPreview(data.secure_url)
                setValue(data.secure_url)
            } else {
                throw new Error('Falha no upload para o Cloudinary.')
            }
        } catch (error) {
            console.error('Erro ao processar imagem:', error)
            alert('Não foi possível enviar a imagem.')
        } finally {
            setIsUploading(false)
        }
    }

    const { w: baseW, h: baseH } = getBaseDimensions(imgAspect)

    return (
        <div className="space-y-3">
            <label className="block text-xs font-mono uppercase tracking-wider text-stone-400">
                {label}
            </label>

            {/* Visualização Padrão */}
            {!isEditing && (
                <div className="flex items-center gap-4">
                    <div
                        onClick={handleAvatarClick}
                        title="Clique para ajustar a foto"
                        className="relative aspect-square w-20 h-20 rounded-2xl overflow-hidden border border-stone-800 bg-stone-900 flex items-center justify-center shrink-0 shadow-inner cursor-pointer group hover:border-amber-400/60 transition"
                    >
                        {preview ? (
                            <>
                                <Image
                                    src={preview}
                                    alt="Avatar"
                                    width={80}
                                    height={80}
                                    className="object-cover w-full h-full group-hover:scale-105 transition duration-200"
                                />
                                <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition text-[10px] font-mono text-amber-300">
                                    Ajustar ✏️
                                </div>
                            </>
                        ) : (
                            <span className="text-xl font-serif text-amber-400">🏺</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 flex-1">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/png, image/jpeg, image/webp"
                            className="hidden"
                        />
                        <button
                            type="button"
                            disabled={isUploading}
                            onClick={() => fileInputRef.current?.click()}
                            className="px-4 py-2.5 rounded-xl border border-stone-800 bg-stone-900 hover:bg-stone-800 text-stone-200 text-xs font-mono transition cursor-pointer text-center shadow-sm disabled:opacity-50"
                        >
                            {isUploading ? 'Processando e enviando...' : '📁 Escolher nova foto'}
                        </button>
                        <span className="text-[10px] font-mono text-stone-500">
                            {isUploading ? 'Aguarde...' : 'Clique na foto para reajustar ou escolha um novo arquivo.'}
                        </span>
                    </div>
                </div>
            )}

            {/* Painel de Ajuste Interativo */}
            {isEditing && rawImageSrc && (
                <div className="p-6 rounded-2xl bg-stone-900/95 border border-stone-800 space-y-5 backdrop-blur-md shadow-2xl animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-medium">
                            Centralizar Rostinho 🏺
                        </h4>
                        <span className="text-[10px] font-mono text-stone-400">Arraste livremente (cobertura total)</span>
                    </div>

                    <div className="flex justify-center">
                        <div
                            className="relative w-[220px] h-[220px] rounded-2xl overflow-hidden border-2 border-amber-400/50 bg-stone-950 shadow-inner cursor-grab active:cursor-grabbing select-none flex items-center justify-center"
                            onMouseDown={handleDragStart}
                            onMouseMove={handleDragMove}
                            onMouseUp={handleDragEnd}
                            onMouseLeave={handleDragEnd}
                            onTouchStart={handleDragStart}
                            onTouchMove={handleDragMove}
                            onTouchEnd={handleDragEnd}
                        >
                            <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
                                <img
                                    src={rawImageSrc}
                                    alt="Ajuste"
                                    style={{
                                        width: `${baseW}px`,
                                        height: `${baseH}px`,
                                        transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                                        transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                                        maxWidth: 'none',
                                        maxHeight: 'none',
                                    }}
                                    className="select-none pointer-events-none"
                                />
                            </div>
                            <div className="absolute inset-0 border border-white/10 pointer-events-none flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full border border-amber-400/60 bg-amber-400/20"></div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1.5 max-w-[220px] mx-auto">
                        <div className="flex justify-between text-[11px] font-mono text-stone-400">
                            <span>Zoom</span>
                            <span className="text-amber-400">{zoom.toFixed(1)}x</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="3"
                            step="0.1"
                            value={zoom}
                            onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
                            className="w-full accent-amber-400 bg-stone-950 cursor-pointer h-1.5 rounded-lg"
                        />
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="flex-1 py-2.5 rounded-xl border border-stone-800 hover:bg-stone-800 text-stone-300 text-xs font-mono transition cursor-pointer"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={handleConfirmCrop}
                            className="flex-1 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-mono text-xs font-medium transition cursor-pointer shadow-lg shadow-amber-400/10"
                        >
                            Confirmar e Enviar ✨
                        </button>
                    </div>
                </div>
            )}

            <input type="hidden" name={name} value={value} />
        </div>
    )
}