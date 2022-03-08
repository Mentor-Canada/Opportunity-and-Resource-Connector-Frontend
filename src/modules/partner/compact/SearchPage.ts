import BaseMixin from "../../../mixins/BaseMixin"
import WindowInterface from "Interfaces/WindowInterface"
import Search from "Models/Search"
import PageMixin from "../../../mixins/PageMixin"
import template from "./Search.html"
import CAOptions from "Models/CAOptions"

declare const window: WindowInterface

export default {

  template: template,

  mixins: [BaseMixin, PageMixin],

  data() {
    return {
      search: new Search(),
      handler: '',
      optionsRoleInMentoring: [
        {value: "mentor", name: this.t("app-become-a-mentor")},
        {value: "mentee", name: this.t("app-become-a-mentee")},
      ],
      optionsTypeOfMentoring: [
        {value: 'all', name: this.t('app-all')},
        {value: 'app-type-of-mentoring-1-to-1', name: this.t('app-type-of-mentoring-1-to-1')},
        {value: 'app-type-of-mentoring-group', name: this.t('app-type-of-mentoring-group')},
        {value: 'app-type-of-mentoring-team', name: this.t('app-type-of-mentoring-team')},
        {value: 'app-type-of-mentoring-e-mentoring', name: this.t('app-type-of-mentoring-e-mentoring')},
        {value: 'app-type-of-mentoring-peer', name: this.t('app-type-of-mentoring-peer')},
        {value: 'app-type-of-mentoring-school', name: this.t('app-type-of-mentoring-school')},
        {value: 'other', name: this.t('app-other')}
      ]
    }
  },

  computed: {
    optionsDistanceToMentoring() {
      if (this.countryCode == 'ca') {
        return CAOptions.distanceOptions()
      }
      return [
        {value: "5", name: this.t("app-5-miles")},
        {value: "10", name: this.t("app-10-miles")},
        {value: "15", name: this.t("app-15-miles")},
        {value: "25", name: this.t("app-25-miles")},
      ]
    },
    optionsFocusArea() {
      if(this.countryCode == 'ca') {
        return [
          { value: "all", name: this.t('app-all') },
          { value: 'app-ca-program-focus-academics-literacy', name: this.t('app-ca-program-focus-academics-literacy') },
          { value: 'app-ca-program-focus-arts', name: this.t('app-ca-program-focus-arts') },
          { value: 'app-ca-program-focus-job-skills-career-readiness', name: this.t('app-ca-program-focus-job-skills-career-readiness') },
          { value: 'app-ca-program-focus-sports-activities', name: this.t('app-ca-program-focus-sports-activities') },
          { value: 'app-ca-program-focus-stem', name: this.t('app-ca-program-focus-stem') },
          { value: 'app-ca-program-focus-social-emotional-skills', name: this.t('app-ca-program-focus-social-emotional-skills') },
          { value: 'app-ca-program-focus-community-connections-building-social-capital', name: this.t('app-ca-program-focus-community-connections-building-social-capital') },
          { value: 'app-ca-program-focus-health-and-well-being', name: this.t('app-ca-program-focus-health-and-well-being') },
          { value: 'app-ca-program-focus-faith', name: this.t('app-ca-program-focus-faith') },
          { value: 'app-ca-program-focus-culture', name: this.t('app-ca-program-focus-culture') },
          { value: 'other', name: this.t('app-other') }
        ]
      }
      return [
        { value: "all", name: this.t('app-all') },
        { value: 'app-us-program-focus-academics', name: this.t('app-us-program-focus-academics') },
        { value: 'app-us-program-focus-arts', name: this.t('app-us-program-focus-arts') },
        { value: 'app-us-program-focus-job-skills', name: this.t('app-us-program-focus-job-skills') },
        { value: 'app-us-program-focus-job-sports', name: this.t('app-us-program-focus-job-sports') },
        { value: 'app-us-program-focus-job-stem', name: this.t('app-us-program-focus-job-stem') },
        { value: 'other', name: this.t('app-other') }
      ]
    },
    optionsAgesProgramServes() {
      if(this.countryCode == 'ca') {
        return [
          { value: "all", name: this.t('app-all') },
          { value: 'app-ca-7-and-under', name: this.t('app-ca-7-and-under') },
          { value: 'app-ca-8-11', name: this.t('app-ca-8-11') },
          { value: 'app-ca-12-14', name: this.t('app-ca-12-14') },
          { value: 'app-ca-15-17', name: this.t('app-ca-15-17') },
          { value: 'app-ca-18-24', name: this.t('app-ca-18-24') },
          { value: 'app-ca-25-and-over', name: this.t('app-ca-25-and-over') },
          { value: 'other', name: this.t('app-other') }
        ]
      }
      return [
        { value: "all", name: this.t('app-all') },
        { value: 'app-us-7-and-under', name: this.t('app-us-7-and-under') },
        { value: 'app-us-8-10', name: this.t('app-us-8-10') },
        { value: 'app-us-11-14', name: this.t('app-us-11-14') },
        { value: 'app-us-15-18', name: this.t('app-us-15-18') },
        { value: 'app-us-19-24', name: this.t('app-us-19-24') },
        { value: 'other', name: this.t('app-other') }
      ]
    },
    optionsYouthProgramServes() {
      if(this.countryCode == 'ca') {
        return [
          { value: "all", name: this.t('app-all') },
          { value: 'app-ca-academically-at-risk', name: this.t('app-ca-academically-at-risk') },
          { value: 'app-ca-college-post-secondary-student', name: this.t('app-ca-college-post-secondary-student') },
          { value: 'app-ca-foster-residential-or-kinship-care', name: this.t('app-ca-foster-residential-or-kinship-care') },
          { value: 'app-ca-gang-involved-or-gang-at-risk', name: this.t('app-ca-gang-involved-or-gang-at-risk') },
          { value: 'app-ca-gifted-talented-academic-achiever', name: this.t('app-ca-gifted-talented-academic-achiever') },
          { value: 'app-ca-incarcerated-parent', name: this.t('app-ca-incarcerated-parent') },
          { value: 'app-ca-low-income', name: this.t('app-ca-low-income') },
          { value: 'app-ca-neet-opportunity-youth', name: this.t('app-ca-neet-opportunity-youth') },
          { value: 'app-ca-physical-disabilities-special-care-needs', name: this.t('app-ca-physical-disabilities-special-care-needs') },
          { value: 'app-ca-recent-immigrant-refugee', name: this.t('app-ca-recent-immigrant-refugee') },
          { value: 'app-ca-single-parent-household', name: this.t('app-ca-single-parent-household') },
          { value: 'app-ca-adjudicated-court-involved', name: this.t('app-ca-adjudicated-court-involved') },
          { value: 'app-ca-emancipated', name: this.t('app-ca-emancipated') },
          { value: 'app-ca-general-youth-population', name: this.t('app-ca-general-youth-population') },
          { value: 'app-ca-homeless-living-in-a-shelter', name: this.t('app-ca-homeless-living-in-a-shelter') },
          { value: 'app-ca-lgbtq-youth', name: this.t('app-ca-lgbtq-youth') },
          { value: 'app-ca-mental-health-needs', name: this.t('app-ca-mental-health-needs') },
          { value: 'app-ca-parent-involved-in-military', name: this.t('app-ca-parent-involved-in-military') },
          { value: 'app-ca-pregnant-parenting', name: this.t('app-ca-pregnant-parenting') },
          { value: 'app-ca-school-drop-out', name: this.t('app-ca-school-drop-out') },
          { value: 'app-ca-special-education', name: this.t('app-ca-special-education') },
          { value: 'other', name: this.t('app-other') }
        ]
      }
      return [
        { value: "all", name: this.t('app-all') },
        { value: 'app-us-academically-at-risk', name: this.t('app-us-academically-at-risk') },
        { value: 'app-us-college-post-secondary-student', name: this.t('app-us-college-post-secondary-student') },
        { value: 'app-us-foster-residential-or-kinship-care', name: this.t('app-us-foster-residential-or-kinship-care') },
        { value: 'app-us-gang-involved', name: this.t('app-us-gang-involved') },
        { value: 'app-us-gifted-talented-academic-achiever', name: this.t('app-us-gifted-talented-academic-achiever') },
        { value: 'app-us-incarcerated-parent', name: this.t('app-us-incarcerated-parent') },
        { value: 'app-us-low-income', name: this.t('app-us-low-income') },
        { value: 'app-us-opportunity-youth', name: this.t('app-us-opportunity-youth') },
        { value: 'app-us-physical-disabilities-special-care-needs', name: this.t('app-us-physical-disabilities-special-care-needs') },
        { value: 'app-us-recent-immigrant-refugee', name: this.t('app-us-recent-immigrant-refugee') },
        { value: 'app-us-single-parent-household', name: this.t('app-us-single-parent-household') },
        { value: 'app-us-youth-with-disabilities', name: this.t('app-us-youth-with-disabilities') },
        { value: 'app-us-adjudicated-court-involved', name: this.t('app-us-adjudicated-court-involved') },
        { value: 'app-us-first-generation-college', name: this.t('app-us-first-generation-college') },
        { value: 'app-us-gang-at-risk', name: this.t('app-us-gang-at-risk') },
        { value: 'app-us-general-youth-population', name: this.t('app-us-general-youth-population') },
        { value: 'app-us-homeless-runaway', name: this.t('app-us-homeless-runaway') },
        { value: 'app-us-lgbtq-youth', name: this.t('app-us-lgbtq-youth') },
        { value: 'app-us-mental-health-issues', name: this.t('app-us-mental-health-issues') },
        { value: 'app-us-parent-involved-in-military', name: this.t('app-us-parent-involved-in-military') },
        { value: 'app-us-pregnant-parenting', name: this.t('app-us-pregnant-parenting') },
        { value: 'app-us-school-drop-out', name: this.t('app-us-school-drop-out') },
        { value: 'app-us-special-education', name: this.t('app-us-special-education') },
        { value: 'other', name: this.t('app-other') }
      ]
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

  mounted() {
    document.body.classList.add('partner-search-compact')
    this.ready()
    this.handler = `${window.location.origin}/${this.app.language.langcode}/handler`
  }

}