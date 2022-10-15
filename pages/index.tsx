import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div className="mt-8 flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">
        <code className="rounded-md bg-gray-100 p-3 font-mono text-5xl">
          Teste/z3rA
        </code>
      </h1>

      <div className="mt-8 flex items-center justify-center w-full">
        <a href="/maps" className="rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600">
          <p className="text-xl">Acesse aqui</p>
          <h3 className="text-2xl font-bold">Google Maps &rarr;</h3>
        </a>
      </div>
    </div>
  )
}

export default Home