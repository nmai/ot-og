'use strict'

let expect = require('chai').expect

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

describe('client', () => {
  let sm: StoreManager

  beforeEach(() => {
    sm = new StoreManager({
      text: '12345678',
      version: 0
    })
  })

  it ('operations have types', () => {
    let base = new BaseOp(),
        del = new DeleteOp(),
        write = new WriteOp()

    expect(base.type).to.equal('BaseOp')
    expect(del.type).to.equal('DeleteOp')
    expect(write.type).to.equal('WriteOp')
  })

  it ('Delete action', () => {
    let del1at1 = createDeleteAction(1, 1)

    console.log(del1at1)

    let del2at6 = createDeleteAction(6, 2)
    let del8at8 = createDeleteAction(8, 8)

    sm.store.dispatch(del1at1)
    expect(sm.store.getState().text).to.equal('2345678')

    // sm.store.dispatch(del2at6)
    // expect(sm.store.getState().text).to.equal('123478')

    // sm.store.dispatch(del8at8)
    // expect(sm.store.getState().text).to.equal('')
  })

  it ('Delete operation', () => {
    let x = '12345678'

    let del1at1 = new DeleteOp(1, 1)
    let del2at6 = new DeleteOp(6, 2)
    let del8at8 = new DeleteOp(8, 8)

    expect(del1at1.applyTransform(x)).to.equal('2345678')
    expect(del2at6.applyTransform(x)).to.equal('123478')
    expect(del8at8.applyTransform(x)).to.equal('')
  })

  it ('Write operation', () => {
    let x = '1234'

    let write1at1 = new WriteOp(1, '*')
    let write2at4 = new WriteOp(4, '**')
    let write4at4 = new WriteOp(4, '****')

    expect(write1at1.applyTransform(x)).to.equal('1*234')
    expect(write2at4.applyTransform(x)).to.equal('1234**')
    expect(write4at4.applyTransform(x)).to.equal('1234****')
  })

  it ('Text Operations', () => {
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