'use strict'

import { expect } from 'chai'
import { StoreManager } from './store-manager'
import {
  createInsertAction,
  createDeleteAction,
} from './actions'
import {
  InsertAction, INSERT,
  DeleteAction, DELETE
} from './interfaces/actions.d'  // gahhh ts/jest is so annoying

describe('[Core] Action Creators (Operations)', () => {

  it('InsertAction', () => {
    expect(createInsertAction(3, 'asdf')).to.deep.equal(<InsertAction>{
      type: INSERT,
      index: 3,
      text: 'asdf'
    })
  })

  it ('DeleteAction', () => {
    expect(createDeleteAction(3, 3)).to.deep.equal(<DeleteAction>{
      type: DELETE,
      index: 3,
      delta: 3
    })
  })

})

describe('[Core] Atomic operations on a live Store', () => {
  let sm: StoreManager

  beforeEach(() => {
    sm = new StoreManager({
      text: '12345678',
      version: 0
    })
  })

  describe ('[Operation] Delete', () => {

    it ('remove first character', () => {
      sm.store.dispatch(createDeleteAction(1, 1))
      expect(sm.store.getState().text).to.equal('2345678')
    })

    it ('remove two characters from middle', () => {
      sm.store.dispatch(createDeleteAction(6, 2))
      expect(sm.store.getState().text).to.equal('123478')
    })

    it ('remove all characters', () => {
      sm.store.dispatch(createDeleteAction(8, 8))
      expect(sm.store.getState().text).to.equal('')
    })

  })

  describe ('[Operation] Insert', () => {

    it ('insert one character at beginning', () => {
      sm.store.dispatch(createInsertAction(0, '*'))
      expect(sm.store.getState().text).to.equal('*12345678')
    })

    it ('insert two characters in middle', () => {
      sm.store.dispatch(createInsertAction(4, '**'))
      expect(sm.store.getState().text).to.equal('1234**5678')
    })

    it ('insert three characters at end', () => {
      sm.store.dispatch(createInsertAction(8, '***'))
      expect(sm.store.getState().text).to.equal('12345678***')
    })

  })
})

describe('[Core] Complex operations on a live Store', () => {
  let sm: StoreManager

  beforeEach(() => {
    sm = new StoreManager({
      text: '0000',
      version: 0
    })
  })

  describe ('Chaining', () => {

    it ('6x insert/delete operations consecutively', () => {
      sm.store.dispatch(createInsertAction(1, '*'))
      sm.store.dispatch(createDeleteAction(1, 1))
      sm.store.dispatch(createInsertAction(4, '**'))
      sm.store.dispatch(createDeleteAction(6, 2))
      sm.store.dispatch(createInsertAction(4, '****'))
      sm.store.dispatch(createDeleteAction(5, 3))

      expect(sm.store.getState().text).to.equal('*0***')
    })

  })

  xit ('should resolve a conflicting change response', () => {
    
  })

  xit ('should track revision and pending revision', () => {

  })

  xit ('should send a message with a properly formatted operation', () => {

  })


  // optional
  xit ('should aggregate a list of pending operations before sending', () => {

  })
})