export interface GetClientInfo {
  geolocation: {
    googleAPI: {
      lat: number
      lng: number
    }
    navigatorAPI: {
      lat: number
      lng: number
    }
  }
  userID: string
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