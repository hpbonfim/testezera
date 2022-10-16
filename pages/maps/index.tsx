import React, { useEffect } from 'react'
import { Wrapper, Status } from "@googlemaps/react-wrapper"
import Map from './map'
import Marker from './marker'
import { getClientGeolocation, getClientInfo } from '@functions/index'

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

  function setLocationAndFocus(LatLng: google.maps.LatLng) {
    setMarkers([...markers, LatLng])
    setZoom(15)
    setCenter(LatLng)
  }

  useEffect(() => {
    getClientInfo()
      .then(async (info) => {
        const { geolocation } = info
        try {
          if (navigator.geolocation) {
            const LatLng = await getClientGeolocation()
            if (JSON.stringify(LatLng) === JSON.stringify({ lat: 0, lng: 0 })) throw new Error('not allowed')
            else setLocationAndFocus(LatLng as any)
          } else throw new Error('dont work')
        } catch (error) {
          setLocationAndFocus(geolocation as any)
        }
      })
  }, [])

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
          onClick={(e: google.maps.MapMouseEvent) => setLocationAndFocus(e.latLng!)}
        >
          {markers.map((latLng, i) => (
            <Marker key={i} position={latLng} />
          ))}
        </Map>
      )
  }
}
