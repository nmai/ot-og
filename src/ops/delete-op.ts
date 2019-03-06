import { Op } from '../interfaces/op'

export class DeleteOp implements Op {
  public readonly type: string = 'DELETE'
  public timestamp: number
  public index: number
  public delta: number

  constructor(index: number, delta: number, timestamp?: number) {
    this.timestamp = timestamp || new Date().getTime()
    this.index = index
    this.delta = delta
  }

  toOp(): Op {
    return {
      type: this.type,
      timestamp: this.timestamp,
      index: this.index,
      delta: this.delta
    }
  }
}