import React, { useEffect, useRef, useState } from 'react'

interface MapProps {
  center?: google.maps.LatLng | google.maps.LatLngLiteral | null | undefined
  zoom?: number | null | undefined
}

export const Map: React.FC<MapProps> = ({ center, zoom }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map>()

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current || document.getElementById('#map'), {
        center: center || new google.maps.LatLng(0, 0),
        zoom: zoom || 3
      }))
    }
  }, [ref, map])

  return <div ref={ref} id="map" />
}