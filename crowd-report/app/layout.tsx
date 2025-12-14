import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './global.css';
import Navbar from '@/components/Navbar';
import { Toaster } from 'react-hot-toast';
import ThemeToggle from '@/components/ThemeToggle';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SafeRouteLK | Crowd Reporting',
  description: 'Community safety reporting system',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-[#0a0a1a]`}>
        {/* Simple background effects */}
        <div className="fixed inset-0 z-0 opacity-20">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute top-60 -left-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          <Navbar />
          <ThemeToggle />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </div>
        
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#1e293b',
              color: '#f1f5f9',
              border: '1px solid rgba(99, 102, 241, 0.3)',
            },
          }}
        />
      </body>
    </html>
  );
}