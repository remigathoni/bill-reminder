import MainNav from "@/components/Navbar/Main"

export const metadata = {
  title: 'Bill reminder',
  description: 'Add a new bill',
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="px-6 pt-4">
        <MainNav/>
        {children}
    </main>
  )
}
