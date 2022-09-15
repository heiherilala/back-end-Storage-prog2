export interface material {
  idMaterial: number,
  name: string,
  volumeM3Unit: number,
  weightKgUnit: number,
  description: string,
  unit: string,
  limitMax: number,
  limitMin: number
}

export interface materialCreate {
  name: string,
  volumeM3Unit: number,
  weightKgUnit: number,
  description: string,
  unit: string,
  limitMax: number,
  limitMin: number
}

