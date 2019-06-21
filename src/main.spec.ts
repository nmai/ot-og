import { expect } from 'chai'
import { StoreManager } from './store-manager'
import { DeleteOp } from './ops/delete-op'
import { InsertOp } from './ops/insert-op'
import { OpLog } from './oplog'

describe('[Store] Atomic operations on a live Store', () => {
  let sm: StoreManager

  beforeEach(() => {
    sm = new StoreManager({
      text: '12345678',
      version: 0
    })
  })

  describe ('[Operation] Delete', () => {

    it ('remove first character', () => {
      sm.store.dispatch(new DeleteOp(1, 1).toOp())
      expect(sm.store.getState().text).to.equal('2345678')
    })

    it ('remove two characters from middle', () => {
      sm.store.dispatch(new DeleteOp(6, 2).toOp())
      expect(sm.store.getState().text).to.equal('123478')
    })

    it ('remove all characters', () => {
      sm.store.dispatch(new DeleteOp(8, 8).toOp())
      expect(sm.store.getState().text).to.equal('')
    })

  })

  describe ('[Operation] Insert', () => {

    it ('insert one character at beginning', () => {
      sm.store.dispatch(new InsertOp(0, '*').toOp())
      expect(sm.store.getState().text).to.equal('*12345678')
    })

    it ('insert two characters in middle', () => {
      sm.store.dispatch(new InsertOp(4, '**').toOp())
      expect(sm.store.getState().text).to.equal('1234**5678')
    })

    it ('insert three characters at end', () => {
      sm.store.dispatch(new InsertOp(8, '***').toOp())
      expect(sm.store.getState().text).to.equal('12345678***')
    })

  })
})

describe('[Store] Complex operations on a live Store', () => {
  let sm: StoreManager

  beforeEach(() => {
    sm = new StoreManager({
      text: '0000',
      version: 0
    })
  })

  describe ('Chaining', () => {

    it ('6x insert/delete operations consecutively', () => {
      sm.store.dispatch(new InsertOp(1, '*').toOp())
      sm.store.dispatch(new DeleteOp(1, 1).toOp())
      sm.store.dispatch(new InsertOp(4, '**').toOp())
      sm.store.dispatch(new DeleteOp(6, 2).toOp())
      sm.store.dispatch(new InsertOp(4, '****').toOp())
      sm.store.dispatch(new DeleteOp(5, 3).toOp())

      expect(sm.store.getState().text).to.equal('*0***')
    })

  })

})
