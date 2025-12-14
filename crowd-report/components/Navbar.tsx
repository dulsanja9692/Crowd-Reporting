'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Map, 
  AlertTriangle, 
  Shield, 
  BarChart3, 
  Upload,
  Menu,
  X,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { href: '/', label: 'Dashboard', icon: <Home className="w-5 h-5" /> },
  { href: '/submit', label: 'Submit Report', icon: <Upload className="w-5 h-5" /> },
  { href: '/map', label: 'Live Map', icon: <Map className="w-5 h-5" /> },
  { href: '/alerts', label: 'Alerts', icon: <AlertTriangle className="w-5 h-5" /> },
  { href: '/stats', label: 'Statistics', icon: <BarChart3 className="w-5 h-5" /> },
  { href: '/profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <nav className="glass-card sticky top-4 mx-4 mt-4 rounded-2xl z-50 border-white/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradien-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -inset-1 bg-primary/30 blur-md rounded-xl -z-10" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">SafeRouteLK</h1>
                <p className="text-xs text-accent/80">Crowd Reporting Portal</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 ${
                      isActive 
                        ? 'bg-primary/20 text-primary border border-primary/30' 
                        : 'hover:bg-white/5 text-gray-300 hover:text-white'
                    }`}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-primary/10 rounded-lg -z-10"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-24 glass-card rounded-2xl z-40 md:hidden"
          >
            <div className="p-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    pathname === item.href
                      ? 'bg-primary/20 text-primary'
                      : 'hover:bg-white/5 text-gray-300'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}