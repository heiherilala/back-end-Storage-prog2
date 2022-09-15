export interface store {
  idStore: number,
  name: string,
  booleanFull: boolean,
  place: string,
  actualWeigthKg: number,
  actualVolumeM3: number,
  maxWeigthKg: number,
  maxVolumeM3: number
}

export interface storeCreate {
  name: string,
  place: string,
  maxWeigthKg: number,
  maxVolumeM3: number
}

