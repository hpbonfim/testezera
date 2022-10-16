import React from "react"
import { createCustomEqual } from "fast-equals"
import { isLatLngLiteral } from "@googlemaps/typescript-guards"

//@ts-ignore
const deepCompareEqualsForMaps = createCustomEqual((deepEqual) => (a: any, b: any) => {
  // compare if's typeof LatLng
  if (isLatLngLiteral(a) || a instanceof google.maps.LatLng || isLatLngLiteral(b) || b instanceof google.maps.LatLng) {
    return new google.maps.LatLng(a).equals(new google.maps.LatLng(b))
  }

  // use fast-equals for other objects
  //@ts-ignore
  return deepEqual(a, b)
})

function useDeepCompareMemoize(value: any) {
  const ref = React.useRef()

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value
  }

  return ref.current
}

export function useDeepCompareEffectForMaps(callback: React.EffectCallback, dependencies: any[]) {
  React.useEffect(callback, dependencies.map(useDeepCompareMemoize))
}

 