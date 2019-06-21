import { Op } from "./interfaces"

export class TimeList {
  _list: Array<Op>

  constructor(initialList: Array<Op>) {
    this._list = initialList ? initialList : []
  }

  get length(): number {
    return this._list.length
  }

  findInsertionPoint(timestamp: number): number {
    if (this._list.length === 0)
      return 0
    
    // @todo missing determining factor for same-time ops

    for (let i = this._list.length - 1; i >= 0; i--) {
      if (timestamp >= this._list[i].timestamp)
        return i + 1
    }

    return 0
  }
  
  fetchOps(index: number) {
    let ops = []
    for (let i = index; i < this._list.length; i++) {
      ops.push(this._list[i])
    }
    return ops
  }

  pushOp(op: Op) {
    this._list.push(op)
  }
  
  spliceOps(index: number, ops: Array<Op>) {
    this._list = this._list
                  .slice(0, index)
                  .concat(ops)
  }
}

