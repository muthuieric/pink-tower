import { Sidebar } from '@/components/admin/Sidebar'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

export default async function ProtectedAdminLayout({ children }: { children: ReactNode }) {
  if (!(await isAdminAuthenticated())) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50/50 flex">
      <Sidebar />
      <div className="flex-1 md:ml-72 w-full max-w-full">
        {/* Mobile Header Spacer */}
        <div className="md:hidden h-16" />
        <div className="p-6 md:p-10 lg:p-12 max-w-6xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
