<template>
  <div class="vfc-popover-container"
       ref="popoverElement"
       tabindex="0"
       :class="[
           rangeIsSelected ? 'range-selected' : '',
           !rangeIsSelected && isDisabledDateMouseOver ? 'disabled-range' : '',
           showMonthPicker || showYearPicker ? 'month-year-picker-open' : ''
       ]"
  >

    <div class="vfc-datepicker-header">
      <div v-if="$props.isDateRange && false">
        <input v-model="inputRangeStart" @focusout="onInputFocusOut('inputRangeStart', $event)">
        <input v-model="inputRangeEnd" @focusout="onInputFocusOut('inputRangeEnd', $event)">
      </div>
      <div v-if="$props.isDateRange" class="vfc-datepicker-header-date">
        <div class="vfc-datepicker-header-date-tip">
          {{ placeholderDateRangeTip }}
        </div>
        <div class="vfc-datepicker-header-date-range">
          <span :class="inputRangeStart ? '' : 'empty'"
                class="vfc-datepicker-header-date-component"
                :data-empty="placeholderDateRangeStart"
          >{{ inputRangeStart }}</span>
          <span :class="inputRangeEnd ? '' : 'empty'" v-if="!sameRangeStartAndEnd"> &mdash; </span>
          <span :class="inputRangeEnd ? '' : 'empty'"
                class="vfc-datepicker-header-date-component"
                :data-empty="placeholderDateRangeEnd"
                v-if="!sameRangeStartAndEnd"
          >{{ inputRangeEnd }}</span>
        </div>
      </div>
      <div v-if="$props.isDatePicker" class="vfc-datepicker-header-date">
        <div class="vfc-datepicker-header-date-tip">
          {{ placeholderDateTip }}
        </div>
        <div class="vfc-datepicker-header-date-range">
          <span :class="inputDate ? '' : 'empty'"
                class="vfc-datepicker-header-date-component"
                :data-empty="placeholderDate"
          >{{ inputDate }}</span>
        </div>
      </div>
    </div>

    <PickerInputs
      :fConfigs="fConfigs"
      :singleSelectedDate="singleSelectedDate"
      :calendar="calendar"
    >
      <template v-slot:dateRangeInputs="props">
        <slot
          :startDate="props.startDate"
          :endDate="props.endDate"
          :isTypeable="fConfigs.isTypeable"
          name="dateRangeInputs"
        >
        </slot>
      </template>
      <template v-slot:datePickerInput="props">
        <slot
          :selectedDate="props.selectedDate"
          :isTypeable="fConfigs.isTypeable"
          name="datePickerInput"
        >
        </slot>
      </template>
    </PickerInputs>

    <div
      class="vfc-main-container"
      v-show="showCalendar"
      ref="mainContainer"
      :class="{
        'vfc-modal':
          fConfigs.isModal &&
          (fConfigs.isDatePicker ||
            fConfigs.isDateRange ||
            fConfigs.isMultipleDatePicker),
        'vfc-dark': fConfigs.isDark
      }"
    >
      <time-picker
        v-if="showTimePicker"
        ref="timePicker"
        :height="$refs.popoverElement.clientHeight"
      ></time-picker>

      <template v-else>
        <div class="vfc-calendars-container">


          <div class="vfc-calendars" ref="calendars">
            <div
              class="vfc-calendar"
              v-for="(calendarItem, key) in listCalendars"
              :key="calendarItem.key"
            >
              <month-year-picker
                ref="monthContainer"
                :class="'vfc-' + fConfigs.titlePosition"
                :changeYearStep="changeYearStep"
                v-show="
                  showMonthPicker === key + 1 || showYearPicker === key + 1
                "
                :calendar-key="key"
              >
              </month-year-picker>
              <div class="vfc-content main-calendar-wrapper">

                <div class="vfc-date-picker-header-navigation">

                  <transition tag="div" :name="getTransition_()" appear>
                    <div
                      class="vfc-top-date"
                      v-if="checkHiddenElement('month')"
                    >
                      <span
                        @click.prevent="
                          isNotSeparatelyAndFirst(key) && openMonthPicker(key + 1)
                        "
                        :class="{
                          'vfc-cursor-pointer vfc-underline':
                            fConfigs.changeMonthFunction &&
                            isNotSeparatelyAndFirst(key),
                          'vfc-underline-active': showMonthPicker === key + 1
                        }"
                      >
                        {{ calendarItem.month }}</span
                      >
                      <span
                        @click.prevent="
                          isNotSeparatelyAndFirst(key) && openYearPicker(key + 1)
                        "
                        :class="{
                          'vfc-cursor-pointer vfc-underline':
                            fConfigs.changeYearFunction &&
                            isNotSeparatelyAndFirst(key),
                          'vfc-underline-active': showYearPicker === key + 1
                        }"
                      >
                        {{ calendarItem.year }}
                      </span>
                    </div>
                  </transition>

                  <Arrows
                      :isMultiple="false"
                      :fConfigs="fConfigs"
                      :allowPreDate="allowPreDate"
                      :allowNextDate="allowNextDate"
                  >
                    <template v-slot:navigationArrowLeft>
                      <slot name="navigationArrowLeft"></slot>
                    </template>
                    <template v-slot:navigationArrowRight>
                      <slot name="navigationArrowRight"></slot>
                    </template>
                  </Arrows>

                </div>


                <transition tag="div" :name="getTransition_()" appear>
                  <div class="vfc-dayNames">
                    <span v-if="fConfigs.showWeekNumbers"></span>
                    <span
                      v-for="(dayName, dayKey) in fConfigs.dayNames"
                      :key="key + dayKey + 1"
                      class="vfc-day"
                    >
                      <template v-if="checkHiddenElement('dayNames')">
                        {{ dayName }}
                      </template>
                    </span>
                  </div>
                </transition>
                <transition-group tag="div" :name="getTransition_()" appear>
                  <div class="vfc-weeks-wrapper" key="weeks-wrapper">
                    <div
                      class="vfc-week"
                      v-for="(week, week_key) in calendarItem.weeks"
                      :key="key + week_key + 1"
                    >
                      <WeekNumbers
                        v-if="showWeekNumbers"
                        :number="week.number"
                        :borderColor="borderColor"
                      />
                      <Day
                        v-for="(day, day_key) in week.days"
                        ref="day"
                        :key="key + week_key + day_key + 1"
                        :isMultipleDateRange="isMultipleDateRange"
                        :day="day"
                        :fConfigs="fConfigs"
                        :calendar="calendar"
                        :helpCalendar="helpCalendar"
                        :week="week"
                        :day_key="day_key"
                        @dayMouseOver="dayMouseOver"
                        :alwaysUseDefaultClasses="alwaysUseDefaultClasses"
                      >
                        <template v-slot:default="props">
                          <slot :week="props.week" :day="props.day"></slot>
                        </template>
                      </Day>
                    </div>
                  </div>
                  <template
                    v-if="
                      calendarItem.weeks.length < 6 &&
                        !fConfigs.isLayoutExpandable
                    "
                  >
                    <!-- stabilizator -->
                    <div
                      v-for="moreWeekKey in 6 - calendarItem.weeks.length"
                      :key="key + moreWeekKey + 'moreWeek'"
                      class="vfc-calendar-stabilizer"
                    >
                      &nbsp;
                    </div>
                  </template>
                </transition-group>
              </div>
            </div>
          </div>

          <div class="vfc-footer">
            <button @click="onCancel"
                    type="button"
                    class="vfc-footer-button vfc-footer-button-cancel"
            >{{ buttonLabelCancel }}</button>
            <button @click="onApply"
                    type="button"
                    class="vfc-footer-button vfc-footer-button-apply"
            >{{ buttonLabelApply }}</button>
          </div>

          <Footer v-if="canClearRange || $slots['footer']">
            <template v-slot:footer>
              <div @click="cleanRange">
                <slot name="cleaner">
                  <div
                    v-if="canClearRange && fConfigs.isDateRange"
                    class="rangeCleaner"
                  >
                    <span
                      :class="[rangeIsSelected ? 'active' : 'disabled']"
                      @click="cleanRange"
                      >Clear Range{{ isMultipleDateRange && 's' }}</span
                    >
                  </div>
                </slot>
              </div>
              <slot name="footer"></slot>
            </template>
            <!-- <span>&nbsp;</span> -->
          </Footer>

        </div>
      </template>
    </div>
  </div>
</template>

<script>
import helpCalendarClass from '../assets/js/helpCalendar'
import { propsAndData } from '../mixins/propsAndData'
import TimePicker from '../components/TimePicker'
import Arrows from '../components/Arrows'
import WeekNumbers from '../components/WeekNumbers'
import Day from '../components/Day'
import MonthYearPicker from '../components/MonthYearPicker'
import PickerInputs from '../components/PickerInputs'
import Footer from '../components/Footer'

import { hElContains, hUniqueID } from '../utils/helpers'
// import calendarMethods from '../utils/calendarMethods'

export default {
  name: 'FunctionalCalendar',
  components: {
    MonthYearPicker,
    TimePicker,
    PickerInputs,
    Arrows,
    Footer,
    Day,
    WeekNumbers
  },
  mixins: [propsAndData],
  computed: {
    startDMY() {
      //start only with Day Month and Year
      if (this.calendar.dateRange.start) {
        return this.calendar.dateRange.start.split(' ')[0]
      }
      return ''
    },
    endDMY() {
      //end only with Day Month and Year
      if (this.calendar.dateRange.end) {
        return this.calendar.dateRange.end.split(' ')[0]
      }
      return ''
    },
    rangeIsSelected() {
      if (!this.isMultipleDateRange)
        return !!(this.calendar.dateRange.end && this.calendar.dateRange.start)
      return this.calendar.multipleDateRange.length > 0
    },
    helpCalendar() {
      return new helpCalendarClass(
        this.fConfigs.sundayStart,
        this.checkHiddenElement('leftAndRightDays'),
        this.fConfigs.dateFormat,
        this.fConfigs.dayNames,
        this.fConfigs
      )
    },
    singleSelectedDate: {
      get() {
        let res = ''
        if (this.displayTimeInput) {
          const validFormats = [
            'HH:MM',
            'HH:mm',
            'hh:MM',
            'hh:mm',
            'MM:HH',
            'mm:HH',
            'MM:hh',
            'mm:hh'
          ]
          let format = this.fConfigs.dateFormat
          if (this.dateFormat) {
            format = this.dateFormat
          }
          if (validFormats.indexOf(format.split(' ')[1]) > 3) {
            res +=
              ' ' +
              [this.calendar.selectedHour, this.calendar.selectedMinute]
                .reverse()
                .join(':')
          } else {
            res +=
              ' ' +
              [this.calendar.selectedHour, this.calendar.selectedMinute].join(
                ':'
              )
          }
        }

        return this.calendar.selectedDate
          ? this.calendar.selectedDate + res
          : ''
      },
      set(newValue) {
        newValue = this.helpCalendar.mask(newValue)
        if (this.helpCalendar.getDateFromFormat(newValue).getMonth()) {
          this.calendar.selectedDate = newValue
        }
      }
    }
  },
  created() {
    this.setConfigs()
    this.initCalendar()
  },
  mounted() {
    //show time placeholder
    if (this.displayTimeInput) {
      const timeFormat = this.fConfigs.placeholder.split(' ')[1]
      if (!timeFormat) {
        this.fConfigs.placeholder += ' hh:mm'
      }
    }

    this.popoverElement = this.$refs.popoverElement
    // Event
    this.popoverElement.addEventListener('focusin', this.onFocusIn)
    this.popoverElement.addEventListener('focusout', this.onFocusOut)
    window.addEventListener('click', this.hideMonthYearPicker, {
      capture: true
    })

    // Reacts to external selected dates
    this.$watch(
      'value',
      function(value) {
        if (
          typeof value === 'object' &&
          (value.hasOwnProperty('dateRange') ||
            value.hasOwnProperty('selectedDate'))
        ) {
          this.calendar = value
        } else if (
          typeof value === 'object' &&
          value.hasOwnProperty('multipleDateRange')
        ) {
          this.calendar.multipleDateRange = value.multipleDateRange
          const lastElement = this.calendar.multipleDateRange[
            Math.max(0, this.calendar.multipleDateRange.length - 1)
          ]
          if (
            lastElement &&
            ((lastElement.start && !lastElement.end) ||
              (!lastElement.start && lastElement.end))
          ) {
            throw new Error('Invalid Data Range')
          }
        }
      },
      { immediate: true, deep: true }
    )

    this.$watch(
      'showCalendar',
      function(value) {
        if (value) this.$emit('opened')
        else this.$emit('closed')
      },
      { immediate: true, deep: true }
    )
  },
  beforeDestroy: function() {
    window.removeEventListener('focusin', this.onFocusIn)
    window.removeEventListener('focusout', this.onFocusOut)
    window.removeEventListener('click', this.hideMonthYearPicker)
  },
  watch: {
    enabledDates: {
      handler() {
        this.fConfigs.enabledDates = this.enabledDates;
      },
      deep: true
    },
    'configs.enabledDates': {
      handler() {
        this.fConfigs.enabledDates = this.configs.enabledDates;
      },
      deep: true
    },
    fConfigs: {
      handler() {
        this.markChooseDays()
      },
      deep: true,
      immediate: true
    },
    calendar: {
      handler() {
        this.markChooseDays()
        this.onCalendarUpdate()
      },
      deep: true,
      immediate: true
    },
    'calendar.currentDate': {
      handler(value) {
        this.$emit('input', this.calendar)
        this.checkLimits(value)
      }
    }
  },
  methods: {
    onApply() {
      this.$emit('apply', this.getDateDataOnClose())
    },

    onCancel() {
      this.$emit('cancel', this.getDateDataOnClose())
    },

    getDateDataOnClose() {
      return {
        calendar: this.calendar,
        date: this.calendar.selectedDate ? this.helpCalendar.getDateFromFormat(this.calendar.selectedDate) : null,
        dateAsString: this.formatInputDate(this.calendar.selectedDate),
        range: {
          start: this.calendar.dateRange.start ? this.helpCalendar.getDateFromFormat(this.calendar.dateRange.start) : null,
          end: this.calendar.dateRange.end ? this.helpCalendar.getDateFromFormat(this.calendar.dateRange.end) : null
        },
        rangeAsString: this.formatInputDateRange(this.calendar.dateRange).asString
      }
    },

    onInputFocusOut(id, e) {
      const target = e.target
      const val = target.value
      const d = Date.parse(val)
      if(d) {
        const date = new Date(d)
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        const dateString = `${day}/${month}/${year}`

        let inputDate = new Date(`${year}-${month}-${day}`)
        let dateRangeStart = this.calendar.dateRange.start ? this.helpCalendar.getDateFromFormat(this.calendar.dateRange.start) : null
        let dateRangeEnd = this.calendar.dateRange.end ? this.helpCalendar.getDateFromFormat(this.calendar.dateRange.end) : null

        if(this.isDateRange) {
          if(id == 'inputRangeStart') {
            if(inputDate > dateRangeEnd && dateRangeEnd) {
              console.log('start can not be after end, clearing the end date')
              // this.updateInputs()
              // return
              this.calendar.dateRange.end = ''
            }
            this.calendar.dateRange.start = dateString
          }
          else {
            if(!dateRangeStart) {
              console.log('can not enter end date before a start date has been entered')
              this.updateInputs()
              return
            }
            if(inputDate < dateRangeStart && dateRangeStart) {
              console.log('end can not be before start')
              this.updateInputs()
              return
            }
            this.calendar.dateRange.end = dateString
          }
          if(this.calendar.currentDate.getMonth() + 1 != month || this.calendar.currentDate.getFullYear() != year) {
            this.ChooseDate(dateString)
          }
        }

        else {
          console.log('do date picker')
        }
      }
      else {
        console.log('bad date')
        this.updateInputs()
      }
    },

    onCalendarUpdate() {
      this.updateInputs()
    },

    updateInputs() {
      if(this.isDateRange) {
        this.inputRangeStart = this.formatInputDateRange(this.calendar.dateRange).start
        this.inputRangeEnd = this.formatInputDateRange(this.calendar.dateRange).end
        return
      }
      if(this.isDatePicker) {
        this.inputDate = this.formatInputDate(this.calendar.selectedDate)
        return
      }
    },

    formatInputDateRange(dateRange) {
      this.sameRangeStartAndEnd = false
      const start = dateRange.start
      const end = dateRange.end
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

      let startDate = start ? this.helpCalendar.getDateFromFormat(start) : null
      let endDate = end ? this.helpCalendar.getDateFromFormat(end) : null

      const startDay = startDate.getDate()
      const startMonth = startDate.getMonth()
      const startYear = startDate.getFullYear()
      const endDay = endDate.getDate()
      const endMonth = endDate.getMonth()
      const endYear = endDate.getFullYear()

      let months = this.fConfigs.shortMonthNames
      const startMonthString = months[startMonth]
      const endMonthString = months[endMonth]

      if(startDay == endDay && startMonth == endMonth && startYear == endYear) {
        this.sameRangeStartAndEnd = true
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

    },

    formatInputDate(date) {
      if(!date) return ''

      let months = this.fConfigs.shortMonthNames
      let d = this.helpCalendar.getDateFromFormat(date)

      const day = d.getDate()
      const month = months[d.getMonth()]
      const year = d.getFullYear()
      return `${month} ${day}, ${year}`
    },

    initCalendar() {
      this.setCalendarData()
      this.listRendering()
      this.markChooseDays()
      this.checkLimits(this.calendar.currentDate)
    },
    updateCalendar() {
      this.setExistingCalendarData()
      this.listRendering()
      this.markChooseDays()
    },
    isNotSeparatelyAndFirst(key) {
      return this.isSeparately || key == 0
    },
    setCalendarData() {
      let date = this.calendar.currentDate
      date = new Date(date.getFullYear(), date.getMonth() - 1)

      this.listCalendars = []

      for (let i = 0; i < this.fConfigs.calendarsCount; i++) {
        date = new Date(date.getFullYear(), date.getMonth() + 1)

        let calendar = {
          key: i + hUniqueID(),
          date: date,
          dateTop: `${
            this.fConfigs.monthNames[date.getMonth()]
          } ${date.getFullYear()}`,
          month: this.fConfigs.monthNames[date.getMonth()],
          year: date.getFullYear(),
          weeks: this.helpCalendar.getFinalizedWeeks(
            date.getMonth(),
            date.getFullYear()
          )
        }

        this.listCalendars.push(calendar)

        if (!this.fConfigs.isMultiple) {
          break
        }
      }
    },
    setExistingCalendarData() {
      for (let i = 0; i < this.listCalendars.length; i++) {
        let calendar = this.listCalendars[i]
        let date = calendar.date

        this.$set(this.listCalendars, i, {
          key: calendar.key,
          date: date,
          dateTop: `${
            this.fConfigs.monthNames[date.getMonth()]
          } ${date.getFullYear()}`,
          month: this.fConfigs.monthNames[date.getMonth()],
          year: date.getFullYear(),
          weeks: this.helpCalendar.getFinalizedWeeks(
            date.getMonth(),
            date.getFullYear()
          )
        })

        if (!this.fConfigs.isMultiple) {
          break
        }
      }
    },
    setConfigs() {
      let globalOptions
      if (typeof this.$getOptions !== 'undefined') {
        // Global Options
        globalOptions = this.$getOptions()
        Object.keys(globalOptions).forEach(objectKey => {
          if (typeof this.fConfigs[objectKey] !== 'undefined') {
            this.$set(this.fConfigs, objectKey, globalOptions[objectKey])
          }
        })
      }

      if (typeof this.configs !== 'undefined') {
        Object.keys(this.fConfigs).forEach(objectKey => {
          if (typeof this.configs[objectKey] !== 'undefined') {
            // Get From Configs
            this.$set(this.fConfigs, objectKey, this.configs[objectKey])
          }
        })
      } else {
        Object.keys(this.$props).forEach(objectKey => {
          if (
            typeof this.fConfigs[objectKey] !== 'undefined' &&
            typeof this.$props[objectKey] !== 'undefined'
          ) {
            this.$set(this.fConfigs, objectKey, this.$props[objectKey])
          }
        })
      }

      // Is Modal
      if (this.fConfigs.isModal) this.showCalendar = false

      // Placeholder
      if (!this.fConfigs.placeholder)
        this.fConfigs.placeholder = this.fConfigs.dateFormat

      if (typeof this.newCurrentDate !== 'undefined') {
        this.calendar.currentDate = this.newCurrentDate
      }

      // Sunday Start
      if (this.fConfigs.sundayStart) {
        let dayNames = [...this.fConfigs.dayNames]
        let sundayName = dayNames[dayNames.length - 1]
        dayNames.splice(dayNames.length - 1, 1)
        dayNames.unshift(sundayName)
        this.fConfigs.dayNames = dayNames
      }
    },
    listRendering() {
      // Each Calendars
      this.listCalendars.forEach(calendar => {
        // Set Calendar Weeks
        calendar.weeks.forEach(week => {
          let finalizedDays = []

          week.days.forEach(day => {
            let date = new Date(day.year, day.month, day.day)
            let now = new Date()

            let isToday = false

            date.setHours(0, 0, 0, 0)
            now.setHours(0, 0, 0, 0)

            if (date.getTime() === now.getTime()) {
              isToday = true
            }

            let checkMarked
            // With Custom Classes
            if (typeof this.fConfigs.markedDates[0] === 'object') {
              checkMarked = this.fConfigs.markedDates.find(markDate => {
                return markDate.date === this.helpCalendar.formatDate(date)
              })
            } else {
              // Without Classes
              checkMarked = this.fConfigs.markedDates.find(markDate => {
                return markDate === this.helpCalendar.formatDate(date)
              })
            }

            if (this.startDMY === this.helpCalendar.formatDate(date)) {
              checkMarked = true
            }

            let isMarked = false
            if (typeof checkMarked !== 'undefined') {
              isMarked = true
            }

            finalizedDays.push({
              day: day.day,
              date: this.helpCalendar.formatDate(date),
              hide: day.hide,
              isMouseToLeft: false,
              isMouseToRight: false,
              isHovered: false,
              isDateRangeStart: this.checkDateRangeStart(
                this.helpCalendar.formatDate(date)
              ),
              isDateRangeEnd: this.checkDateRangeEnd(
                this.helpCalendar.formatDate(date)
              ),
              hideLeftAndRightDays: day.hideLeftAndRightDays,
              isToday,
              isMarked
            })
          })

          week.days = finalizedDays
        })
      })
    },
    clickDay(item, isDisabledDate) {
      if (this.fConfigs.withTimePicker && this.fConfigs.isDateRange) {
        item.date = item.date + ' 00:00'
      }
      this.$emit('dayClicked', item)

      if (
        !this.fConfigs.isDateRange &&
        !this.fConfigs.isDatePicker &&
        !this.fConfigs.isMultipleDatePicker
      ) {
        return false
      }

      //Disabled Dates - Start

      // Disable days of week if set in configuration
      let dateDay = this.helpCalendar.getDateFromFormat(item.date).getDay() - 1
      if (dateDay === -1) {
        dateDay = 6
      }

      let dayOfWeekString = this.fConfigs.dayNames[dateDay]
      if (
        this.fConfigs.disabledDayNames.includes(dayOfWeekString) ||
        isDisabledDate(item.date)
      ) {
        return false
      }

      //Disabled Dates - End

      // Limits
      if (this.fConfigs.limits) {
        let min = this.helpCalendar
          .getDateFromFormat(this.fConfigs.limits.min)
          .getTime()
        let max = this.helpCalendar
          .getDateFromFormat(this.fConfigs.limits.max)
          .getTime()
        let date = this.helpCalendar.getDateFromFormat(item.date).getTime()

        if (date < min || date > max) {
          return false
        }
      }

      // Date Multiple Range
      if (this.fConfigs.isMultipleDateRange) {
        let clickDate = this.helpCalendar
          .getDateFromFormat(item.date.split(' ')[0])
          .getTime()
        let rangesLength = this.calendar.multipleDateRange.length
        let lastRange = this.calendar.multipleDateRange[rangesLength - 1]
        let startDate = ''
        // if (lastRange) {
        //   // if (lastRange.start && lastRange.end)
        // } else

        if (!lastRange) {
          this.calendar.multipleDateRange.push({ end: '', start: '' })
          rangesLength = this.calendar.multipleDateRange.length
          lastRange = this.calendar.multipleDateRange[rangesLength - 1]
        }

        if (lastRange.start) {
          startDate = this.helpCalendar.getDateFromFormat(lastRange.start)
        }

        // Two dates is not empty
        if (lastRange.start !== '' && lastRange.end !== '') {
          this.calendar.multipleDateRange.push({ end: '', start: item.date })
          // lastRange.start = item.date
          // lastRange.end = ''
          // Not date selected
        } else if (lastRange.start === '' && lastRange.end === '') {
          lastRange.start = item.date
          // Start Date not empty, chose date > start date
        } else if (lastRange.end === '' && clickDate > startDate.getTime()) {
          lastRange.end = item.date
          // Start date not empty, chose date <= start date (also same date range select)
        } else if (lastRange.start !== '' && clickDate <= startDate.getTime()) {
          this.$nextTick(() => {
            if (this.calendar.withTimePicker) {
              this.$refs['timePicker'].startDateActive = true
            }
          })
          lastRange.end = lastRange.start
          lastRange.start = item.date
        }

        //Get number of days between date range dates
        if (lastRange.start !== '' && lastRange.end !== '') {
          let oneDay = 24 * 60 * 60 * 1000
          let firstDate = this.helpCalendar.getDateFromFormat(lastRange.start)
          let secondDate = this.helpCalendar.getDateFromFormat(lastRange.end)
          let diffDays = Math.round(
            Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay)
          )
          let itemTime = this.helpCalendar
            .getDateFromFormat(item.date)
            .getTime()

          this.$emit('selectedDaysCount', diffDays)

          // Is Auto Closeable
          if (this.fConfigs.isModal && this.fConfigs.isAutoCloseable) {
            this.showCalendar = false
          }

          // Minimum Selected Days
          let minSelDays = this.fConfigs.minSelDays

          if (
            minSelDays &&
            itemTime >= startDate.getTime() &&
            diffDays < minSelDays
          ) {
            startDate.setDate(startDate.getDate() + (minSelDays - 1))
            lastRange.end = this.helpCalendar.formatDate(startDate)
          }

          if (
            minSelDays &&
            itemTime < startDate.getTime() &&
            diffDays < minSelDays
          ) {
            startDate.setDate(startDate.getDate() - (minSelDays - 1))
            lastRange.start = this.helpCalendar.formatDate(startDate)
          }

          // Maximum Selected Days
          let maxSelDays = this.fConfigs.maxSelDays

          if (
            maxSelDays &&
            itemTime >= startDate.getTime() &&
            diffDays >= maxSelDays
          ) {
            startDate.setDate(startDate.getDate() + (maxSelDays - 1))
            lastRange.end = this.helpCalendar.formatDate(startDate)
          }

          if (
            maxSelDays &&
            itemTime < startDate.getTime() &&
            diffDays >= maxSelDays
          ) {
            startDate.setDate(startDate.getDate() - (maxSelDays - 1))
            lastRange.start = this.helpCalendar.formatDate(startDate)
          }
        }

        this.$emit('input', this.calendar)
      } // Date Range
      else if (this.fConfigs.isDateRange) {
        let clickDate = this.helpCalendar
          .getDateFromFormat(item.date.split(' ')[0])
          .getTime()

        let startDate = ''
        if (this.calendar.dateRange.start) {
          startDate = this.helpCalendar.getDateFromFormat(
            this.calendar.dateRange.start
          )
        }

        // Two dates is not empty
        if (
          this.calendar.dateRange.start !== '' &&
          this.calendar.dateRange.end !== ''
        ) {
          this.calendar.dateRange.start = item.date
          this.calendar.dateRange.end = ''
          // Not date selected
        } else if (
          this.calendar.dateRange.start === '' &&
          this.calendar.dateRange.end === ''
        ) {
          this.calendar.dateRange.start = item.date
          // Start Date not empty, chose date > start date
        } else if (
          this.calendar.dateRange.end === '' &&
          clickDate > startDate.getTime()
        ) {
          this.calendar.dateRange.end = item.date
          // Start date not empty, chose date <= start date (also same date range select)
        } else if (
          this.calendar.dateRange.start !== '' &&
          clickDate <= startDate.getTime()
        ) {
          this.$nextTick(() => {
            if (this.calendar.dateRange && this.calendar.withTimePicker) {
              this.$refs['timePicker'].startDateActive = true
            }
          })
          this.calendar.dateRange.end = this.calendar.dateRange.start
          this.calendar.dateRange.start = item.date
        }

        //Get number of days between date range dates
        if (
          this.calendar.dateRange.start !== '' &&
          this.calendar.dateRange.end !== ''
        ) {
          let oneDay = 24 * 60 * 60 * 1000
          let firstDate = this.helpCalendar.getDateFromFormat(
            this.calendar.dateRange.start
          )
          let secondDate = this.helpCalendar.getDateFromFormat(
            this.calendar.dateRange.end
          )
          let diffDays = Math.round(
            Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay)
          )
          let itemTime = this.helpCalendar
            .getDateFromFormat(item.date)
            .getTime()

          this.$emit('selectedDaysCount', diffDays)

          // Is Auto Closeable
          if (this.fConfigs.isModal && this.fConfigs.isAutoCloseable) {
            this.showCalendar = false
          }

          // Minimum Selected Days
          let minSelDays = this.fConfigs.minSelDays

          if (
            minSelDays &&
            itemTime >= startDate.getTime() &&
            diffDays < minSelDays
          ) {
            startDate.setDate(startDate.getDate() + (minSelDays - 1))
            this.calendar.dateRange.end = this.helpCalendar.formatDate(
              startDate
            )
          }

          if (
            minSelDays &&
            itemTime < startDate.getTime() &&
            diffDays < minSelDays
          ) {
            startDate.setDate(startDate.getDate() - (minSelDays - 1))
            this.calendar.dateRange.start = this.helpCalendar.formatDate(
              startDate
            )
          }

          // Maximum Selected Days
          let maxSelDays = this.fConfigs.maxSelDays

          if (
            maxSelDays &&
            itemTime >= startDate.getTime() &&
            diffDays >= maxSelDays
          ) {
            startDate.setDate(startDate.getDate() + (maxSelDays - 1))
            this.calendar.dateRange.end = this.helpCalendar.formatDate(
              startDate
            )
          }

          if (
            maxSelDays &&
            itemTime < startDate.getTime() &&
            diffDays >= maxSelDays
          ) {
            startDate.setDate(startDate.getDate() - (maxSelDays - 1))
            this.calendar.dateRange.start = this.helpCalendar.formatDate(
              startDate
            )
          }
        }

        this.$emit('input', this.calendar)
      } else if (this.fConfigs.isDatePicker) {
        this.calendar.selectedDate = item.date
        this.$emit('input', this.calendar)

        // Is Auto Closeable
        if (this.fConfigs.isModal && this.fConfigs.isAutoCloseable) {
          this.showCalendar = false
        }
      } else if (this.fConfigs.isMultipleDatePicker) {
        if (
          this.calendar.hasOwnProperty('selectedDates') &&
          this.calendar.selectedDates.find(date => date.date === item.date)
        ) {
          let dateIndex = this.calendar.selectedDates.findIndex(
            date => date.date === item.date
          )
          this.calendar.selectedDates.splice(dateIndex, 1)
        } else {
          let date = Object.assign({}, this.defaultDateFormat)
          date.date = item.date

          if (!this.calendar.hasOwnProperty('selectedDates')) {
            this.calendar.selectedDates = []
          }

          this.calendar.selectedDates.push(date)
        }

        this.$emit('input', this.calendar)
      }

      this.markChooseDays()

      // Time Picker
      if (this.fConfigs.withTimePicker) {
        if (this.fConfigs.isDateRange || this.fConfigs.isDatePicker) {
          this.openTimePicker()
        }

        if (
          this.calendar.selectedDates.find(date => date.date === item.date) &&
          this.fConfigs.isMultipleDatePicker
        ) {
          this.openTimePicker()
        }
      }

      this.$emit('choseDay', item)
    },
    markChooseDays() {
      let startDate = this.startDMY
      let endDate = this.endDMY
      this.listCalendars.forEach(calendar => {
        calendar.weeks.forEach(week => {
          week.days.forEach(day => {
            day.isMarked = false
            day.date = day.date.split(' ')[0]
            // Date Picker
            if (this.fConfigs.isDatePicker) {
              if (this.calendar.selectedDate === day.date) day.isMarked = true
            } else if (this.fConfigs.isMultipleDatePicker) {
              if (
                this.calendar.hasOwnProperty('selectedDates') &&
                this.calendar.selectedDates.find(date => date.date === day.date)
              )
                day.isMarked = true
            } else {
              day.isMouseToLeft = false
              day.isMouseToRight = false
              // Date Range
              if (startDate === day.date) {
                day.isMouseToLeft = !!endDate
                day.isMarked = true
              }

              if (endDate === day.date) {
                day.isMouseToRight = !!endDate
                day.isMarked = true
              }
              //Multiple Range
              if (this.calendar.multipleDateRange) {
                if (
                  ~this.calendar.multipleDateRange
                    .map(range => range.start.split(' ')[0])
                    .indexOf(day.date)
                ) {
                  day.isMouseToLeft = !!endDate
                  day.isMarked = true
                }
                if (
                  ~this.calendar.multipleDateRange
                    .map(range => range.end.split(' ')[0])
                    .indexOf(day.date)
                ) {
                  day.isMouseToRight = !!endDate
                  day.isMarked = true
                }
                this.calendar.multipleDateRange.forEach(range => {
                  if (range.start && range.start === range.end) {
                    day.isMouseToLeft = false
                    day.isMouseToRight = false
                  }
                  if (range.start && range.end) {
                    if (
                      this.helpCalendar.getDateFromFormat(day.date).getTime() >
                        this.helpCalendar.getDateFromFormat(range.start) &&
                      this.helpCalendar.getDateFromFormat(day.date) <
                        this.helpCalendar.getDateFromFormat(range.end)
                    ) {
                      day.isMarked = true
                    }
                  }
                })
              }

              if (startDate && startDate === endDate) {
                day.isMouseToLeft = false
                day.isMouseToRight = false
              }
              if (startDate && endDate) {
                if (
                  this.helpCalendar.getDateFromFormat(day.date).getTime() >
                    this.helpCalendar.getDateFromFormat(startDate) &&
                  this.helpCalendar.getDateFromFormat(day.date) <
                    this.helpCalendar.getDateFromFormat(endDate)
                ) {
                  day.isMarked = true
                }
              }
            }
            if (this.fConfigs.markedDates.includes(day.date))
              day.isMarked = true
          })
        })
      })
    },
    dayMouseOver(date) {
      this.$emit('dayMouseOver', date)
      this.isDisabledDateMouseOver = this.helpCalendar.isDisabledDate(date)
      
      if (!this.fConfigs.isDateRange) {
        return false
      }

      // Limits
      if (this.fConfigs.limits) {
        let limitMin = this.helpCalendar
          .getDateFromFormat(this.fConfigs.limits.min)
          .getTime()
        let limitMax = this.helpCalendar
          .getDateFromFormat(this.fConfigs.limits.max)
          .getTime()
        let limitDate = this.helpCalendar.getDateFromFormat(date).getTime()

        if (limitDate < limitMin || limitDate > limitMax) {
          return false
        }
      }

      //Multiple Range

      if (
        (this.calendar.dateRange.start === '' ||
          this.calendar.dateRange.end === '') &&
        (this.calendar.dateRange.start !== '' ||
          this.calendar.dateRange.end !== '')
      ) {
        for (let e = 0; e < this.listCalendars.length; e++) {
          let calendar = this.listCalendars[e]

          for (let f = 0; f < calendar.weeks.length; f++) {
            let week = calendar.weeks[f]

            for (let i = 0; i < week.days.length; i++) {
              let item = week.days[i]

              this.listCalendars[e].weeks[f].days[i].isHovered = false
              if (
                item.date !== this.startDMY &&
                !this.fConfigs.markedDates.includes(item.date)
              ) {
                this.listCalendars[e].weeks[f].days[i].isMarked = false
              }

              if (this.calendar.dateRange.start) {
                let itemDate = this.helpCalendar
                  .getDateFromFormat(item.date)
                  .getTime()

                let thisDate = this.helpCalendar
                  .getDateFromFormat(date)
                  .getTime()
                let startDate = this.helpCalendar.getDateFromFormat(
                  this.calendar.dateRange.start
                )

                this.listCalendars[e].weeks[f].days[i].isMouseToLeft =
                  (itemDate === startDate.getTime() &&
                    thisDate > startDate.getTime()) ||
                  (itemDate === thisDate && thisDate < startDate.getTime())
                this.listCalendars[e].weeks[f].days[i].isMouseToRight =
                  (itemDate === startDate.getTime() &&
                    thisDate < startDate.getTime()) ||
                  (itemDate === thisDate && thisDate > startDate.getTime())

                let dateDay =
                  this.helpCalendar.getDateFromFormat(item.date).getDay() - 1
                if (dateDay === -1) {
                  dateDay = 6
                }

                let dayOfWeekString = this.fConfigs.dayNames[dateDay]
                if (
                  !this.fConfigs.disabledDayNames.includes(dayOfWeekString) &&
                  ((itemDate > startDate.getTime() && itemDate < thisDate) ||
                    (itemDate < startDate.getTime() && itemDate > thisDate))
                ) {
                  this.listCalendars[e].weeks[f].days[i].isMarked = true
                }

                if (!this.calendar.dateRange.end && itemDate === thisDate) {
                  this.listCalendars[e].weeks[f].days[i].isHovered = false
                }

                if (
                  this.checkSelDates(
                    'min',
                    this.calendar.dateRange.start,
                    item.date,
                    date
                  )
                ) {
                  this.listCalendars[e].weeks[f].days[i].isMarked = true

                  let minDateToRight, minDateToLeft
                  minDateToLeft = new Date(startDate.getTime())
                  minDateToRight = new Date(startDate.getTime())
                  minDateToLeft.setDate(
                    minDateToLeft.getDate() - this.fConfigs.minSelDays + 1
                  )
                  minDateToRight.setDate(
                    minDateToRight.getDate() + this.fConfigs.minSelDays - 1
                  )

                  if (
                    thisDate >= minDateToLeft.getTime() &&
                    this.helpCalendar.formatDate(minDateToLeft) === item.date
                  ) {
                    this.listCalendars[e].weeks[f].days[i].isMarked = false
                    this.listCalendars[e].weeks[f].days[i].isMouseToLeft = true
                    this.listCalendars[e].weeks[f].days[i].isHovered = true
                  } else if (
                    thisDate <= minDateToRight.getTime() &&
                    this.helpCalendar.formatDate(minDateToRight) === item.date
                  ) {
                    this.listCalendars[e].weeks[f].days[i].isMarked = false
                    this.listCalendars[e].weeks[f].days[i].isMouseToRight = true
                    this.listCalendars[e].weeks[f].days[i].isHovered = true
                  }
                }

                if (
                  this.checkSelDates(
                    'max',
                    this.calendar.dateRange.start,
                    item.date,
                    date
                  )
                ) {
                  this.listCalendars[e].weeks[f].days[i].isMarked = false
                  this.listCalendars[e].weeks[f].days[i].isHovered = false
                  this.listCalendars[e].weeks[f].days[i].isMouseToLeft = false
                  this.listCalendars[e].weeks[f].days[i].isMouseToRight = false

                  let maxDateToLeft, maxDateToRight
                  maxDateToLeft = new Date(startDate.getTime())
                  maxDateToRight = new Date(startDate.getTime())
                  maxDateToLeft.setDate(
                    maxDateToLeft.getDate() - this.fConfigs.maxSelDays + 1
                  )
                  maxDateToRight.setDate(
                    maxDateToRight.getDate() + this.fConfigs.maxSelDays - 1
                  )

                  if (thisDate <= maxDateToLeft.getTime()) {
                    if (
                      this.helpCalendar.formatDate(maxDateToLeft) === item.date
                    ) {
                      this.listCalendars[e].weeks[f].days[i].isHovered = true
                      this.listCalendars[e].weeks[f].days[
                        i
                      ].isMouseToLeft = true
                    }
                  }

                  if (thisDate >= maxDateToRight.getTime()) {
                    if (
                      this.helpCalendar.formatDate(maxDateToRight) === item.date
                    ) {
                      this.listCalendars[e].weeks[f].days[i].isHovered = true
                      this.listCalendars[e].weeks[f].days[
                        i
                      ].isMouseToRight = true
                    }
                  }
                }
              }
            }
          }
        }
      }
      if (this.calendar.multipleDateRange) {
        let range = this.calendar.multipleDateRange[
          this.calendar.multipleDateRange.length - 1
        ]
        if (!range) return
        // this.calendar.multipleDateRange.forEach((range, index) => {
        if (
          (range.start === '' || range.end === '') &&
          (range.start !== '' || range.end !== '')
        ) {
          for (let e = 0; e < this.listCalendars.length; e++) {
            let calendar = this.listCalendars[e]

            for (let f = 0; f < calendar.weeks.length; f++) {
              let week = calendar.weeks[f]

              for (let i = 0; i < week.days.length; i++) {
                let item = week.days[i]

                this.listCalendars[e].weeks[f].days[i].isHovered = false
                if (
                  item.date !== this.startDMY &&
                  !this.fConfigs.markedDates.includes(item.date)
                ) {
                  this.listCalendars[e].weeks[f].days[i].isMarked = false
                }

                if (range.start) {
                  let itemDate = this.helpCalendar
                    .getDateFromFormat(item.date)
                    .getTime()

                  let thisDate = this.helpCalendar
                    .getDateFromFormat(date)
                    .getTime()
                  let startDate = this.helpCalendar.getDateFromFormat(
                    range.start
                  )

                  this.listCalendars[e].weeks[f].days[i].isMouseToLeft =
                    (itemDate === startDate.getTime() &&
                      thisDate > startDate.getTime()) ||
                    (itemDate === thisDate && thisDate < startDate.getTime())
                  this.listCalendars[e].weeks[f].days[i].isMouseToRight =
                    (itemDate === startDate.getTime() &&
                      thisDate < startDate.getTime()) ||
                    (itemDate === thisDate && thisDate > startDate.getTime())

                  let dateDay =
                    this.helpCalendar.getDateFromFormat(item.date).getDay() - 1
                  if (dateDay === -1) {
                    dateDay = 6
                  }

                  let dayOfWeekString = this.fConfigs.dayNames[dateDay]
                  if (
                    !this.fConfigs.disabledDayNames.includes(dayOfWeekString) &&
                    ((itemDate > startDate.getTime() && itemDate < thisDate) ||
                      (itemDate < startDate.getTime() && itemDate > thisDate))
                  ) {
                    this.listCalendars[e].weeks[f].days[i].isMarked = true
                  }

                  if (!range.end && itemDate === thisDate) {
                    this.listCalendars[e].weeks[f].days[i].isHovered = false
                  }

                  if (this.checkSelDates('min', range.start, item.date, date)) {
                    this.listCalendars[e].weeks[f].days[i].isMarked = true

                    let minDateToRight, minDateToLeft
                    minDateToLeft = new Date(startDate.getTime())
                    minDateToRight = new Date(startDate.getTime())
                    minDateToLeft.setDate(
                      minDateToLeft.getDate() - this.fConfigs.minSelDays + 1
                    )
                    minDateToRight.setDate(
                      minDateToRight.getDate() + this.fConfigs.minSelDays - 1
                    )

                    if (
                      thisDate >= minDateToLeft.getTime() &&
                      this.helpCalendar.formatDate(minDateToLeft) === item.date
                    ) {
                      this.listCalendars[e].weeks[f].days[i].isMarked = false
                      this.listCalendars[e].weeks[f].days[
                        i
                      ].isMouseToLeft = true
                      this.listCalendars[e].weeks[f].days[i].isHovered = true
                    } else if (
                      thisDate <= minDateToRight.getTime() &&
                      this.helpCalendar.formatDate(minDateToRight) === item.date
                    ) {
                      this.listCalendars[e].weeks[f].days[i].isMarked = false
                      this.listCalendars[e].weeks[f].days[
                        i
                      ].isMouseToRight = true
                      this.listCalendars[e].weeks[f].days[i].isHovered = true
                    }
                  }

                  if (this.checkSelDates('max', range.start, item.date, date)) {
                    this.listCalendars[e].weeks[f].days[i].isMarked = false
                    this.listCalendars[e].weeks[f].days[i].isHovered = false
                    this.listCalendars[e].weeks[f].days[i].isMouseToLeft = false
                    this.listCalendars[e].weeks[f].days[
                      i
                    ].isMouseToRight = false

                    let maxDateToLeft, maxDateToRight
                    maxDateToLeft = new Date(startDate.getTime())
                    maxDateToRight = new Date(startDate.getTime())
                    maxDateToLeft.setDate(
                      maxDateToLeft.getDate() - this.fConfigs.maxSelDays + 1
                    )
                    maxDateToRight.setDate(
                      maxDateToRight.getDate() + this.fConfigs.maxSelDays - 1
                    )

                    if (thisDate <= maxDateToLeft.getTime()) {
                      if (
                        this.helpCalendar.formatDate(maxDateToLeft) ===
                        item.date
                      ) {
                        this.listCalendars[e].weeks[f].days[i].isHovered = true
                        this.listCalendars[e].weeks[f].days[
                          i
                        ].isMouseToLeft = true
                      }
                    }

                    if (thisDate >= maxDateToRight.getTime()) {
                      if (
                        this.helpCalendar.formatDate(maxDateToRight) ===
                        item.date
                      ) {
                        this.listCalendars[e].weeks[f].days[i].isHovered = true
                        this.listCalendars[e].weeks[f].days[
                          i
                        ].isMouseToRight = true
                      }
                    }
                  }
                }
              }
            }
          }
        }
        // })
      }
    },
    /**
     * @return {boolean}
     */
    PreMonth(calendarKey = null) {
      if (!this.allowPreDate) return false

      this.transitionPrefix = 'right'

      let step = this.fConfigs.changeMonthStep

      calendarKey = calendarKey !== null ? calendarKey : 0

      let currentCalendar = this.listCalendars[calendarKey]
      currentCalendar.date = new Date(
        currentCalendar.date.getFullYear(),
        currentCalendar.date.getMonth() - step
      )
      currentCalendar.key -= hUniqueID()
      this.updateCalendar()

      if (!this.fConfigs.isSeparately) {
        this.calendar.currentDate = currentCalendar.date
        this.initCalendar()
      }

      this.$emit('changedMonth', currentCalendar.date)
    },
    /**
     * @return {boolean}
     */
    NextMonth(calendarKey = null) {
      if (!this.allowNextDate) return false

      this.transitionPrefix = 'left'

      let step = this.fConfigs.changeMonthStep

      calendarKey = calendarKey !== null ? calendarKey : 0

      let currentCalendar = this.listCalendars[calendarKey]
      currentCalendar.date = new Date(
        currentCalendar.date.getFullYear(),
        currentCalendar.date.getMonth() + step
      )
      currentCalendar.key += hUniqueID()
      this.updateCalendar()

      if (!this.fConfigs.isSeparately) {
        this.calendar.currentDate = currentCalendar.date
        this.initCalendar()
      }

      this.$emit('changedMonth', currentCalendar.date)
    },
    /**
     * @return {boolean}
     */
    PreYear(calendarKey = null) {
      if (!this.allowPreDate) return false

      let step = this.showYearPicker ? this.fConfigs.changeYearStep : 1

      calendarKey = calendarKey !== null ? calendarKey : 0

      let currentCalendar = this.listCalendars[calendarKey]
      currentCalendar.date = new Date(
        currentCalendar.date.getFullYear() - step,
        currentCalendar.date.getMonth()
      )
      this.updateCalendar()

      if (!this.fConfigs.isSeparately) {
        this.calendar.currentDate = currentCalendar.date
        this.initCalendar()
      }

      this.$emit('changedYear', currentCalendar.date)
    },
    /**
     * @return {boolean}
     */
    NextYear(calendarKey = null) {
      if (!this.allowNextDate) return false

      let step = this.showYearPicker ? this.fConfigs.changeYearStep : 1

      calendarKey = calendarKey !== null ? calendarKey : 0

      let currentCalendar = this.listCalendars[calendarKey]
      currentCalendar.date = new Date(
        currentCalendar.date.getFullYear() + step,
        currentCalendar.date.getMonth()
      )
      this.updateCalendar()

      if (!this.fConfigs.isSeparately) {
        this.calendar.currentDate = currentCalendar.date
        this.initCalendar()
      }

      this.$emit('changedYear', currentCalendar.date)
    },
    ChooseDate(date) {
      let newDate = this.helpCalendar.getDateFromFormat(date)

      if (date === 'today') {
        newDate = new Date()
      }

      this.listCalendars[0].date = this.calendar.currentDate = newDate

      this.updateCalendar()
      this.initCalendar()
    },
    openMonthPicker(key) {
      if (this.fConfigs.changeMonthFunction) {
        this.showMonthPicker = key === this.showMonthPicker ? false : key
        this.showYearPicker = false
      }
    },
    openYearPicker(key) {
      if (this.fConfigs.changeYearFunction) {
        this.showYearPicker = key === this.showYearPicker ? false : key
        this.showMonthPicker = false
      }
    },
    openTimePicker() {
      this.showTimePicker = true
    },
    pickMonth(key, calendarKey) {
      this.showMonthPicker = false
      if (!this.isSeparately) {
        this.listCalendars.forEach((currentCalendar, index) => {
          let date = currentCalendar.date
          currentCalendar.date = new Date(
            date.getFullYear(),
            key + 1 + index,
            0
          )
          currentCalendar.key += hUniqueID()
        })
      } else {
        let currentCalendar = this.listCalendars[calendarKey]
        let date = currentCalendar.date
        currentCalendar.date = new Date(date.getFullYear(), key + 1, 0)
        currentCalendar.key += hUniqueID()
      }

      let currentCalendar = this.listCalendars[calendarKey]
      this.$emit('changedMonth', currentCalendar.date);
      this.updateCalendar()
    },
    pickYear(year, calendarKey) {
      this.showYearPicker = false
      if (!this.isSeparately) {
        this.listCalendars.forEach(currentCalendar => {
          let date = currentCalendar.date
          currentCalendar.date = new Date(year, date.getMonth() + 1, 0)
          currentCalendar.key += hUniqueID()
        })
      } else {
        let currentCalendar = this.listCalendars[calendarKey]
        let date = currentCalendar.date
        currentCalendar.date = new Date(year, date.getMonth() + 1, 0)
        currentCalendar.key += hUniqueID()
      }
      this.updateCalendar()
    },
    getYearList(date, delta) {
      let years = []
      let year = date.getFullYear() - 4 + delta
      for (let i = 0; i < 12; i++) {
        let finalYear = year + i

        years.push({
          year: finalYear
        })
      }
      return years
    },
    /**
     * Add date to selectedDates list
     * @param index
     */
    addToSelectedDates() {
      if (this.helpCalendar.checkValidDate(this.calendar.selectedDatesItem)) {
        let date = Object.assign({}, this.defaultDateFormat)
        date.date = this.calendar.selectedDatesItem
        this.calendar.selectedDates.push(date)
        this.calendar.selectedDatesItem = ''
        this.markChooseDays()
      }
    },
    /**
     * Remove date from selectedDates list
     * @param index
     */
    removeFromSelectedDates(index) {
      this.calendar.selectedDates.splice(index, 1)
      this.markChooseDays()
    },

    checkDateRangeEnd(date) {
      if (Array.isArray(this.fConfigs.markedDateRange)) {
        return (
          this.fConfigs.markedDateRange.findIndex(range => {
            return range.end === date
          }) !== -1
        )
      }

      return date === this.fConfigs.markedDateRange.end
    },
    checkSelDates(type, startDate, itemDate, hoverDate) {
      let startTime = this.helpCalendar.getDateFromFormat(startDate).getTime()
      let itemTime = this.helpCalendar.getDateFromFormat(itemDate).getTime()
      let hoverTime = this.helpCalendar.getDateFromFormat(hoverDate).getTime()

      let days =
        type === 'min' ? this.fConfigs.minSelDays : this.fConfigs.maxSelDays - 2
      let minTime = days * 1000 * 60 * 60 * 24
      let rightTime = startTime + minTime
      let leftTime = startTime - minTime

      let result
      if (hoverTime > startTime) {
        if (type === 'min')
          result =
            itemTime < rightTime &&
            itemTime > startTime &&
            this.fConfigs.minSelDays
        else
          result =
            itemTime > rightTime &&
            itemTime > startTime &&
            this.fConfigs.maxSelDays
      } else if (hoverTime < startTime) {
        if (type === 'min')
          result =
            itemTime > leftTime &&
            itemTime < startTime &&
            this.fConfigs.minSelDays
        else
          result =
            itemTime < leftTime &&
            itemTime < startTime &&
            this.fConfigs.maxSelDays
      }

      return result
    },
    checkLimits(value) {
      if (this.fConfigs.limits) {
        let min = new Date(
          this.helpCalendar.getDateFromFormat(this.fConfigs.limits.min)
        )
        min.setDate(1)
        min.setHours(0, 0, 0, 0)
        let max = new Date(
          this.helpCalendar.getDateFromFormat(this.fConfigs.limits.max)
        )
        max.setDate(1)
        max.setHours(0, 0, 0, 0)

        this.allowPreDate = true
        this.allowNextDate = true

        let current = new Date(value)
        current.setDate(1)
        current.setHours(0, 0, 0, 0)

        if (current <= min) {
          this.allowPreDate = false
        }

        if (current >= max) {
          this.allowNextDate = false
        }
      }
    },
    getTransition_() {
      if (!this.fConfigs.transition) return ''

      let name = ''
      if (this.transitionPrefix === 'left') {
        name = 'vfc-calendar-slide-left'
      } else if (this.transitionPrefix === 'right') {
        name = 'vfc-calendar-slide-right'
      }
      return name
    },
    checkHiddenElement(elementName) {
      return !this.fConfigs.hiddenElements.includes(elementName)
    },
    onFocusIn() {
      if (this.fConfigs.isModal) {
        this.showCalendar = true
      }
    },
    onFocusOut(e) {
      if (
        this.fConfigs.isModal &&
        !hElContains(this.popoverElement, e.relatedTarget)
      ) {
        return (this.showCalendar = this.showMonthPicker = this.showYearPicker = false)
      }
    },

    hideMonthYearPicker(e) {
      this.$nextTick(() => {
        if (this.showMonthPicker || this.showYearPicker) {
          let key = this.showMonthPicker
            ? this.showMonthPicker - 1
            : this.showYearPicker - 1

          const MYactive = this.$refs.calendars.querySelectorAll(
            `.vfc-content-MY-picker`
          )[key]
          if (MYactive.contains(e.target)) {
            return
          }
          return (this.showMonthPicker = this.showYearPicker = false)
        }
      })
    },

    checkDateRangeStart(date) {
      if (Array.isArray(this.fConfigs.markedDateRange)) {
        return (
          this.fConfigs.markedDateRange.findIndex(range => {
            return range.start === date
          }) !== -1
        )
      }

      return date === this.fConfigs.markedDateRange.start
    },
    cleanRange() {
      if (!this.isMultipleDateRange) {
        this.calendar.dateRange.end = ''
        this.calendar.dateRange.start = ''
        return
      }
      this.calendar.multipleDateRange = []
      // this.calendar.multipleDateRange.push({
      //   start: '',
      //   end: ''
      // })
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/calendar.scss';
.rangeCleaner {
  padding: 5px 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    color: white;
    border-radius: 5px;
    border: none;
    padding: 5px;
    &.active {
      &:hover {
        background-color: #4f8a9e;
        cursor: pointer;
      }
      background-color: #66b3cc;
    }
    &.disabled {
      background-color: rgb(148, 148, 148);
    }
  }
}
</style>
