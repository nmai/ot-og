import { Op } from "./interfaces"

export class TimeList {
  private list: Array<Op>

  constructor(initialList: Array<Op>) {
    this.list = initialList ? initialList : []
  }

  findInsertionPoint(timestamp: number): number {
    if (this.list.length === 0)
      return 0
    
    // @todo missing determining factor for same-time ops

    for (let i = this.list.length - 1; i >= 0; i--) {
      if (timestamp >= this.list[i].timestamp)
        return i + 1
    }

    return 0
  }
}

