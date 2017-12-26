
import { Action } from 'redux'

export const INSERT    = '[OTAction] Insert'
export const DELETE    = '[OTAction] Delete'

export interface InsertAction extends Action {
  index: number
  text: string
}

export interface DeleteAction extends Action {
  index: number
  delta: number
}

export type OTAction =
  | InsertAction
  | DeleteAction