import { useRouter } from 'next/router'
import useSWR from 'swr'

async function fetcher(url: string) {
  const res = await fetch(url)
  const data = await res.json()

  if (res.status !== 200)
    throw new Error(data.message)

  return data
}

export default function Person() {
  const { query } = useRouter()
  const { data, error } = useSWR(() => query.id && `/api/people/${query.id}`, fetcher)

  if (error) return <div>{error.message}</div>
  if (!data) return <div>Loading...</div>


  return (
    <div className="flex flex-col m-auto">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-white border-b">
                <tr>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Name</th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Height</th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Mass</th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Hair color</th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Skin color</th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Eye color</th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Gender</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{data.name}</td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{data.height}</td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{data.mass}</td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{data.hair_color}</td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{data.skin_color}</td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{data.eye_color}</td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{data.gender}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
