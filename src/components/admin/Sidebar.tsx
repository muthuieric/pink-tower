import Link from 'next/link';
import { LayoutDashboard, CalendarDays, BookOpen, Image as ImageIcon, Settings, LogOut } from 'lucide-react';
import { logoutAdmin } from '@/app/admin/login/actions';

export function Sidebar() {
  return (
    <div className="w-64 bg-navy text-white min-h-screen p-4 flex flex-col fixed left-0 top-0 bottom-0 z-50">
      <div className="mb-8 mt-4 px-2">
        <Link href="/" className="text-xl font-bold flex flex-col">
          <span className="text-yellow">Pink Tower</span>
          <span className="text-sm font-medium text-gray-300">Admin Panel</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-2">
        <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white/10 transition-colors">
          <LayoutDashboard size={20} className="text-yellow" />
          Dashboard
        </Link>
        <Link href="/admin/events" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white/10 transition-colors">
          <CalendarDays size={20} className="text-yellow" />
          Events
        </Link>
        <Link href="/admin/journal" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white/10 transition-colors">
          <BookOpen size={20} className="text-yellow" />
          Journal
        </Link>
        <Link href="/admin/gallery" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white/10 transition-colors">
          <ImageIcon size={20} className="text-yellow" />
          Gallery
        </Link>
        <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white/10 transition-colors">
          <Settings size={20} className="text-yellow" />
          Settings
        </Link>
      </nav>

      <div className="mt-auto border-t border-white/20 pt-4">
        <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white/10 transition-colors">
          Site Home
        </Link>
        <form action={logoutAdmin}>
          <button type="submit" className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-white/10 transition-colors text-red-400">
          <LogOut size={20} />
          Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}
