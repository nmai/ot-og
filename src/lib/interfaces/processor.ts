import { Operation } from './operation'

export interface Processor {
  apply: (data: Operation) => boolean
}
