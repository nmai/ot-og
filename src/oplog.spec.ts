import { expect } from 'chai'
import { Op } from './interfaces/op'
import { OpLog } from './oplog'
import { TimeList } from './time-list'

describe('[OpLog]', () => {
  let ol: OpLog

  beforeEach(() => {
    // this should construct "c123d"
    ol = new OpLog()
    ol._tl = new TimeList([
      {
        timestamp: 10,
        type: 'INSERT',
        index: 0,
        text: 'abcd'
      },
      {
        timestamp: 20,
        type: 'DELETE',
        index: 2,
        delta: 2
      },
      {
        timestamp: 30,
        type: 'INSERT',
        index: 1,
        text: '123'
      }
    ])
  })

  it('should apply a later change to the end of the log', () => {
    ol.apply({
      type: 'INSERT',
      index: 5,
      timestamp: 40,
      text: '**'
    })

    expect(ol._tl._list[3]).to.deep.equal({
      type: 'INSERT',
      index: 5,
      timestamp: 40,
      text: '**'
    })
  })

  // this should fail - 
  xit('should insert an earlier change and make conflict adjustments', () => {
    ol.apply({
      type: 'INSERT',
      index: 5,
      timestamp: 25,
      text: '**'
    })

    expect(Array.from(ol.log.keys()).indexOf(25)).to.equal(3)
  })
})