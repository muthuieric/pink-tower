'use server'

import { revalidatePath } from 'next/cache'
import { requireAdminAuthenticated } from '@/lib/admin-auth'
import prisma from '@/lib/prisma'

function readRequiredString(formData: FormData, key: string) {
  const value = formData.get(key)

  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`${key} is required`)
  }

  return value.trim()
}

function readEventDate(formData: FormData) {
  const value = readRequiredString(formData, 'date')
  const date = new Date(`${value}T12:00:00`)

  if (Number.isNaN(date.getTime())) {
    throw new Error('A valid event date is required')
  }

  return date
}

function revalidateEventPages() {
  revalidatePath('/admin/events')
  revalidatePath('/events')
  revalidatePath('/')
}

export async function createEvent(formData: FormData) {
  await requireAdminAuthenticated()

  await prisma.event.create({
    data: {
      title: readRequiredString(formData, 'title'),
      description: readRequiredString(formData, 'description'),
      date: readEventDate(formData),
      location: readRequiredString(formData, 'location'),
    },
  })

  revalidateEventPages()
}

export async function updateEvent(formData: FormData) {
  await requireAdminAuthenticated()

  const id = readRequiredString(formData, 'id')

  await prisma.event.update({
    where: { id },
    data: {
      title: readRequiredString(formData, 'title'),
      description: readRequiredString(formData, 'description'),
      date: readEventDate(formData),
      location: readRequiredString(formData, 'location'),
    },
  })

  revalidateEventPages()
}

export async function deleteEvent(formData: FormData) {
  await requireAdminAuthenticated()

  const id = readRequiredString(formData, 'id')

  await prisma.event.delete({
    where: { id },
  })

  revalidateEventPages()
}
