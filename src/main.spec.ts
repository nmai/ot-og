'use strict'

import { expect } from 'chai'

let Core = require('./lib/core').Core

let Interfaces = require('./lib/interfaces'),
    Operation = Interfaces.Operation,
    Processor = Interfaces.Processor

let Models = require('./lib/models'),
    BaseOp = Models.BaseOp,
    DeleteOp = Models.DeleteOp,
    WriteOp = Models.WriteOp

let TextProcessor = require('./lib/processors/text').TextProcessor

// -----------------------------

import { StoreManager } from './store-manager'
import {
  createInsertAction,
  createDeleteAction
} from './actions'

describe('[Core] Action Creators (Operations)', () => {

  it('InsertAction', () => {

    expect(createInsertAction(0, '')).to.equal
  })

  it ('Operations have types', () => {
    let base = new BaseOp(),
        del = new DeleteOp(),
        write = new WriteOp()

    expect(base.type).to.equal('BaseOp')
    expect(del.type).to.equal('DeleteOp')
    expect(write.type).to.equal('WriteOp')
  })
})

describe('[Core] Operating on a live Store', () => {
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

  describe ('Chaining', () => {
    it ('6x insert/delete operations consecutively', () => {

    })
    it ('deprecated', () => {
      let x = '0000'
      let textProcessor = new TextProcessor(x)
      
      let write1at1 = new WriteOp(1, '*')
      let write2at4 = new WriteOp(4, '**')
      let write4at4 = new WriteOp(4, '****')
      let del1at1 = new DeleteOp(1, 1)
      let del2at6 = new DeleteOp(6, 2)
      let del3at5 = new DeleteOp(5, 3)

      textProcessor.apply(write1at1) ;console.log(textProcessor.snapshot) // 0*000
      textProcessor.apply(del1at1) ;console.log(textProcessor.snapshot) // *000
      textProcessor.apply(write2at4) ;console.log(textProcessor.snapshot) // *000**
      textProcessor.apply(del2at6) ;console.log(textProcessor.snapshot) // *000
      textProcessor.apply(write4at4) ;console.log(textProcessor.snapshot) // *000****
      textProcessor.apply(del3at5) ;console.log(textProcessor.snapshot) // *0***
      
      expect(textProcessor.snapshot).to.equal('*0***')
    })
  })

  it ('should resolve a conflicting change response', () => {
    
  })

  it ('should track revision and pending revision', () => {

  })

  it ('should send a message with a properly formatted operation', () => {

  })


  // optional
  it ('should aggregate a list of pending operations before sending', () => {

  })
})