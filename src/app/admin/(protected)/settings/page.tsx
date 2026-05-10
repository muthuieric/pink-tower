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
    <div className="space-y-16 py-10 md:py-16">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-indigo-900/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-navy">Settings</h1>
          <p className="text-xl text-slate-600 leading-relaxed mt-4 max-w-2xl">Manage your admin password and session.</p>
        </div>
      </div>

      <section className="bg-white rounded-3xl shadow-xl shadow-indigo-900/10 border-0 p-8 md:p-12">
        <div className="flex items-start gap-4 mb-8">
          <div className="bg-yellow/20 text-navy p-4 rounded-full">
            <KeyRound size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-navy">Change Password</h2>
            <p className="text-base text-slate-600 mt-1">Changing the password signs out every current admin session.</p>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-8 rounded-2xl border border-red-100 bg-red-50 px-6 py-4 text-base font-bold text-red-700 shadow-sm">
            {errorMessage}
          </div>
        )}

        <form action={updateAdminPassword} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="md:col-span-2 flex flex-col gap-2 text-sm font-bold text-navy">
            Current password
            <input name="currentPassword" type="password" required className="px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow/20 focus:border-yellow transition-all text-base font-medium" />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-navy">
            New password
            <input name="newPassword" type="password" required minLength={8} className="px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow/20 focus:border-yellow transition-all text-base font-medium" />
          </label>
          <label className="flex flex-col gap-2 text-sm font-bold text-navy">
            Confirm new password
            <input name="confirmPassword" type="password" required minLength={8} className="px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow/20 focus:border-yellow transition-all text-base font-medium" />
          </label>
          <div className="md:col-span-2 mt-4">
            <button type="submit" className="bg-navy text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-purple active:scale-95 text-lg w-full md:w-auto">
              Update Password
            </button>
          </div>
        </form>
      </section>

      <section className="bg-white rounded-3xl shadow-xl shadow-indigo-900/10 border-0 p-8">
        <div className="flex items-start gap-4 mb-8">
          <div className="bg-red-50 text-red-600 p-4 rounded-full">
            <LogOut size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-navy">Session</h2>
            <p className="text-base text-slate-600 mt-1">Sign out of your current admin session.</p>
          </div>
        </div>
        <form action={logoutAdmin}>
          <button type="submit" className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-8 py-4 rounded-full font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-red-600 hover:text-white active:scale-95 text-lg w-full md:w-auto justify-center">
            <LogOut size={20} />
            Sign out
          </button>
        </form>
      </section>
    </div>
  )
}
