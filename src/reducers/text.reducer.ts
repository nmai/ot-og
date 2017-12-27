import { StoreState } from '../interfaces/store-state'
import { INSERT, DELETE, OTAction } from '../interfaces/actions'


// @TODO: take time dimension into account

export function textReducer(state: StoreState, action: OTAction): StoreState {
  let newStateShallow = {...state}
  switch (action.type) {
    case INSERT:
      newStateShallow.text = insertFragment(newStateShallow.text, action.text, action.index)
      return newStateShallow
    case DELETE:
      newStateShallow.text = deleteFragment(newStateShallow.text, action.delta, action.index)
      return newStateShallow
    default:
      // we don't know how to handle this action type... for now we do nothing
      return newStateShallow
  }
}

function insertFragment(original: string, fragment: string, index: number): string {
  let start = original.substring(0, index)
  let end = original.substring(index)
  return `${start}${fragment}${end}`
}

function deleteFragment(original: string, delta: number, index: number): string {
  let start = original.substring(0, index - delta)
  let end = original.substring(index)
  return `${start}${end}`
}
