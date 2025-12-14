import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './global.css';
import Navbar from '@/components/Navbar';
import { Toaster } from 'react-hot-toast';
import ThemeToggle from '@/components/ThemeToggle';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SafeRouteLK | Crowd Reporting Portal',
  description: 'Community-powered safety reporting system for Sri Lanka',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-gradien-to-br from-background via-background to-slate-900`}>
        <div className="relative min-h-screen overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute top-60 -left-20 w-60 h-60 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute bottom-40 right-1/3 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
          </div>

          {/* Scan Lines Effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 scan-line opacity-30" />
          </div>

          <div className="relative z-10">
            <Navbar />
            <ThemeToggle />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
          </div>
        </div>
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#1e293b',
              color: '#f1f5f9',
              border: '1px solid rgba(255,255,255,0.1)',
            },
          }}
        />
      </body>
    </html>
  );
}