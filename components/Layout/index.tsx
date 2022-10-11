import Head from 'next/head'
import { ReactNode } from 'react'

export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="flex min-h-screen flex-col items-center justify-center py-6">
    <Head>
      <title>Teste/z3rA</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <br />
    {children}
    <br />

    <footer className="flex h-24 w-full items-center justify-center border-t">
      Powered by Henrique
    </footer>
  </div>
)
