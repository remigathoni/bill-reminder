import MainNav from '@/components/Navbar/Main'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Edit bill',
  description: 'Track all your monthly bills from the same place',
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {

  
  return (
    <main className={`${inter.className} px-6 py-4`}>
          <MainNav/>
          {children}
    </main>
  )
}
