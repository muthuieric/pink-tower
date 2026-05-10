"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { LayoutDashboard, CalendarDays, BookOpen, Image as ImageIcon, Settings, LogOut, Menu, X, Home } from 'lucide-react';
import { logoutAdmin } from '@/app/admin/login/actions';

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar on route change on mobile
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/events', label: 'Events', icon: CalendarDays },
    { href: '/admin/journal', label: 'Journal', icon: BookOpen },
    { href: '/admin/gallery', label: 'Gallery', icon: ImageIcon },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-navy text-white z-40 flex items-center justify-between px-6 shadow-xl shadow-indigo-900/10">
        <Link href="/admin" className="font-extrabold text-xl text-yellow tracking-tight">Pink Tower Admin</Link>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="text-white hover:text-yellow transition-colors p-2 -mr-2"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-navy/60 z-40 backdrop-blur-sm transition-opacity" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      {/* Sidebar Content */}
      <div className={`
        fixed left-0 top-0 bottom-0 z-50 w-72 bg-navy text-white flex flex-col shadow-2xl shadow-indigo-900/20
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Scrollable Container */}
        <div className="flex-1 flex flex-col overflow-y-auto scrollbar-hide py-6">
          {/* Logo Section */}
          <div className="mb-10 px-8">
            <Link href="/" className="flex flex-col group inline-block">
              <span className="text-3xl font-extrabold tracking-tight text-yellow transition-transform duration-300 group-hover:scale-105 origin-left">Pink Tower</span>
              <span className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">Admin Panel</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-2 px-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className={`
                    flex items-center gap-4 px-6 py-4 rounded-full transition-all duration-300 font-bold text-lg
                    hover:shadow-lg hover:-translate-y-0.5 active:scale-95
                    ${isActive 
                      ? 'bg-purple text-yellow shadow-md' 
                      : 'hover:bg-white/10 text-gray-200 hover:text-white'}
                  `}
                >
                  <Icon size={22} className={isActive ? 'text-yellow' : 'text-gray-400 group-hover:text-yellow transition-colors'} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="mt-8 border-t border-white/10 pt-6 px-4 space-y-2 pb-6">
            <Link 
              href="/" 
              className="flex items-center gap-4 px-6 py-4 rounded-full hover:bg-white/10 transition-all duration-300 font-bold hover:-translate-y-0.5 active:scale-95 text-gray-300 hover:text-white text-lg"
            >
              <Home size={22} className="text-gray-400" />
              Site Home
            </Link>
            <form action={logoutAdmin} className="w-full">
              <button 
                type="submit" 
                className="w-full flex items-center gap-4 px-6 py-4 rounded-full hover:bg-red-500/20 transition-all duration-300 font-bold text-red-400 hover:text-red-300 hover:-translate-y-0.5 active:scale-95 text-lg"
              >
                <LogOut size={22} />
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
