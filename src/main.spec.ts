'use strict'

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

describe('[OpLog]', () => {
  let ol: OpLog

  beforeEach(() => {
    // this should construct "c123d"
    ol = new OpLog(new Map([
      [10, {
        type: 'INSERT',
        index: 0,
        timestamp: 10,
        text: 'abcd'
      }],
      [20, {
        type: 'DELETE',
        index: 2,
        timestamp: 20,
        delta: 2
      }],
      [30, {
        type: 'INSERT',
        index: 1,
        timestamp: 30,
        text: '123'
      }],
    ]))
  })

  it('should apply a later change to the end of the log', () => {
    ol.apply({
      type: 'INSERT',
      index: 5,
      timestamp: 40,
      text: '**'
    })

    expect(Array.from(ol.log.keys()).indexOf(40)).to.equal(3)
  })

  // this should fail - 
  it('should insert an earlier change and make conflict adjustments', () => {
    ol.apply({
      type: 'INSERT',
      index: 5,
      timestamp: 25,
      text: '**'
    })

    expect(Array.from(ol.log.keys()).indexOf(25)).to.equal(3)
  })
})