import Head from 'next/head'

export const Layout: React.FC<{ children: JSX.Element }> = ({ children }) => (
  <div className="flex min-h-screen flex-col items-center justify-center py-2">
    <Head>
      <title>Testezera</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    {children}

    <br />

    <footer className="flex h-24 w-full items-center justify-center border-t">
      Powered by Henrique
    </footer>
  </div>
)
