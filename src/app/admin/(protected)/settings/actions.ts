'use server'

import { redirect } from 'next/navigation'
import { changeAdminPassword, requireAdminAuthenticated } from '@/lib/admin-auth'

export async function updateAdminPassword(formData: FormData) {
  await requireAdminAuthenticated()

  const currentPassword = formData.get('currentPassword')
  const newPassword = formData.get('newPassword')
  const confirmPassword = formData.get('confirmPassword')

  if (typeof currentPassword !== 'string' || typeof newPassword !== 'string' || typeof confirmPassword !== 'string') {
    redirect('/admin/settings?error=invalid')
  }

  if (newPassword !== confirmPassword) {
    redirect('/admin/settings?error=match')
  }

  const result = await changeAdminPassword(currentPassword, newPassword)

  if (!result.ok) {
    redirect(`/admin/settings?error=${result.error}`)
  }

  redirect('/admin/login?changed=1')
}
