import { NextApiRequest, NextApiResponse } from 'next'
import { PersonTypes, ResponseError } from './types'

export default function personHandler(
  req: NextApiRequest,
  res: NextApiResponse<PersonTypes | ResponseError>
) {
  const { query } = req
  const { id } = query
  const filtered = people.filter((p) => p.id === id)

  // User with id exists
  return filtered.length > 0
    ? res.status(200).json(filtered[0])
    : res.status(404).json({ message: `User with id: ${id} not found.` })
}

const people = [
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
