/**
 * Various operational transform (OT) operations defined as Redux actions
 */

import {
  InsertAction, INSERT,
  DeleteAction, DELETE
} from '../interfaces/actions.d'

export function createInsertAction(index: number, text: string): InsertAction {
  return {
    type: INSERT,
    index: index,
    text: text
  }
}

export function createDeleteAction(index: number, delta: number): DeleteAction {
  return {
    type: DELETE,
    index: index,
    delta: delta
  }
}
