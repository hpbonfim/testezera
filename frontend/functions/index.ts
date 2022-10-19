import { GetClientInfo } from "./types"
import crypto from 'crypto'

export function getGoogleGeolocation(): Promise<{ lat: number, lng: number }> {
  return new Promise((resolve) => {
    fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.NEXT_PUBLIC_GOOGLE_API}`, { method: 'POST' })
      .then(body => body.json())
      .then(response => resolve(response.location))
      .catch(_err => resolve({ lat: -1, lng: -1 }))
  })
}

export function getClientGeolocation(): Promise<{ lat: number, lng: number }> {
  return new Promise((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve({ lat: position.coords.latitude, lng: position.coords.longitude }),
        (_err) => resolve({ lat: 0, lng: 0 })
      )
    } else {
      resolve({ lat: 0, lng: 0 })
    }
  })
}

export function getClientInfo(): Promise<GetClientInfo> {
  const OS_LIST = [
    { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
    { name: 'Windows', value: 'Win', version: 'NT' },
    { name: 'iPhone', value: 'iPhone', version: 'OS' },
    { name: 'iPad', value: 'iPad', version: 'OS' },
    { name: 'Kindle', value: 'Silk', version: 'Silk' },
    { name: 'Android', value: 'Android', version: 'Android' },
    { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
    { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
    { name: 'Macintosh', value: 'Mac', version: 'OS X' },
    { name: 'Linux', value: 'Linux', version: 'rv' },
    { name: 'Palm', value: 'Palm', version: 'PalmOS' }
  ]

  const BROWSER_LIST = [
    { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
    { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
    { name: 'Safari', value: 'Safari', version: 'Version' },
    { name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
    { name: 'Opera', value: 'Opera', version: 'Opera' },
    { name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
    { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
  ]

  async function getClientIp(): Promise<{ ip: string }> {
    return new Promise((resolve) => {
      fetch('https://api64.ipify.org?format=json')
        .then(body => body.json())
        .then(response => { resolve(response) })
        .catch(_err => { resolve({ ip: '' }) })
    })
  }

  function matchItem(string: any, data: any) {
    let i = 0, j = 0, regex, regexv, match, matches, version;

    for (i = 0; i < data.length; i += 1) {
      regex = new RegExp(data[i].value, 'i')
      match = regex.test(string)
      if (match) {
        regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
        matches = string.match(regexv)
        version = ''
        if (matches) { if (matches[1]) { matches = matches[1] } }
        if (matches) {
          matches = matches.split(/[._]+/)
          for (j = 0; j < matches.length; j += 1) {
            if (j === 0) {
              version += matches[j] + '.'
            } else {
              version += matches[j]
            }
          }
        } else {
          version = '0'
        }
        return {
          name: data[i].name,
          version: parseFloat(version)
        }
      }
    }
    return { name: 'unknown', version: 0 }
  }

  return new Promise(async (resolve) => {
    const agent = [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor].join(' ')

    resolve({
      geolocation: {
        googleAPI: await getGoogleGeolocation(),
        navigatorAPI: { lat: 0, lng: 0 }
      },
      userID: localStorage.getItem('id') || crypto.randomBytes(20).toString('hex'),
      ip: await (await getClientIp()).ip,
      os: matchItem(agent, OS_LIST),
      browser: matchItem(agent, BROWSER_LIST),
      navigator: {
        userAgent: navigator.userAgent,
        appVersion: navigator.appVersion,
        platform: navigator.platform,
        vendor: navigator.vendor
      }
    })
  })
}
