import { Op } from './interfaces/op'

export class OpLog {
  // @todo - remember that this strategy fails if two operations are submitted at the same millisecond

  // @todo - it's exposed (public) for more granular testing, but is it necessary?
  public log: Map<number, Op>

  constructor(log?: Map<number, Op>) {
    this.log = log || new Map()
  }

  // 
  public apply(op: Op): Op | void {
    this.log.set(op.timestamp, op)
  }

}