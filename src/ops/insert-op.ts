import { Op } from '../interfaces/op'

export class InsertOp implements Op {
  public readonly type: string = 'INSERT'
  public timestamp: number
  public index: number
  public text: string

  constructor(index: number, text: string, timestamp?: number) {
    this.timestamp = timestamp || new Date().getTime()
    this.index = index
    this.text = text
  }

  toOp(): Op {
    return {
      type: this.type,
      timestamp: this.timestamp,
      index: this.index,
      text: this.text
    }
  }
}