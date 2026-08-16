'use server'

import { createClient } from '@/lib/supabase/server'
import { slugify } from '@/lib/utils'

const BUCKET_NAME = 'Image'
const MAX_FILE_SIZE = 5 * 1024 * 1024

const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
]

/**
 * Uploads an image file to Supabase Storage from the server.
 *
 * This helper is kept for server-side upload use cases.
 * Client-side image uploads should use the browser Supabase client
 * directly to avoid sending large files through Next.js Server Actions.
 */
export async function uploadFileToStorage(
  file: File,
  folder: string
): Promise<{ url?: string; error?: string }> {
  if (file.size === 0) {
    return {
      error: 'Please select an image file.',
    }
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      error: 'File must be under 5MB.',
    }
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      error: 'Only JPG, PNG, and WebP images are allowed.',
    }
  }

  const ext =
    file.name.split('.').pop()?.toLowerCase() || 'jpg'

  const slug =
    slugify(
      file.name.replace(/\.[^.]+$/, '')
    ) || 'image'

  const path =
    `${folder}/${slug}-${Date.now()}.${ext}`

  const supabase = await createClient()

  const {
    error: uploadError,
  } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type,
    })

  if (uploadError) {
    return {
      error: uploadError.message,
    }
  }

  const {
    data: publicUrl,
  } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(path)

  return {
    url: publicUrl.publicUrl,
  }
}