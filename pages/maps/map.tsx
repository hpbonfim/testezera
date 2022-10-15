import React, { useEffect, useRef, useState } from 'react'
import { useDeepCompareEffectForMaps } from '@hooks/useDeepCompareEffectForMaps'

interface MapProps extends google.maps.MapOptions {
  style?: { [key: string]: string }
  center?: google.maps.LatLng | google.maps.LatLngLiteral | null | undefined
  zoom?: number | null | undefined
  onClick?: (e: google.maps.MapMouseEvent) => void
  children?: React.ReactNode
}

const Map: React.FC<MapProps> = ({ ...props }) => {
  const { style, center, zoom, onClick, children } = props
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

  useDeepCompareEffectForMaps(() => map && map.setOptions(props), [map, props])

  useEffect(() => {
    if (map) {
      google.maps.event.clearListeners(map, "click")
      onClick && map.addListener("click", onClick)
    }
  }, [map, onClick])

  return (
    <>
      <div ref={ref} id="map" style={style} />
      {React.Children.map(children, (child) => React.isValidElement(child) && React.cloneElement(child, { map } as any))}
    </>
  )
}

export default React.memo(Map)
