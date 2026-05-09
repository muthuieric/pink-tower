'use server'

import { redirect } from 'next/navigation'
import { clearAdminSession, isAdminPasswordConfigured, setAdminSession, validateAdminPassword } from '@/lib/admin-auth'

export async function loginAdmin(formData: FormData) {
  await clearAdminSession()

  if (!(await isAdminPasswordConfigured())) {
    redirect('/admin/login?error=missing')
  }

  const password = formData.get('password')

  if (typeof password !== 'string' || !(await validateAdminPassword(password))) {
    redirect('/admin/login?error=invalid')
  }

  await setAdminSession()
  redirect('/admin')
}

export async function logoutAdmin() {
  await clearAdminSession()
  redirect('/admin/login')
}
