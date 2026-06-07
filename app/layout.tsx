import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SmartCents - Personal Finance Tips',
  description: 'Practical personal finance advice to help you save more, spend smarter, and build wealth.',
  keywords: 'personal finance, money tips, budgeting, saving money, investing basics',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content={process.env.NEXT_PUBLIC_ADSENSE_ID || ''} />
      </head>
      <body className="bg-gray-50 text-gray-900">
        <header className="bg-white border-b border-gray-200 py-4 px-6">
          <div className="max-w-4xl mx-auto">
            <a href="/" className="text-2xl font-bold text-green-700">SmartCents 💰</a>
            <p className="text-sm text-gray-500">Practical money tips for everyday life</p>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-6 py-8">
          {children}
        </main>
        <footer className="border-t border-gray-200 mt-16 py-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} SmartCents. For informational purposes only.
        </footer>
      </body>
    </html>
  )
}
