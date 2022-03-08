import BaseMixin from "../../../mixins/BaseMixin"
import Program from "Models/program/Program"
import Application from "Models/Application"
import Search from "Models/Search"
import WindowInterface from "Interfaces/WindowInterface"
import PageMixin from "../../../mixins/PageMixin"
import $ from "../../../../node_modules/jquery"
import "../../../../node_modules/slick-carousel"
import ResultCollectionBuilder from "../../results/ResultCollectionBuilder"
import ResultUtils from "../../results/ResultUtils"
import Result from "../../results/Result"

declare const window: WindowInterface

export default {

  mixins: [BaseMixin, PageMixin],

  data() {
    return {
      pageType: 'program-apply',
      application: new Application(),
      search: new Search(),
      program: new Program(),
      pageHeader: "",
      programTip: "",
      programType: "",
      logoUrl: "",
      organizationLogoUrl: "",
      optionsRoleInMentoring: [
        {value: "mentor", name: this.t("app-become-a-mentor")},
        {value: "mentee", name: this.t("app-become-a-mentee")},
      ],
      acceptingMentors: false,
      acceptingMentees: false,
      accepting: false,
      moreResults: [],
      moreResultsRange: "",
      moreResultsTotalSlides: 1,
      physicalTip: "",
      googleMapUrl: null,
      isSearchUrl: false
    }
  },

  beforeRouteUpdate(to, from, next) {
    $(this.$el.querySelector(".more-results-carousel")).slick('unslick')
    this.isReady = false
    next()
    this.render()
  },

  async mounted() {
    await this.render()
  },

  computed: {
    ages() {
      if (this.countryCode == 'ca') {
        return [
          [7],
          [8, 11],
          [12, 14],
          [15, 17],
          [18, 24],
          [25]
        ]
      }
      return [
        [7],
        [8, 10],
        [11, 14],
        [15, 18],
        [19, 24]
      ]
    },
    focusIcon() {
      let icons = {}
      if(this.countryCode == 'ca') {
        icons = {
          app_ca_program_focus_academics_literacy: 'school',
          app_ca_program_focus_arts: 'palette',
          app_ca_program_focus_job_skills_career_readiness: 'work_outline',
          app_ca_program_focus_sports_activities: 'sports',
          app_ca_program_focus_stem: 'biotech',
          app_ca_program_focus_social_emotional_skills: 'sentiment_satisfied_alt',
          app_ca_program_focus_community_connections_building_social_capital: 'groups',
          app_ca_program_focus_health_and_well_being: 'self_improvement',
          app_ca_program_focus_faith: 'brightness_high',
          app_ca_program_focus_culture: 'history_edu',
          other: 'supervisor_account'
        }
      }
      else {
        icons = {
          app_us_program_focus_academics: 'school',
          app_us_program_focus_arts: 'palette',
          app_us_program_focus_job_skills: 'work_outline',
          app_us_program_focus_job_sports: 'sports',
          app_us_program_focus_job_stem: 'biotech',
          other: 'supervisor_account'
        }
      }
      let focus = this.program.attributes.focusArea
      let icon = icons[focus?.replace(/-/g, "_")]
      if(!icon) icon = icons['other']
      return icon
    },
    optionsHowDidYouHearAboutUs() {
      if(this.countryCode == 'ca') {
        return [
          { value: 'app-ca-hear-about-us-mentoring-canada-website', name: this.t('app-ca-hear-about-us-mentoring-canada-website') },
          { value: 'app-ca-hear-about-us-alberta-mentoring-partnership', name: this.t('app-ca-hear-about-us-alberta-mentoring-partnership') },
          { value: 'app-ca-hear-about-us-ontario-mentoring-coalition', name: this.t('app-ca-hear-about-us-ontario-mentoring-coalition') },
          { value: 'app-ca-hear-about-us-linkedin', name: this.t('app-ca-hear-about-us-linkedin') },
          { value: 'app-ca-hear-about-us-mentoring-partnership-in-my-province-region', name: this.t('app-ca-hear-about-us-mentoring-partnership-in-my-province-region') },
          { value: 'app-ca-hear-about-us-national-mentoring-month-materials', name: this.t('app-ca-hear-about-us-national-mentoring-month-materials') },
          { value: 'other', name: this.t('app-other') }
        ]
      }
      return [
        { value: 'app-us-hear-about-us-mentor-web-site', name: this.t('app-us-hear-about-us-mentor-web-site') },
        { value: 'app-us-hear-about-us-my-brothers-keeper-initiative', name: this.t('app-us-hear-about-us-my-brothers-keeper-initiative') },
        { value: 'app-us-hear-about-us-linkedin', name: this.t('app-us-hear-about-us-linkedin') },
        { value: 'app-us-hear-about-us-nba-cares-mentoring-campaign', name: this.t('app-us-hear-about-us-nba-cares-mentoring-campaign') },
        { value: 'app-us-hear-about-us-mentoring-partnership-in-my-state', name: this.t('app-us-hear-about-us-mentoring-partnership-in-my-state') },
        { value: 'app-us-hear-about-us-coachers-mentoring-challenge', name: this.t('app-us-hear-about-us-coachers-mentoring-challenge') },
        { value: 'app-us-hear-about-us-national-mentoring-month-materials-website', name: this.t('app-us-hear-about-us-national-mentoring-month-materials-website') },
        { value: 'app-us-hear-about-us-the-in-real-life-campaign', name: this.t('app-us-hear-about-us-the-in-real-life-campaign') },
        { value: 'app-us-hear-about-us-mentoring-flipped', name: this.t('app-us-hear-about-us-mentoring-flipped') },
        { value: 'app-us-hear-about-us-mentor-gov', name: this.t('app-us-hear-about-us-mentor-gov') },
        { value: 'app-us-hear-about-us-american-graduate', name: this.t('app-us-hear-about-us-american-graduate') },
        { value: 'app-us-hear-about-us-generation-to-generation', name: this.t('app-us-hear-about-us-generation-to-generation') },
        { value: 'app-us-hear-about-us-equality', name: this.t('app-us-hear-about-us-equality') },
        { value: 'app-us-hear-about-us-yes-project', name: this.t('app-us-hear-about-us-yes-project') },
        { value: 'other', name: this.t('app-other') }
      ]
    },
  },

  methods: {
    async render() {
      this.moreResults = []
      this.application = new Application()
      this.search = new Search()
      this.program = new Program()
      this.app.showLoading()
      this.program.document.id = this.$route.params.programId
      if (this.$route.params.searchId) this.isSearchUrl = true
      await Promise.all([this.program.load()])
      if (this.program.attributes.standing != "app-allowed") {
        this.app.hideLoading()
        return
      }
      document.title = `${this.program.localizedAttributes[this.lang.langcode].field_display_title} | ${this.t("app-sitename")}`

      if (this.isSearchUrl) {
        await Promise.all([this.search.load(this.$route.params.searchId)])
        this.application.attributes.search = this.$route.params.searchId
        this.application.attributes.role = this.search.attributes.role
      }

      this.pageHeader = this.program.localizedAttributes[window.app.language.langcode].field_display_title

      this.application.attributes.program = this.$route.params.programId

      this.application.attributes.howDidYouHearAboutUs = this.search.attributes.howDidYouHearAboutUs
      this.application.attributes.howDidYouHearAboutUsOther = this.search.attributes.howDidYouHearAboutUsOther

      if (this.isSearchUrl) {
        let params = {
          search: this.$route.params.searchId
        }
        const encodeDataToURL = (data) => {
          return Object
            .keys(data)
            .map(value => `${value}=${encodeURIComponent(data[value])}`)
            .join('&')
        }
        let queryString = encodeDataToURL(params)

        const builder = new ResultCollectionBuilder(this.$route.params.searchId)
        let response = await builder.build()
        let rows: any[] = response.data.data as []
        let id = this.program.document.id

        let index = 0
        let found = false
        for (const i in rows) {
          if (rows[i].UUID === id) {
            index = parseInt(i)
            found = true
            break
          }
        }

        let moreIndex
        for (const i in rows) {
          if (rows[i].UUID !== id) {
            moreIndex = parseInt(i)
            this.moreResults.push(new Result(rows[moreIndex]))
          }
        }
        this.moreResultsTotalSlides = this.moreResults.length

        let distance
        if (found) {
          const result = new Result(rows[index])
          distance = rows[index].distance
          this.logoUrl = result.logoUrl
          this.organizationLogoUrl = result.organizationLogoUrl
          this.googleMapUrl = rows[index].googleMapUrl
        }
        this.physicalTip = ResultUtils.getPhysicalTip(distance)
      }

      let accepting = this.program.attributes.programAccepting.map((row) => row.value)
      this.acceptingMentors = accepting.indexOf('app-program-accepting-mentors') != -1
      this.acceptingMentees = accepting.indexOf('app-program-accepting-mentees') != -1
      this.setAccepting()

      this.ready()

      await this.$nextTick()
      if (this.isSearchUrl) {
        this.initSlick()
        this.pageType = 'program-apply-search'
      }
    },

    async submit() {
      if(this.application.attributes.role == '') return
      if(!this.accepting) return
      window.app.showLoading()
      this.application.attributes.searchId = this.search.attributes.id
      this.application.attributes.programId = this.program.attributes.id
      await this.application.save()
      let title = this.program.getTitle()
      if(!this.isSearchUrl) {
        await this.router.push(this.link(`applications/submitted/program-inquiry?title=${title}`))
      } else {
        await this.router.push(this.link(`applications/submitted/${this.application.attributes.search}?title=${title}`))
      }
    },

    isAgeRangeValid(rangeArray) {
      let min
      let max
      if(rangeArray.length == 1) {
        min = 0
        max = rangeArray[0]
      }
      else {
        min = rangeArray[0]
        max = rangeArray[1]
      }

      for(const age of this.program.attributes.programAgesProgramServes) {
        const matches = age.value.match(/[0-9]+/g)
        if(!matches) {
          return false
        }
        let programMin = matches.length == 2 ? matches[0] : 0
        let programMax = matches[matches.length == 2 ? 1 : 0]
        if(min >= programMin && max <= programMax) {
          return true
        }
      }
      return
    },
    typeIcon(type) {
      let icons = {
        app_type_of_mentoring_1_to_1: 'person',
        app_type_of_mentoring_group: 'groups',
        app_type_of_mentoring_team: 'group_work',
        app_type_of_mentoring_e_mentoring: 'personal_video',
        app_type_of_mentoring_peer: 'people_alt',
        app_type_of_mentoring_school: 'school',
        other: 'emoji_objects'
      }
      let icon = icons[type.replace(/-/g, "_")]
      if(!icon) icon = icons['other']
      return icon
    },
    handleClick(programId) {
      this.router.push(`${this.link(`search/${this.$route.params.searchId}/apply/${programId}`)}`)
    },
    searchAgain() {
      this.router.push(this.link(''))
    },
    backToResults() {
      this.router.push(this.link(`search/${this.$route.params.searchId}`))
    },
    setAccepting() {
      if(this.application.attributes.role == 'mentor' && this.acceptingMentors) {
        this.accepting = true
        return
      }
      if(this.application.attributes.role == 'mentee' && this.acceptingMentees) {
        this.accepting = true
        return
      }
      this.accepting = false
    },

    initSlick() {
      let el = this.$el.querySelector(".more-results-carousel")
      let slick = $(el).slick({
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        rows: 0,
        cssEase: "cubic-bezier(.5,0,0,1)",
        speed: 700,
        slide: ".carousel-item",
        prevArrow: "#carousel-button-prev",
        nextArrow: "#carousel-button-next",
        responsive: [
          {
            breakpoint: 950,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 700,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      })
      let getMoreResultsRange = (slick, nextSlide) => {
        let slidesToShow = slick.options.slidesToShow
        let totalSlides = this.moreResultsTotalSlides
        if(slidesToShow >= totalSlides) {
          this.moreResultsRange = this.t("app-more-results-range-short", {pos: totalSlides, total: totalSlides})
          return
        }
        if(slidesToShow == 1) {
          this.moreResultsRange = this.t("app-more-results-range-short", {pos: nextSlide + 1, total: totalSlides})
          return
        }
        let end = nextSlide + slidesToShow
        let start = nextSlide + 1
        if(nextSlide + slidesToShow >= totalSlides) {
          end = totalSlides
          start = end - slidesToShow + 1
        }
        if(start < 1) start = 1
        this.moreResultsRange = this.t("app-more-results-range-long", {start: start, end: end, total: totalSlides})
      }
      getMoreResultsRange(slick.get(0).slick, 0)
      slick.on('beforeChange', (event, slick, currentSlide, nextSlide) => {
        getMoreResultsRange(slick, nextSlide)
      })
    },

  }

}
