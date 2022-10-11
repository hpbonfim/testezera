import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { Layout } from '../components/Layout'
import { PersonComponent } from '../components/Person'
import { Person } from '../components/Person/types'

const Home: NextPage = () => {
  const { data, error } = useSWR('/api/people', (url: string) => fetch(url).then((res) => res.json()))
  const [dataTable, setDataTable] = useState<typeof mock_people>()

  useEffect(() => {
    if (!error) {
      if (data)
        setDataTable(data)
      else
        setDataTable(mock_people)
    } else
      setDataTable(mock_people)
  }, [data, error])

  return (
    <Layout>
      <h1 className="text-6xl font-bold">
        Bem vindo ao&nbsp;
        <code className="rounded-md bg-gray-100 p-3 font-mono text-5xl">
          Teste/z3rA
        </code>
      </h1>

      <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
        {dataTable && dataTable.map((p: Person) => <PersonComponent key={p.id} person={p} />)}
      </div>

      <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
        <a
          href="https://nextjs.org/docs"
          className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
        >
          <h3 className="text-2xl font-bold">Documentation &rarr;</h3>
          <p className="mt-4 text-xl">
            Find in-depth information about Next.js features and its API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn"
          className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
        >
          <h3 className="text-2xl font-bold">Learn &rarr;</h3>
          <p className="mt-4 text-xl">
            Learn about Next.js in an interactive course with quizzes!
          </p>
        </a>

        <a
          href="https://github.com/vercel/next.js/tree/canary/examples"
          className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
        >
          <h3 className="text-2xl font-bold">Examples &rarr;</h3>
          <p className="mt-4 text-xl">
            Discover and deploy boilerplate example Next.js projects.
          </p>
        </a>

        <a
          href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
        >
          <h3 className="text-2xl font-bold">Deploy &rarr;</h3>
          <p className="mt-4 text-xl">
            Instantly deploy your Next.js site to a public URL with Vercel.
          </p>
        </a>
      </div>
    </Layout >
  )
}

export default Home

const mock_people = [
  {
    id: '1',
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    gender: 'male',
  },
  {
    id: '2',
    name: 'C-3PO',
    height: '167',
    mass: '75',
    hair_color: 'n/a',
    skin_color: 'gold',
    eye_color: 'yellow',
    gender: 'n/a',
  },
  {
    id: '3',
    name: 'R2-D2',
    height: '96',
    mass: '32',
    hair_color: 'n/a',
    skin_color: 'white, blue',
    eye_color: 'red',
    gender: 'n/a',
  },
  {
    id: '4',
    name: 'Darth Vader',
    height: '202',
    mass: '136',
    hair_color: 'none',
    skin_color: 'white',
    eye_color: 'yellow',
    gender: 'male',
  },
  {
    id: '5',
    name: 'Leia Organa',
    height: '150',
    mass: '49',
    hair_color: 'brown',
    skin_color: 'light',
    eye_color: 'brown',
    gender: 'female',
  },
  {
    id: '6',
    name: 'Owen Lars',
    height: '178',
    mass: '120',
    hair_color: 'brown, grey',
    skin_color: 'light',
    eye_color: 'blue',
    gender: 'male',
  },
  {
    id: '7',
    name: 'Beru Whitesun Lars',
    height: '165',
    mass: '75',
    hair_color: 'brown',
    skin_color: 'light',
    eye_color: 'blue',
    gender: 'female',
  },
  {
    id: '8',
    name: 'R5-D4',
    height: '97',
    mass: '32',
    hair_color: 'n/a',
    skin_color: 'white, red',
    eye_color: 'red',
    gender: 'n/a',
  },
  {
    id: '9',
    name: 'Biggs Darklighter',
    height: '183',
    mass: '84',
    hair_color: 'black',
    skin_color: 'light',
    eye_color: 'brown',
    gender: 'male',
  },
  {
    id: '10',
    name: 'Obi-Wan Kenobi',
    height: '182',
    mass: '77',
    hair_color: 'auburn, white',
    skin_color: 'fair',
    eye_color: 'blue-gray',
    gender: 'male',
  },
]
