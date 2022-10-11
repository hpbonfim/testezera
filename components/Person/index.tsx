import Link from 'next/link'
import { PersonProps } from './types'

export const PersonComponent = ({ person }: PersonProps) => (
  <div className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600">
    <Link
      href="/person/[id]"
      as={`/person/${person.id}`}
      className="mt-4 text-xl"
    >
      <h3 className="text-2xl font-bold">{person.name} &rarr;</h3>
    </Link>
  </div>
)
