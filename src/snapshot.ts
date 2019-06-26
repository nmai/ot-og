import { Op } from "./interfaces/op";

export class Snapshot {
  public text: string
  public version: number

  constructor(text?: string, version?: number) {
    this.text = text || ''
    this.version = version || 0
  }

  public applyOp(op: Op) {
    switch (op.type) {
      case 'INSERT':
        this.text = insertFragment(this.text, op.text, op.index)
        this.version = op.timestamp
        return
      case 'DELETE':
        this.text = deleteFragment(this.text, op.delta, op.index)
        this.version = op.timestamp
        return
    }
  }
}

function insertFragment(original: string, fragment: string, index: number): string {
  let start = original.substring(0, index)
  let end = original.substring(index)
  return `${start}${fragment}${end}`
}

function deleteFragment(original: string, delta: number, index: number): string {
  let start = original.substring(0, index - delta)
  let end = original.substring(index)
  return `${start}${end}`
}
