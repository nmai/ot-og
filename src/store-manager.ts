import { Store, createStore } from 'redux'
import { StoreState } from './interfaces/store-state'
import { textReducer } from './reducers/text.reducer'

export class StoreManager {
  public store: Store<StoreState>

  constructor(initialState: StoreState | undefined) {
    this.initWithState(initialState || {
      text: '',
      version: 0
    })
  }

  initWithState(initialState: StoreState) {
    this.store = createStore<StoreState>(textReducer, initialState)
  }
}