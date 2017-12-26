import { Operation } from '../../interfaces/operation'

/**
 * Op - represents a single atomic action (operation)
 */
export class BaseOp implements Operation {
  protected _type: string = 'BaseOp'

  get type() { return this._type }

  public applyTransform(op: any): string { return '' }

  // toJson() {

  // }

}