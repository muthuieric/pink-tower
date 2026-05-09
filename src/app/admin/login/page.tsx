import { LockKeyhole } from 'lucide-react'
import { redirect } from 'next/navigation'
import { isAdminAuthenticated, isAdminPasswordConfigured } from '@/lib/admin-auth'
import { loginAdmin } from './actions'

type SearchParams = Promise<{ error?: string | string[] }>

export const metadata = {
  title: 'Admin Login | Pink Tower',
}

export default async function AdminLogin({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  if (await isAdminAuthenticated()) {
    redirect('/admin')
  }

  const { error } = await searchParams
  const errorCode = Array.isArray(error) ? error[0] : error
  const passwordConfigured = await isAdminPasswordConfigured()

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-lg shadow-sm p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-yellow/20 text-navy p-3 rounded-full">
            <LockKeyhole size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-navy">Admin Login</h1>
            <p className="text-sm text-gray-600">Pink Tower content management</p>
          </div>
        </div>

        {!passwordConfigured && (
          <div className="mb-5 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
            Add ADMIN_PASSWORD to .env, then restart the dev server.
          </div>
        )}

        {errorCode === 'invalid' && (
          <div className="mb-5 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
            The password is incorrect.
          </div>
        )}

        <form action={loginAdmin} className="space-y-5">
          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Password
            <input
              name="password"
              type="password"
              required
              disabled={!passwordConfigured}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow disabled:bg-gray-100"
            />
          </label>
          <button
            type="submit"
            disabled={!passwordConfigured}
            className="w-full bg-navy text-white px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            Sign in
          </button>
        </form>
      </div>
    </main>
  )
}
