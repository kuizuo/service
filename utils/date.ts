import { format } from 'date-fns'

export const DATE_TIME_FORMAT = 'yyyy-MM-dd hh:mm:ss'

export function formatToDateTime(date: Date = new Date(), formatString = DATE_TIME_FORMAT) {
  return format(date, formatString)
}
