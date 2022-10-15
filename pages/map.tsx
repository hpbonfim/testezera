import React, { useEffect, useRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

export const Map: React.FC<{ center?: google.maps.LatLng | google.maps.LatLngLiteral | null | undefined, zoom?: number | null | undefined }> = ({ center, zoom }) => {
  const googlemap = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_API as string,
      version: 'weekly',
      region: 'BR',
      language: 'pt'
    })

    loader
      .load()
      .then((google) => {
        const map = new google.maps.Map(googlemap.current! || document.getElementById('#map'), {
          center: center || new google.maps.LatLng(0, 0),
          zoom: zoom || 3
        })
      })
      .catch((error) => {
        console.log(error)
      })
  })

  return <div ref={googlemap} id="map" />
}