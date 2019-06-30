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

  it('should insert an earlier change at correct time slot', () => {
    ol.apply({
      type: 'INSERT',
      index: 2,
      timestamp: 25,
      text: '**'
    })

    expect(ol._tl._list[2].timestamp).to.equal(25)
  })

  it('conflicting change should yield inverted op (depth 1)', () => {
    let inverted = ol.apply({
      type: 'INSERT',
      index: 2,
      timestamp: 25,
      text: '**'
    })

    expect(inverted.index).to.equal(5)
  })

  it('conflicting change should yield inverted op (depth 2)', () => {
    let inverted = ol.apply({
      type: 'INSERT',
      index: 2,
      timestamp: 15,
      text: '**'
    })

    expect(inverted.index).to.equal(0)
  })
})