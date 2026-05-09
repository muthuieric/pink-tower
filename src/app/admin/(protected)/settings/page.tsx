import { KeyRound, LogOut } from 'lucide-react'
import { logoutAdmin } from '../../login/actions'
import { updateAdminPassword } from './actions'

export const dynamic = 'force-dynamic'

type SearchParams = Promise<{ error?: string | string[] }>

function getErrorMessage(error: string | undefined) {
  if (error === 'current') return 'The current password is incorrect.'
  if (error === 'match') return 'The new passwords do not match.'
  if (error === 'short') return 'Use at least 8 characters for the new password.'
  if (error === 'invalid') return 'Fill in all password fields.'
  return null
}

export default async function AdminSettings({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const { error } = await searchParams
  const errorCode = Array.isArray(error) ? error[0] : error
  const errorMessage = getErrorMessage(errorCode)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-navy">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your admin password and session.</p>
      </div>

      <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex items-start gap-3 mb-6">
          <div className="bg-yellow/20 text-navy p-3 rounded-full">
            <KeyRound size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-navy">Change Password</h2>
            <p className="text-sm text-gray-600 mt-1">Changing the password signs out every current admin session.</p>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-5 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        <form action={updateAdminPassword} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="md:col-span-2 flex flex-col gap-2 text-sm font-medium text-gray-700">
            Current password
            <input name="currentPassword" type="password" required className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow" />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            New password
            <input name="newPassword" type="password" required minLength={8} className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow" />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Confirm new password
            <input name="confirmPassword" type="password" required minLength={8} className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow" />
          </label>
          <div className="md:col-span-2">
            <button type="submit" className="bg-navy text-white px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition">
              Update Password
            </button>
          </div>
        </form>
      </section>

      <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-navy mb-4">Session</h2>
        <form action={logoutAdmin}>
          <button type="submit" className="inline-flex items-center gap-2 bg-navy text-white px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition">
            <LogOut size={18} />
            Sign out
          </button>
        </form>
      </section>
    </div>
  )
}
