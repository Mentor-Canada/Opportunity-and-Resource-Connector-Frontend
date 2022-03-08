import template from "./Admin.html"
import PageMixin from "../../mixins/PageMixin"
import BaseMixin from "BaseMixin"
import AdminMenu from "../../AdminMenu"
import DateRangeOptions from "../../components/DateRangeOptions.vue"
import InquiryCard from "./InquiryCard.vue"
import ProgramCard from "./ProgramCard.vue"
import OrganizationCard from "./OrganizationCard.vue"
import LinkCard from "./LinkCard.vue"

export default {

  mixins: [BaseMixin, PageMixin],

  template: template,

  components: {
    DateRangeOptions,
    InquiryCard,
    ProgramCard,
    OrganizationCard,
    LinkCard
  },

  data() {
    return {
      isAdminPage: true,
      tooltipEl: HTMLDivElement,
      tooltipVisible: false,
      tooltipDimensions: {
        width: 0,
        height: 0
      },
      viewportDimensions: {
        width: 0,
        height: 0
      },
      adminLinksFields: [
        { title: '', name: 'title-slot' },
        { title: '', name: 'icon-slot' },
      ],
      adminLinksList: new AdminMenu(),
      trail: [
        { title: 'app-mentor-connector', url: '' },
        { title: 'app-dashboard', url: null },
      ],
    }
  },

  async mounted() {
    this.app.showLoading()

    this.onResize = () => {
      this.viewportDimensions.width = document.documentElement.clientWidth
      this.viewportDimensions.height = document.documentElement.clientHeight
    }
    this.onMouseMove = (e) => {
      if(this.tooltipVisible) {
        let x = e.clientX
        let y = e.clientY
        if(x + this.tooltipDimensions.width + 10 > this.viewportDimensions.width) {
          x -= (this.tooltipDimensions.width + 10)
        }
        if(y + this.tooltipDimensions.height + 10 > this.viewportDimensions.height) {
          y -= (this.tooltipDimensions.height + 10)
        }
        this.tooltipEl.style.transform = `translate(${x}px, ${y}px)`
      }
    }

    window.addEventListener('resize', this.onResize)
    document.addEventListener('mousemove', this.onMouseMove)
    this.onResize()

    await this.$refs["inquiry-card"].load({ type: 'lastdays', value: 7})
    await this.$refs["program-card"].load({ type: 'lastdays', value: 30 })
    if(this.app.bootstrap.userHasOrganizations) {
      await this.$refs["organization-card"].load({ type: 'lastdays', value: 90 })
    }

    this.ready()
    await this.$nextTick()

    this.tooltipEl = document.getElementById('chartjs-tooltip')

    this.$refs["inquiry-card"].renderChart()

    this.app.hideLoading()
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
    document.removeEventListener('mousemove', this.onMouseMove)
  },

  methods: {
    onDateRangeActive(uid) {
      for(const i in this.$refs) {
        const ref = this.$refs[i]
        if(ref._uid == uid) {
          continue
        }
        ref?.close()
      }
    },

    tooltip(context, that) {
      let tooltipModel = context.tooltip
      if (tooltipModel.opacity === 0) {
        this.tooltipVisible = false
        this.tooltipEl.classList.remove("visible")
        return
      }

      // Set Text
      if (tooltipModel.body) {
        var titleLines = tooltipModel.title || []

        var innerHtml = '<thead>'

        titleLines.forEach(function(title) {
          innerHtml += '<tr><th colspan="2">' + title + '</th></tr>'
        })
        innerHtml += '</thead><tbody>'

        tooltipModel.body.forEach(function(line, i) {
          let label = line.lines[0].label
          let value = line.lines[0].value
          innerHtml += '<tr><td>' + label + '</td><td>' + value + '</td></tr>'
        })
        innerHtml += '</tbody>'

        var tableRoot = this.tooltipEl.querySelector('table')
        tableRoot.innerHTML = innerHtml
      }

      // `this` will be the overall tooltip
      let position = that._chart.canvas.getBoundingClientRect()

      // Display, position, and set styles for font
      this.tooltipVisible = true
      this.tooltipEl.classList.add("visible")
      this.tooltipDimensions.width = this.tooltipEl.offsetWidth
      this.tooltipDimensions.height = this.tooltipEl.offsetHeight
    },

    rowClicked(payload) {
      this.router.push(payload.data.url)
    }
  }

}