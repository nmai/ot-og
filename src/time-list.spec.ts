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

})