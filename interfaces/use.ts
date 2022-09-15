import { activity } from "./activity"
import { stored } from "./stored"

export interface use {
  idUse: number,
  quantity: number,
  dateUse: string,
  activity: activity,
  stored: stored
}

export interface useCreate {
  quantity: number,
  activity: {
      idActivity: number,
  },
  stored: {
      idStored: number,
  }
}

