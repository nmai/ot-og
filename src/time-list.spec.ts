import { expect } from 'chai'
import { TimeList } from './time-list'

describe('[TimeList]', () => {
  let tl: TimeList

  beforeEach(() => {
    tl = new TimeList([
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

  describe ('find insertion points', () => {

    it ('last index', () => {
      let i = tl.findInsertionPoint(40)
      expect(i).to.equal(3)
    })

    it ('mid index', () => {
      let i = tl.findInsertionPoint(15)
      expect(i).to.equal(1)
    })

    it ('0th index', () => {
      let i = tl.findInsertionPoint(5)
      expect(i).to.equal(0)
    })

  })

  describe('fetchOps', () => {

    it('mid index', () => {
      let ops = tl.fetchOps(1)
      expect(ops).to.deep.equal([
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

  })

  describe('spliceOps', () => {

    it('mid index', () => {
      tl.spliceOps(1, [
        {
          timestamp: 25,
          type: 'INSERT',
          index: 1,
          text: '123'
        },
        {
          timestamp: 65,
          type: 'INSERT',
          index: 1,
          text: '123'
        },
        {
          timestamp: 103,
          type: 'INSERT',
          index: 1,
          text: '123'
        }
      ])
      expect(tl._list).to.deep.equal([
        {
          timestamp: 10,
          type: 'INSERT',
          index: 0,
          text: 'abcd'
        },
        {
          timestamp: 25,
          type: 'INSERT',
          index: 1,
          text: '123'
        },
        {
          timestamp: 65,
          type: 'INSERT',
          index: 1,
          text: '123'
        },
        {
          timestamp: 103,
          type: 'INSERT',
          index: 1,
          text: '123'
        }
      ])
    })

  })

})