import { Op } from "../interfaces/op";

/**
 * For "reverse transforming" an op
 * @param subject the op to be transformed
 * @param bundle list of ops to apply
 */
export function invertOp(subject: Op, bundle: Array<Op>): Op {
  let index = subject.index
  
  for (let op of bundle) {
    if (op.index <= index) {
      if (op.type === 'INSERT')
        index += op.text.length
      else
        index -= op.delta // @todo account for deletions past index
    }
  }

  subject.index = index
  return subject
}
