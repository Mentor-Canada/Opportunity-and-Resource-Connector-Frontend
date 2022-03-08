export default {

  props: {
    shortMonthNames: {
      type: Array,
      default: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
  },

  data() {
    return {
      dateFormat: "dd/mm/yyyy hh:MM"
    }
  },

  methods: {

    // TODO these functions are lifted from the calendar component
    // TODO can they be used instead of duplicating code?

    formatDate(ts) {
      let date = new Date(ts * 1000)
      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      let formattedDate = this.dateFormat.replace('dd', day.toString())
      formattedDate = formattedDate.replace('mm', month.toString())
      formattedDate = formattedDate.replace('yyyy', year.toString())
      return formattedDate.split(' ')[0]
    },

    formatInputDate(date) {
      if(!date) return ''

      let months = this.shortMonthNames
      let d = this.getDateFromFormat(date)

      const day = d.getDate()
      const month = months[d.getMonth()]
      const year = d.getFullYear()
      return `${month} ${day}, ${year}`
    },

    getDateFromFormat(date) {
      let format = this.dateFormat.split(' ')[0]
      date = date.split(' ')[0]
      if (format.indexOf('/') !== -1) {
        format = format.split('/')
        date = date.split('/')
      } else if (format.indexOf('-') !== -1) {
        format = format.split('-')
        date = date.split('-')
      } else if (format.indexOf('.') !== -1) {
        format = format.split('.')
        date = date.split('.')
      } else {
        throw new Error('Your date format not valid. Please read documentation.!')
      }

      let year = format.indexOf('yyyy')
      let month = format.indexOf('mm')
      let day = format.indexOf('dd')

      return new Date(date[year], date[month] - 1, date[day])
    },

    formatInputDateRange(dateRange) {
      const start = this.formatDate(dateRange.start)
      const end = this.formatDate(dateRange.end)
      if(!start) return {
        start: '',
        end: '',
        asString: ''
      }
      if(!end) return {
        start: this.formatInputDate(start),
        end: '',
        asString: this.formatInputDate(start)
      }

      let startDate = start ? this.getDateFromFormat(start) : null
      let endDate = end ? this.getDateFromFormat(end) : null

      const startDay = startDate.getDate()
      const startMonth = startDate.getMonth()
      const startYear = startDate.getFullYear()
      const endDay = endDate.getDate()
      const endMonth = endDate.getMonth()
      const endYear = endDate.getFullYear()

      let months = this.shortMonthNames
      const startMonthString = months[startMonth]
      const endMonthString = months[endMonth]

      if(startDay == endDay && startMonth == endMonth && startYear == endYear) {
        return {
          start: `${startMonthString} ${startDay}, ${startYear}`,
          end: '',
          asString: `${startMonthString} ${startDay}, ${startYear}`
        }
      }
      if(startMonth == endMonth && startYear == endYear) return {
        start: `${startMonthString} ${startDay}`,
        end: `${endDay}, ${endYear}`,
        asString: `${startMonthString} ${startDay} — ${endDay}, ${endYear}`
      }
      if(startYear == endYear) return {
        start: `${startMonthString} ${startDay}`,
        end: `${endMonthString} ${endDay}, ${endYear}`,
        asString: `${startMonthString} ${startDay} — ${endMonthString} ${endDay}, ${endYear}`
      }
      return {
        start: `${startMonthString} ${startDay}, ${startYear}`,
        end: `${endMonthString} ${endDay}, ${endYear}`,
        asString: `${startMonthString} ${startDay}, ${startYear} — ${endMonthString} ${endDay}, ${endYear}`
      }

    }

  }

}