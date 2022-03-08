const undefinedGenerator = () => undefined

export const propsAndData = {
  props: {
    placeholderDateRangeTip: {
      type: String,
      default: 'Selected Range'
    },
    placeholderDateRangeStart: {
      type: String,
      default: 'Start'
    },
    placeholderDateRangeEnd: {
      type: String,
      default: 'End'
    },
    placeholderDateTip: {
      type: String,
      default: 'Selected Date'
    },
    placeholderDate: {
      type: String,
      default: 'Pick a Date'
    },
    buttonLabelApply: {
      type: String,
      default: 'Apply'
    },
    buttonLabelCancel: {
      type: String,
      default: 'Cancel'
    },
    borderColor: {
      type: String,
      default: ''
    },
    displayTimeInput: {
      type: Boolean,
      default: false
    },
    configs: {
      type: Object,
      default: () => {}
    },
    sundayStart: {
      type: Boolean,
      default: undefinedGenerator
    },
    placeholder: {
      type: [String, Boolean],
      default: undefinedGenerator
    },
    dateFormat: {
      type: String,
      validator(format) {
        let timeFormat = format.split(' ')[1]
        if (!timeFormat) {
          return true
        }
        const validFormats = ['HH:MM', 'HH:mm', 'hh:MM', 'hh:mm']
        return !!~validFormats.indexOf(timeFormat)
      }
    },
    canClearRange: {
      type: Boolean,
      default: false
    },
    isMultiple: {
      type: Boolean,
      default: undefinedGenerator
    },
    isSeparately: {
      type: Boolean,
      default: undefinedGenerator
    },
    isDatePicker: {
      type: Boolean,
      default: undefinedGenerator
    },
    isMultipleDatePicker: {
      type: Boolean,
      default: undefinedGenerator
    },
    isMultipleDateRange: {
      type: Boolean,
      default: undefinedGenerator
    },
    isDateRange: {
      type: Boolean,
      default: undefinedGenerator
    },
    withTimePicker: {
      type: Boolean,
      default: undefinedGenerator
    },
    calendarsCount: {
      type: Number
    },
    isModal: {
      type: Boolean,
      default: undefinedGenerator
    },
    isTypeable: {
      type: Boolean,
      default: undefinedGenerator
    },
    changeMonthFunction: {
      type: Boolean,
      default: true
    },
    changeYearFunction: {
      type: Boolean,
      default: true
    },
    changeYearStep: {
      type: Number,
      default: () => 3
    },
    changeMonthStep: {
      type: Number,
      default: () => 1
    },
    // newCurrentDate: {
    //   type: Date
    // },
    markedDates: {
      type: Array,
      default: () => []
    },
    markedDateRange: {
      type: [Object, Array]
    },
    disabledDayNames: {
      type: Array
    },
    disabledDates: {
      type: Array
    },
    enabledDates: {
      type: Array
    },
    limits: {
      type: [Object, Boolean],
      default: undefinedGenerator
    },
    minSelDays: {
      type: [Number, Boolean],
      default: undefinedGenerator
    },
    maxSelDays: {
      type: [Number, Boolean],
      default: undefinedGenerator
    },
    dayNames: {
      type: Array
    },
    monthNames: {
      type: Array
    },
    shortMonthNames: {
      type: Array
    },
    showWeekNumbers: {
      type: Boolean,
      default: undefinedGenerator
    },
    value: {
      type: Object
    },
    transition: {
      type: Boolean,
      default: undefinedGenerator
    },
    hiddenElements: {
      type: Array
    },
    isAutoCloseable: {
      type: Boolean,
      default: undefined
    },
    isDark: {
      type: Boolean,
      default: undefined
    },
    isLayoutExpandable: {
      type: Boolean,
      default: undefined
    },
    titlePosition: {
      type: String,
      default: 'center'
    },
    arrowsPosition: {
      type: String,
      default: 'space-between'
    },
    alwaysUseDefaultClasses: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    newCurrentDate() {
      const dateFormat = "dd/mm/yyyy hh:MM"
      const getDateFromFormat = (date) => {
        let format = dateFormat.split(' ')[0]
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
      }
      if(this.isDatePicker && this.value.selectedDate) {
        return getDateFromFormat(this.value.selectedDate)
      }
      if(this.isDateRange && this.value.dateRange) {
        if(this.value.dateRange.start) {
          return getDateFromFormat(this.value.dateRange.start)
        }
      }
      return new Date()
    }
  },
  data() {
    return {
      inputRangeStart: '',
      inputRangeEnd: '',
      inputDate: '',
      isDisabledDateMouseOver: false,
      sameRangeStartAndEnd: false,

      popoverElement: '',
      defaultDateFormat: {
        date: false,
        dateTime: false,
        hour: '00',
        minute: '00'
      },
      hoveredObject: null,
      calendar: {
        currentDate: new Date(),
        selectedDate: false,
        selectedDateTime: false,
        selectedHour: '00',
        selectedMinute: '00',
        selectedDatesItem: '',
        selectedDates: [],
        dateRange: {
          start: '',
          end: ''
        },
        multipleDateRange: []
      },
      transitionPrefix: 'left',
      showCalendar: true,
      showMonthPicker: false,
      showYearPicker: false,
      showTimePicker: false,
      allowPreDate: true,
      allowNextDate: true,
      listCalendars: [],
      fConfigs: {
        sundayStart: false,
        placeholder: false,
        dateFormat: 'dd/mm/yyyy hh:MM',
        isMultipleDateRange: false,
        isDatePicker: false,
        isMultipleDatePicker: false,
        isDateRange: false,
        withTimePicker: false,
        isMultiple: false,
        calendarsCount: 1,
        isSeparately: false,

        isModal: false,
        isTypeable: false,

        changeMonthFunction: false,
        changeYearFunction: false,
        changeYearStep: 3,

        changeMonthStep: 1,

        markedDates: [],
        markedDateRange: {
          start: false,
          end: false
        },

        limits: false,
        minSelDays: false,
        maxSelDays: false,

        disabledDates: [],
        enabledDates: [],
        disabledDayNames: [],

        dayNames: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        monthNames: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ],
        shortMonthNames: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ],

        showWeekNumbers: false,
        transition: true,
        hiddenElements: [],
        isAutoCloseable: false,
        isDark: false,
        isLayoutExpandable: false,

        titlePosition: 'center',
        arrowsPosition: 'space-between'
      }
    }
  }
}
