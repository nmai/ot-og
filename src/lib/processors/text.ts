import { Processor, Operation } from '../interfaces'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { ReplaySubject } from 'rxjs/ReplaySubject'
import { BaseOp, WriteOp, DeleteOp } from '../models'

/**
 * @TODO I would like to keep the storage stuff separate from the processor,
 * but while this is still experimental I'll not concern myself with this.
 */
/**
 * @TODO Create guards, handle invalid ops, etc.
 */
export class TextProcessor implements Processor {

  private history: ReplaySubject<Operation>
  private _snapshot: string

  get snapshot(): string { return this._snapshot }

  constructor(baseSnapshot?: string) {
    this.history   = new ReplaySubject()
    this._snapshot = baseSnapshot || ''

    this.history.subscribe((op: WriteOp | DeleteOp) => {
      this._snapshot = op.applyTransform(this._snapshot)
    })
  }

  public apply(data: Operation): boolean {
    let opModel

    try {
      opModel = this.operationFactory(data)
    } catch(e) {
      console.error(e)
      return false
    }

    this.history.next(opModel)
    return true
  }

  private operationFactory(data: Operation): BaseOp {
    switch (data.type) {
      case 'WriteOp': return new WriteOp(data['offset'], data['text'])
      case 'DeleteOp': return new DeleteOp(data['offset'], data['length'])
      default: throw Error('Attempted to process op data with invalid type')
    }
  }

}