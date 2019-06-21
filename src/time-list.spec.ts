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

})