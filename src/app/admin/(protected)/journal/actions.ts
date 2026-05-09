'use server'

import { revalidatePath } from 'next/cache'
import { requireAdminAuthenticated } from '@/lib/admin-auth'
import { deleteImageFromR2, getOptionalFile, uploadImageToR2 } from '@/lib/r2'
import prisma from '@/lib/prisma'

function readRequiredString(formData: FormData, key: string) {
  const value = formData.get(key)

  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`${key} is required`)
  }

  return value.trim()
}

function revalidateJournalPages() {
  revalidatePath('/admin/journal')
  revalidatePath('/journal')
  revalidatePath('/')
}

export async function createJournalPost(formData: FormData) {
  await requireAdminAuthenticated()

  const published = formData.get('published') === 'on'
  const file = getOptionalFile(formData, 'image')
  const uploadedImage = file ? await uploadImageToR2(file, 'pink-tower/journal') : null

  await prisma.blogPost.create({
    data: {
      title: readRequiredString(formData, 'title'),
      content: readRequiredString(formData, 'content'),
      author: readRequiredString(formData, 'author'),
      imageUrl: uploadedImage?.url ?? null,
      imagePublicId: uploadedImage?.publicId ?? null,
      publishedAt: published ? new Date() : null,
    },
  })

  revalidateJournalPages()
}

export async function updateJournalPost(formData: FormData) {
  await requireAdminAuthenticated()

  const id = readRequiredString(formData, 'id')
  const published = formData.get('published') === 'on'
  const removeImage = formData.get('removeImage') === 'on'
  const file = getOptionalFile(formData, 'image')
  const existingPost = await prisma.blogPost.findUnique({
    where: { id },
    select: { imagePublicId: true, publishedAt: true },
  })
  const uploadedImage = file ? await uploadImageToR2(file, 'pink-tower/journal') : null
  const shouldDeleteOldImage = Boolean(existingPost?.imagePublicId && (uploadedImage || removeImage))

  await prisma.blogPost.update({
    where: { id },
    data: {
      title: readRequiredString(formData, 'title'),
      content: readRequiredString(formData, 'content'),
      author: readRequiredString(formData, 'author'),
      ...(uploadedImage
        ? {
            imageUrl: uploadedImage.url,
            imagePublicId: uploadedImage.publicId,
          }
        : removeImage
          ? {
              imageUrl: null,
              imagePublicId: null,
            }
          : {}),
      publishedAt: published ? existingPost?.publishedAt ?? new Date() : null,
    },
  })

  if (shouldDeleteOldImage) {
    await deleteImageFromR2(existingPost?.imagePublicId)
  }

  revalidateJournalPages()
}

export async function deleteJournalPost(formData: FormData) {
  await requireAdminAuthenticated()

  const id = readRequiredString(formData, 'id')
  const post = await prisma.blogPost.findUniqueOrThrow({
    where: { id },
    select: { imagePublicId: true },
  })

  await deleteImageFromR2(post.imagePublicId)
  await prisma.blogPost.delete({
    where: { id },
  })

  revalidateJournalPages()
}
