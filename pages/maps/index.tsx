import React from 'react'
import { Wrapper, Status } from "@googlemaps/react-wrapper"
import Map from './map'
import Marker from './marker'

export default React.memo(() => (
  <Wrapper
    apiKey={process.env.NEXT_PUBLIC_GOOGLE_API as string}
    version='weekly'
    region='BR'
    language='pt'
    render={Render}
  />
))

function Render(status: Status): JSX.Element {
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
