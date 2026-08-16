'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Label } from '@/components/ui/input'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
]

export function ImageUploadField({
  name,
  label = 'Image',
  value,
  required = false,
  folder,
}: {
  name: string
  label?: string
  value?: string
  required?: boolean
  folder?: string
}) {
  const [preview, setPreview] = useState(value ?? '')
  const [imageUrl, setImageUrl] = useState(value ?? '')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    return () => {
      if (preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview])

  async function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0]

    if (!file) {
      setPreview(value ?? '')
      setImageUrl(value ?? '')
      setError(null)
      return
    }

    setError(null)

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      event.target.value = ''
      setError('Format gambar harus JPG, PNG, atau WebP.')
      return
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      event.target.value = ''
      setError('Ukuran gambar maksimal 5 MB.')
      return
    }

    // Show local preview immediately
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)

    setUploading(true)

    try {
      const supabase = createClient()

      const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'

      const filePath = `${folder}/${crypto.randomUUID()}.${extension}`

      const { error: uploadError } = await supabase.storage
        .from('Image')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) {
        throw new Error(uploadError.message)
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from('Image')
        .getPublicUrl(filePath)

      setImageUrl(publicUrl)
      setPreview(publicUrl)
    } catch (err) {
      console.error('Image upload error:', err)

      setImageUrl(value ?? '')
      setPreview(value ?? '')

      setError(
        err instanceof Error
          ? err.message
          : 'Gagal mengunggah gambar.'
      )

      event.target.value = ''
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>

      <div className="flex flex-col gap-3">
        {preview && (
          <div className="relative h-32 w-48 overflow-hidden rounded-lg border border-[#E8E5E0] bg-[#F4F3F0]">
            <Image
              src={preview}
              alt="Selected preview"
              fill
              className="object-cover"
              sizes="192px"
              unoptimized
            />
          </div>
        )}

        <Input
          id={name}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          required={required && !imageUrl}
          disabled={uploading}
          onChange={handleChange}
        />

        {uploading && (
          <p className="text-sm text-gray-500">
            Mengunggah gambar...
          </p>
        )}

        {error && (
          <p
            className="text-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}

        {/* 
          IMPORTANT:
          Hanya URL yang dikirim ke Server Action.
          File tidak memiliki name sehingga tidak masuk FormData.
        */}
        <input
          type="hidden"
          name={name}
          value={imageUrl}
          readOnly
        />
      </div>
    </div>
  )
}