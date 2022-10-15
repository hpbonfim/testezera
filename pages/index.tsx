import type { NextPage } from 'next'
import { useEffect, useRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

const Home: NextPage = () => {
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
          center: new google.maps.LatLng(0, 0),
          zoom: 3
        })
      })
      .catch((error) => {
        console.log(error)
      })
  })

  return <div ref={googlemap} id="map" />
}

export default Home