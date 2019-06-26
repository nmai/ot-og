import { expect } from 'chai'
import { Snapshot } from './snapshot'
import { Op } from './interfaces/op';

describe('[Snapshot] Atomic operations on a live Snapshot', () => {
  let snapshot: Snapshot

  beforeEach(() => {
    snapshot = new Snapshot('12345678', 0)
  })

  describe ('[Operation] Delete', () => {

    it ('remove first character', () => {
      snapshot.applyOp(createDeleteOp(1, 1))
      expect(snapshot.text).to.equal('2345678')
    })

    it ('remove two characters from middle', () => {
      snapshot.applyOp(createDeleteOp(6, 2))
      expect(snapshot.text).to.equal('123478')
    })

    it ('remove all characters', () => {
      snapshot.applyOp(createDeleteOp(8, 8))
      expect(snapshot.text).to.equal('')
    })

  })

  describe ('[Operation] Insert', () => {

    it ('insert one character at beginning', () => {
      snapshot.applyOp(createInsertOp(0, '*'))
      expect(snapshot.text).to.equal('*12345678')
    })

    it ('insert two characters in middle', () => {
      snapshot.applyOp(createInsertOp(4, '**'))
      expect(snapshot.text).to.equal('1234**5678')
    })

    it ('insert three characters at end', () => {
      snapshot.applyOp(createInsertOp(8, '***'))
      expect(snapshot.text).to.equal('12345678***')
    })

  })
})

describe('[Store] Complex operations on a live Store', () => {
  let snapshot: Snapshot

  beforeEach(() => {
    snapshot = new Snapshot('0000', 0)
  })

  describe ('Chaining', () => {

    it ('6x insert/delete operations consecutively', () => {
      snapshot.applyOp(createInsertOp(1, '*'))
      snapshot.applyOp(createDeleteOp(1, 1))
      snapshot.applyOp(createInsertOp(4, '**'))
      snapshot.applyOp(createDeleteOp(6, 2))
      snapshot.applyOp(createInsertOp(4, '****'))
      snapshot.applyOp(createDeleteOp(5, 3))

      expect(snapshot.text).to.equal('*0***')
    })

  })

})

// Helper functions
function createInsertOp(index: number, text: string, timestamp?: number): Op {
  return {
    type: 'INSERT',
    index: index,
    text: text,
    timestamp: timestamp || Date.now()
  }
}

function createDeleteOp(index: number, delta: number, timestamp?: number): Op {
  return {
    type: 'DELETE',
    index: index,
    delta: delta,
    timestamp: timestamp || Date.now()
  }
}