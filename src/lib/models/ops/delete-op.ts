import { BaseOp } from './base-op'

export class DeleteOp extends BaseOp {
  public offset: number
  public length: number

  protected _type: string = 'DeleteOp'

  /**
   * @param {number} offset - Represents the relative location of the operation
   * @param {number} length - Number of characters to remove on the left side of the offset
   */
  constructor(offset: number, length: number) {
    super()

    this.offset = offset
    this.length = length
  }

  public applyTransform(target: string): string {
    return target.substr(0, this.offset - this.length) + target.substr(this.offset)
  }
}