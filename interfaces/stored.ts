import { material } from "./material"
import { store } from "./store"

export interface stored {
  idStored: number,
  quantity: number,
  material: material,
  store: store
}

export interface storedCreate {
  material: {
      idMaterial: number,
  },
  store: {
      idStore: number,
  }
}

