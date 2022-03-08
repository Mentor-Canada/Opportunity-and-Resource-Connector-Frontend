import {endOfMonth, endOfYear, format, lastDayOfWeek, startOfMonth, startOfWeek, startOfYear} from "date-fns"

export default class DateRangeAdapter {

  public start
  public end

  constructor(data) {
    if(data.type == "filter") {
      let func = data.val.replace("filter-", "")
      func = DateRangeAdapter.camelize(func)
      if(!this[func]) {
        console.error(`Unknown DateRange Filter: ${data.val}`)
        return
      }
      this[func]()
      return
    }
    this.start = data.value.start
    this.end = data.value.end
  }

  private static camelize(str): string {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    })
      .replace(/\s+|-/g, '')
  }

  private thisWeek() {
    const date = new Date()
    const offset = date.getTimezoneOffset() * 60

    const startDate = startOfWeek(date, {weekStartsOn: 1})
    this.start = startDate.getTime() / 1000 - (offset)

    const endDate = lastDayOfWeek(date, {weekStartsOn: 1})
    this.end = endDate.getTime() / 1000 - (offset)
  }

  private lastWeek() {
    const date = new Date()
    const offset = date.getTimezoneOffset() * 60
    const oneWeekOffset = 60 * 60 * 24 * 7

    let startDate = startOfWeek(date, {weekStartsOn: 1})
    this.start = startDate.getTime() / 1000 - (offset) - oneWeekOffset

    let endDate = lastDayOfWeek(date, {weekStartsOn: 1})
    this.end = endDate.getTime() / 1000 - (offset) - oneWeekOffset
  }

  private thisMonth() {
    const date = new Date()
    const offset = date.getTimezoneOffset() * 60
    const startDate = startOfMonth(date)
    this.start = startDate.getTime() / 1000 - (offset)
    const endDate = endOfMonth(date)
    this.end = endDate.getTime() / 1000 - (offset)
  }

  private lastMonth() {
    const date = new Date()
    date.setMonth(date.getMonth() - 1)
    const offset = date.getTimezoneOffset() * 60
    const startDate = startOfMonth(date)
    this.start = startDate.getTime() / 1000 - (offset)
    const endDate = endOfMonth(date)
    this.end = endDate.getTime() / 1000 - (offset)
  }

  private thisYear() {
    const date = new Date()
    const offset = date.getTimezoneOffset() * 60
    const startDate = startOfYear(date)
    this.start = startDate.getTime() / 1000 - (offset)
    const endDate = endOfYear(date)
    this.end = endDate.getTime() / 1000 - (offset)
  }

  private lastYear() {
    const date = new Date()
    date.setFullYear(date.getFullYear() - 1)
    const offset = date.getTimezoneOffset() * 60
    const startDate = startOfYear(date)
    this.start = startDate.getTime() / 1000 - (offset)
    const endDate = endOfYear(date)
    this.end = endDate.getTime() / 1000 - (offset)
  }

  private allTime() {}

}