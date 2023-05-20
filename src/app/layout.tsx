import SupabaseProvider from '@/providers/supabase-provider'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Inter } from 'next/font/google'
import { cookies, headers } from 'next/headers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Bill reminder',
  description: 'Track all your monthly bills from the same place',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseProvider session={session}>
          {children}
        </SupabaseProvider>
        </body>
    </html>
  )
}
