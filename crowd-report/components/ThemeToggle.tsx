'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';

type Theme = 'light' | 'dark' | 'system';

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark';
  const stored = localStorage.getItem('theme') as Theme;
  return stored || 'dark';
};

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  const themes: { id: Theme; label: string; icon: React.ReactNode }[] = [
    { id: 'light', label: 'Light', icon: <Sun className="w-4 h-4" /> },
    { id: 'dark', label: 'Dark', icon: <Moon className="w-4 h-4" /> },
    { id: 'system', label: 'System', icon: <Monitor className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {/* Floating Button */}
        <div className="relative group">
          <button className="w-14 h-14 rounded-full bg-gradien-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all">
            <div className="text-white">
              {theme === 'light' ? <Sun className="w-6 h-6" /> :
               theme === 'dark' ? <Moon className="w-6 h-6" /> :
               <Monitor className="w-6 h-6" />}
            </div>
          </button>
          
          {/* Options Panel */}
          <div className="absolute bottom-full right-0 mb-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
            <div className="glass-card rounded-2xl p-3 space-y-2 min-w-[140px]">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`w-full px-4 py-2 rounded-lg flex items-center space-x-3 transition-colors ${
                    theme === t.id
                      ? 'bg-primary/20 text-primary'
                      : 'hover:bg-white/5 text-gray-300'
                  }`}
                >
                  {t.icon}
                  <span className="text-sm font-medium">{t.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Ripple Effect */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
          <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping delay-300" />
        </div>
      </div>
    </div>
  );
}