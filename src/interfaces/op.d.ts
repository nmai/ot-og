export interface Op {
  timestamp: number
  type: string
  index: number
  delta?: number
  text?: string
}