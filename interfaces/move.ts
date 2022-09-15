import { stored } from "./stored"

export interface move {
  idMove: number,
  quantity: number,
  dateMove: string,
  storedTake: stored,
  storedGive: stored
}

export interface moveCreate {
  quantity: number,
  storedTake: {
    idStored: number
  },
  storedGive: {
    idStored: number
  }
}

export interface moveCreateWhithStore {
  quantity: number,
  material: {
    idMaterial: number
  },
  storeTake: {
    idStore: number
  },
  storeGive: {
    idStore: number
  }
}
