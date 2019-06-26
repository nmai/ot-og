import { Op } from './interfaces/op'
import { TimeList } from './time-list'
import { rebuildOp } from './util/rebuild-op'

export class OpLog {
  _tl: TimeList

  // 
  public apply(op: Op): Op | void {
    let index = this._tl.findInsertionPoint(op.timestamp)

    if (index == this._tl.length) {
      this._tl.pushOp(op)
    } else {
      let bundle = this._tl.fetchOps(index)
      let reverseOp = rebuildOp(op, bundle)
      this._tl.spliceOps(index, [op, ...bundle])

      return reverseOp
    }
  }

}