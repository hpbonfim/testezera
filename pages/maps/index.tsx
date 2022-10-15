import type { NextPage } from 'next'
import { Map } from './map'
import { Wrapper, Status } from "@googlemaps/react-wrapper"
import React from 'react'

function Component(status: Status): JSX.Element {
  const [zoom, setZoom] = React.useState(3)
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral | google.maps.LatLng>({ lat: 0, lng: 0 })

  switch (status) {
    case Status.LOADING:
      return <div>Carregando...</div>
    case Status.FAILURE:
      return <div>Erro ao carregar. xD</div>
    case Status.SUCCESS:
      return (
        <Map
          zoom={zoom}
          center={center}
        />
      )
  }
}

const Index: NextPage = () => (
  <Wrapper
    apiKey={process.env.NEXT_PUBLIC_GOOGLE_API as string}
    version='weekly'
    region='BR'
    language='pt'
    render={Component}
  />
)

export default Index