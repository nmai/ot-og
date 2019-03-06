export interface Op {
  readonly type: string
  index: number
  timestamp: number 
  delta?: number
  text?: string
}