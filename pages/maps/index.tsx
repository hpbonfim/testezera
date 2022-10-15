import type { NextPage } from 'next'
import Map from './map'
import { Wrapper, Status } from "@googlemaps/react-wrapper"
import React from 'react'
import { Marker } from './marker'

function Component(status: Status): JSX.Element {
  const [markers, setMarkers] = React.useState<google.maps.LatLng[]>([])
  const [zoom, setZoom] = React.useState(3)
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral | google.maps.LatLng>({ lat: 0, lng: 0 })

  function onClick(e: google.maps.MapMouseEvent) {
    setMarkers([...markers, e.latLng!])
    setZoom(15)
    setCenter(e.latLng!)
  }
  
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
          onClick={onClick} 
        >
          {markers.map((latLng, i) => (
            <Marker key={i} position={latLng} />
          ))}
        </Map>
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