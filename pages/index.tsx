import type { NextPage } from 'next'
import { Map } from './map'
import { Wrapper, Status } from "@googlemaps/react-wrapper"

const render = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return <div>Carregando...</div>
    case Status.FAILURE:
      return <div>Erro ao carregar. xD</div>
    case Status.SUCCESS:
      return <Map center={null} zoom={null} />
  }
}

const Home: NextPage = () => {
  return <Wrapper
    apiKey={process.env.NEXT_PUBLIC_GOOGLE_API as string}
    version='weekly'
    region='BR'
    language='pt'
    render={render}
  />
}

export default Home