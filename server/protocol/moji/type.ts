export interface IResult<T = unknown> {
  code: number
  msg: string
  data: T
}
