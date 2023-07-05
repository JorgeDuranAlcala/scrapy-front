type Coordinates = {
  latitude?: number,
  longitude?: number
}

export type Country = {
  id: number,
  nameEn: string,
  nameEs: string,
  nameNative: string,
  Iso3?: string,
  Iso2?: string,
} & Coordinates

export type State = {
  id: number,
  name: string,
  state_code: string,
  country_id: number,
} & Coordinates

export type City = {
  id: number,
  name: string,
  country_id: number,
  state_id: number,
} & Coordinates
