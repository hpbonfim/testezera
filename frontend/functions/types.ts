export interface GetClientInfo {
  geolocation: { lat: number, lng: number }
  ip: string
  os: {
    name: string
    version: number
  }
  browser: {
    name: string
    version: number
  }
  navigator: {
    userAgent: string
    appVersion: string
    platform: string
    vendor: string
  }
}