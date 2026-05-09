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

function readOptionalString(formData: FormData, key: string) {
  const value = formData.get(key)

  if (typeof value !== 'string' || value.trim() === '') {
    return null
  }

  return value.trim()
}

function revalidateGalleryPages() {
  revalidatePath('/admin/gallery')
  revalidatePath('/gallery')
  revalidatePath('/admin')
}

export async function createGalleryImage(formData: FormData) {
  await requireAdminAuthenticated()

  const file = getOptionalFile(formData, 'image')

  if (!file) {
    throw new Error('Image is required')
  }

  const uploadedImage = await uploadImageToR2(file, 'pink-tower/gallery')

  await prisma.galleryImage.create({
    data: {
      publicId: uploadedImage.publicId,
      url: uploadedImage.url,
      caption: readOptionalString(formData, 'caption'),
    },
  })

  revalidateGalleryPages()
}

export async function updateGalleryImage(formData: FormData) {
  await requireAdminAuthenticated()

  const id = readRequiredString(formData, 'id')
  const file = getOptionalFile(formData, 'image')
  const existingImage = await prisma.galleryImage.findUniqueOrThrow({
    where: { id },
  })
  const uploadedImage = file ? await uploadImageToR2(file, 'pink-tower/gallery') : null

  await prisma.galleryImage.update({
    where: { id },
    data: {
      caption: readOptionalString(formData, 'caption'),
      ...(uploadedImage
        ? {
            publicId: uploadedImage.publicId,
            url: uploadedImage.url,
          }
        : {}),
    },
  })

  if (uploadedImage) {
    await deleteImageFromR2(existingImage.publicId)
  }

  revalidateGalleryPages()
}

export async function deleteGalleryImage(formData: FormData) {
  await requireAdminAuthenticated()

  const id = readRequiredString(formData, 'id')
  const image = await prisma.galleryImage.findUniqueOrThrow({
    where: { id },
  })

  await deleteImageFromR2(image.publicId)
  await prisma.galleryImage.delete({
    where: { id },
  })

  revalidateGalleryPages()
}
