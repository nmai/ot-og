import { BaseOp } from './base-op'
import { Operation } from '../../interfaces'

export class WriteOp extends BaseOp implements Operation {
  public offset: number
  public text: string

  protected _type: string = 'WriteOp'

  /**
   * @param {number} offset - Represents the relative location of the operation
   * @param {number} text - String to insert at this position
   */
  constructor(offset: number, text: string) {
    super()

    this.offset = offset
    this.text = text
  }

  public applyTransform(target: string): string {
    return target.substr(0, this.offset) + this.text + target.substr(this.offset)
  }
}
