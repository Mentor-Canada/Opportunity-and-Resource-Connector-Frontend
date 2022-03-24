import Program from 'Models/program/Program';
import GooglePlace from 'Models/GooglePlace';
import Organization from 'Models/Organization';
import BaseMixin from '../../../mixins/BaseMixin';
import PageMixin from '../../../mixins/PageMixin';
import template from './ProgramDetail.html';
import Vue from '../../../../node_modules/vue/dist/vue';
import globals from '../../../globals';
import GroupMixinForm from '../../../mixins/GroupMixinForm';
import GradesProgramServes from './first-step/GradesProgramServes.vue';
import EMentoringServiceArea from './first-step/EMentoringServiceArea.vue';
import OrganizationDetailPage from '../../organizations/detail/OrganizationDetailPage';
import ProgramDeliveryView from './first-step/ProgramDeliveryView.vue';
import ProgramActions from '../ProgramActions.vue';
import SecondStep from './second-step/SecondStep.vue';

declare let google: any;

export default {

  mixins: [BaseMixin, PageMixin, GroupMixinForm],

  template,

  components: {
    'step-2': SecondStep,
    'grades-program-serves': GradesProgramServes,
    'e-mentoring-service-area': EMentoringServiceArea,
    'program-delivery': ProgramDeliveryView,
    ProgramActions,
  },

  beforeRouteUpdate(to, from, next) {
    this.step = to.params.step;
    next();
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (to.path.match('organization$')) {
        vm.showAddOrganization = true;
      } else {
        vm.showPostOrganizationInfo = to.query.info;
        vm.program.attributes.organization = to.query.organization;
        vm.showAddOrganization = false;
      }
    });
  },

  data() {
    return {
      id: '',
      title: this.t('app-add-program'),
      query: '',
      programTitle: '',
      place: '',
      placeId: '',
      locations: [],
      showPostOrganizationInfo: false,
      program: new Program(),
      parentUrl: this.link('programs'),
      languagesShowOther: false,
      step: null,
      showAddOrganization: false,
      showPlacePickerHint: false,
      optionsProgramAccepting: [
        { value: 'app-program-accepting-mentors', name: this.t('app-program-accepting-mentors') },
        { value: 'app-program-accepting-mentees', name: this.t('app-program-accepting-mentees') },
        { value: 'app-program-no-public-recruitment', name: this.t('app-program-no-public-recruitment') },
        { value: 'app-program-currently-not-recruiting', name: this.t('app-program-currently-not-recruiting') },
      ],
      optionsProgramDelivery: [
        { value: 'app-program-delivery-physical', name: this.t('app-program-delivery-physical') },
        { value: 'app-program-delivery-e-mentoring', name: this.t('app-program-delivery-e-mentoring') },
        { value: 'app-program-delivery-hybrid', name: this.t('app-program-delivery-hybrid') },
      ],
      optionsTypeOfMentoring: [
        { value: 'app-type-of-mentoring-1-to-1', name: this.t('app-type-of-mentoring-1-to-1') },
        { value: 'app-type-of-mentoring-group', name: this.t('app-type-of-mentoring-group') },
        { value: 'app-type-of-mentoring-team', name: this.t('app-type-of-mentoring-team') },
        { value: 'app-type-of-mentoring-e-mentoring', name: this.t('app-type-of-mentoring-e-mentoring') },
        { value: 'app-type-of-mentoring-peer', name: this.t('app-type-of-mentoring-peer') },
        { value: 'app-type-of-mentoring-school', name: this.t('app-type-of-mentoring-school') },
        { value: 'other', name: this.t('app-other') },
      ],
      optionsHowAreMeetingsScheduled: [
        { value: 'app-set-by-participants', name: this.t('app-set-by-participants') },
        { value: 'app-set-by-admin', name: this.t('app-set-by-admin') },
        { value: 'other', name: this.t('app-other') },
      ],
      optionsMentoringRelationshipCommitmentMonths: [
        { value: 'app-months-1-2', name: this.t('app-months-1-2') },
        { value: 'app-months-3', name: this.t('app-months-3') },
        { value: 'app-months-4', name: this.t('app-months-4') },
        { value: 'app-months-5', name: this.t('app-months-5') },
        { value: 'app-months-6', name: this.t('app-months-6') },
        { value: 'app-months-7', name: this.t('app-months-7') },
        { value: 'app-months-8', name: this.t('app-months-8') },
        { value: 'app-months-9', name: this.t('app-months-9') },
        { value: 'app-months-10', name: this.t('app-months-10') },
        { value: 'app-months-11', name: this.t('app-months-11') },
        { value: 'app-months-12-or-longer', name: this.t('app-months-12-or-longer') },
        { value: 'app-months-no-minimum', name: this.t('app-months-no-minimum') },
        { value: 'app-months-no-requirement', name: this.t('app-months-no-requirement') },
        { value: 'other', name: this.t('app-other') },
      ],
      optionsMentoringRelationshipCommitmentFrequency: [
        { value: 'app-frequency-weekly', name: this.t('app-frequency-weekly') },
        { value: 'app-frequency-bi-weekly', name: this.t('app-frequency-bi-weekly') },
        { value: 'app-frequency-monthly', name: this.t('app-frequency-monthly') },
        { value: 'app-frequency-no-requirement', name: this.t('app-frequency-no-requirement') },
        { value: 'other', name: this.t('app-other') },
      ],
      optionsMentoringRelationshipCommitmentHoursPerWeek: [
        { value: 'app-hours-per-week-1', name: this.t('app-hours-per-week-1') },
        { value: 'app-hours-per-week-2-3', name: this.t('app-hours-per-week-2-3') },
        { value: 'app-hours-per-week-3-4', name: this.t('app-hours-per-week-3-4') },
        { value: 'app-hours-per-week-4-5', name: this.t('app-hours-per-week-4-5') },
        { value: 'app-hours-per-week-5-or-more', name: this.t('app-hours-per-week-5-or-more') },
        { value: 'app-hours-per-week-no-requirement', name: this.t('app-hours-per-week-no-requirement') },
        { value: 'other', name: this.t('app-other') },
      ],
      mentorCityEnabled: false,
    };
  },

  computed: {
    optionsFocusArea() {
      if (this.countryCode == 'ca') {
        return [
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
          { value: 'other', name: this.t('app-other') },
        ];
      }
      return [
        { value: 'app-us-program-focus-academics', name: this.t('app-us-program-focus-academics') },
        { value: 'app-us-program-focus-arts', name: this.t('app-us-program-focus-arts') },
        { value: 'app-us-program-focus-job-skills', name: this.t('app-us-program-focus-job-skills') },
        { value: 'app-us-program-focus-job-sports', name: this.t('app-us-program-focus-job-sports') },
        { value: 'app-us-program-focus-job-stem', name: this.t('app-us-program-focus-job-stem') },
        { value: 'other', name: this.t('app-other') },
      ];
    },
    optionsPrimaryMeetingLocation() {
      if (this.countryCode == 'ca') {
        return [
          { value: 'app-ca-program-meeting-program-agency-site', name: this.t('app-ca-program-meeting-program-agency-site') },
          { value: 'app-ca-program-meeting-community', name: this.t('app-ca-program-meeting-community') },
          { value: 'app-ca-program-meeting-faith-based-site', name: this.t('app-ca-program-meeting-faith-based-site') },
          { value: 'app-ca-program-meeting-youth-custody-correctional-facility', name: this.t('app-ca-program-meeting-youth-custody-correctional-facility') },
          { value: 'app-ca-program-meeting-mental-health-treatment-facility', name: this.t('app-ca-program-meeting-mental-health-treatment-facility') },
          { value: 'app-ca-program-meeting-school-academic-site', name: this.t('app-ca-program-meeting-school-academic-site') },
          { value: 'app-ca-program-meeting-workplace', name: this.t('app-ca-program-meeting-workplace') },
          { value: 'app-ca-program-meeting-after-school-site', name: this.t('app-ca-program-meeting-after-school-site') },
          { value: 'app-ca-program-meeting-online-virtual', name: this.t('app-ca-program-meeting-online-virtual') },
          { value: 'other', name: this.t('app-other') },
        ];
      }
      return [
        { value: 'app-us-program-meeting-agency', name: this.t('app-us-program-meeting-agency') },
        { value: 'app-us-program-meeting-community', name: this.t('app-us-program-meeting-community') },
        { value: 'app-us-program-meeting-faith', name: this.t('app-us-program-meeting-faith') },
        { value: 'app-us-program-meeting-juvenile', name: this.t('app-us-program-meeting-juvenile') },
        { value: 'app-us-program-meeting-mental', name: this.t('app-us-program-meeting-mental') },
        { value: 'app-us-program-meeting-school', name: this.t('app-us-program-meeting-school') },
        { value: 'app-us-program-meeting-workplace', name: this.t('app-us-program-meeting-workplace') },
        { value: 'app-us-program-meeting-after-school', name: this.t('app-us-program-focus-meeting-school') },
        { value: 'app-us-program-meeting-online', name: this.t('app-us-program-meeting-online') },
        { value: 'other', name: this.t('app-other') },
      ];
    },
    optionsProgramOperatedThrough() {
      if (this.countryCode == 'ca') {
        return [
          { value: 'app-ca-program-operated-business', name: this.t('app-ca-program-operated-business') },
          { value: 'app-ca-program-operated-community-based organization', name: this.t('app-ca-program-operated-community-based organization') },
          { value: 'app-ca-program-operated-foundation-or-philanthropic-organization', name: this.t('app-ca-program-operated-foundation-or-philanthropic-organization') },
          { value: 'app-ca-program-operated-employment-agency', name: this.t('app-ca-program-operated-employment-agency') },
          { value: 'app-ca-program-operated-faith-based-organization', name: this.t('app-ca-program-operated-faith-based-organization') },
          { value: 'app-ca-program-operated-government-agency', name: this.t('app-ca-program-operated-government-agency') },
          { value: 'app-ca-program-operated-higher-education-post-secondary-institution', name: this.t('app-ca-program-operated-higher-education-post-secondary-institution') },
          { value: 'app-ca-program-operated-resident-treatment-facility', name: this.t('app-ca-program-operated-resident-treatment-facility') },
          { value: 'app-ca-program-operated-correctional-facility', name: this.t('app-ca-program-operated-correctional-facility') },
          { value: 'app-ca-program-operated-school', name: this.t('app-ca-program-operated-school') },
          { value: 'other', name: this.t('app-other') },
        ];
      }
      return [
        { value: 'app-us-program-operated-business', name: this.t('app-us-program-operated-business') },
        { value: 'app-us-program-operated-community', name: this.t('app-us-program-operated-community') },
        { value: 'app-us-program-operated-faith', name: this.t('app-us-program-operated-faith') },
        { value: 'app-us-program-operated-government', name: this.t('app-us-program-operated-government') },
        { value: 'app-us-program-operated-higher-education', name: this.t('app-us-program-operated-higher-education') },
        { value: 'app-us-program-operated-resident', name: this.t('app-us-program-operated-resident') },
        { value: 'app-us-program-operated-school', name: this.t('app-us-program-operated-school') },
        { value: 'other', name: this.t('app-other') },
      ];
    },
    optionsGendersProgramServes() {
      if (this.countryCode == 'ca') {
        return [
          { value: 'app-ca-male', name: this.t('app-ca-male') },
          { value: 'app-ca-female', name: this.t('app-ca-female') },
          { value: 'app-ca-genderqueer', name: this.t('app-ca-genderqueer') },
          { value: 'app-ca-non-binary', name: this.t('app-ca-non-binary') },
          { value: 'app-ca-two-spirit', name: this.t('app-ca-two-spirit') },
          { value: 'app-ca-transgender', name: this.t('app-ca-transgender') },
          { value: 'other', name: this.t('app-other') },
        ];
      }
      return [
        { value: 'app-us-male', name: this.t('app-us-male') },
        { value: 'app-us-female', name: this.t('app-us-female') },
        { value: 'app-us-genderqueer', name: this.t('app-us-genderqueer') },
        { value: 'app-us-non-binary', name: this.t('app-us-non-binary') },
        { value: 'app-us-two-spirit', name: this.t('app-us-two-spirit') },
        { value: 'other', name: this.t('app-additional') },
      ];
    },
    optionsAgesProgramServes() {
      if (this.countryCode == 'ca') {
        return [
          { value: 'app-ca-7-and-under', name: this.t('app-ca-7-and-under') },
          { value: 'app-ca-8-11', name: this.t('app-ca-8-11') },
          { value: 'app-ca-12-14', name: this.t('app-ca-12-14') },
          { value: 'app-ca-15-17', name: this.t('app-ca-15-17') },
          { value: 'app-ca-18-24', name: this.t('app-ca-18-24') },
          { value: 'app-ca-25-and-over', name: this.t('app-ca-25-and-over') },
          { value: 'other', name: this.t('app-other') },
        ];
      }
      return [
        { value: 'app-us-7-and-under', name: this.t('app-us-7-and-under') },
        { value: 'app-us-8-10', name: this.t('app-us-8-10') },
        { value: 'app-us-11-14', name: this.t('app-us-11-14') },
        { value: 'app-us-15-18', name: this.t('app-us-15-18') },
        { value: 'app-us-19-24', name: this.t('app-us-19-24') },
        { value: 'other', name: this.t('app-other') },
      ];
    },
    optionsFamilyStructuresProgramServes() {
      if (this.countryCode == 'ca') {
        return [
          { value: 'app-ca-foster-care', name: this.t('app-ca-foster-care') },
          { value: 'app-ca-group-home', name: this.t('app-ca-group-home') },
          { value: 'app-ca-guardian', name: this.t('app-ca-guardian') },
          { value: 'app-ca-kinship-care', name: this.t('app-ca-kinship-care') },
          { value: 'app-ca-single-parent-family', name: this.t('app-ca-single-parent-family') },
          { value: 'app-ca-two-parent-family', name: this.t('app-ca-two-parent-family') },
          { value: 'app-ca-blended-family', name: this.t('app-ca-blended-family') },
          { value: 'other', name: this.t('app-other') },
        ];
      }
      return [
        { value: 'app-us-foster-care', name: this.t('app-us-foster-care') },
        { value: 'app-us-group-home', name: this.t('app-us-group-home') },
        { value: 'app-us-guardian', name: this.t('app-us-guardian') },
        { value: 'app-us-kinship-care', name: this.t('app-us-kinship-care') },
        { value: 'app-us-single-parent-family', name: this.t('app-us-single-parent-family') },
        { value: 'app-us-two-parent-family', name: this.t('app-us-two-parent-family') },
        { value: 'other', name: this.t('app-other') },
      ];
    },
    optionsYouthProgramServes() {
      if (this.countryCode == 'ca') {
        return [
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
          { value: 'other', name: this.t('app-other') },
        ];
      }
      return [
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
        { value: 'other', name: this.t('app-other') },
      ];
    },
    optionsTargetMentorPopulationGenders() {
      if (this.countryCode == 'ca') {
        return [
          { value: 'app-ca-male', name: this.t('app-ca-male') },
          { value: 'app-ca-female', name: this.t('app-ca-female') },
          { value: 'app-ca-genderqueer', name: this.t('app-ca-genderqueer') },
          { value: 'app-ca-non-binary', name: this.t('app-ca-non-binary') },
          { value: 'app-ca-two-spirit', name: this.t('app-ca-two-spirit') },
          { value: 'app-ca-transgender', name: this.t('app-ca-transgender') },
          { value: 'other', name: this.t('app-other') },
        ];
      }
      return [
        { value: 'app-us-male', name: this.t('app-us-male') },
        { value: 'app-us-female', name: this.t('app-us-female') },
        { value: 'app-us-genderqueer', name: this.t('app-us-genderqueer') },
        { value: 'app-us-non-binary', name: this.t('app-us-non-binary') },
        { value: 'app-us-two-spirit', name: this.t('app-us-two-spirit') },
        { value: 'other', name: this.t('app-additional') },
      ];
    },
    optionsTargetMentorPopulationAges() {
      if (this.countryCode == 'ca') {
        return [
          { value: 'app-ca-age-under-18', name: this.t('app-ca-age-under-18') },
          { value: 'app-ca-age-18-24', name: this.t('app-ca-age-18-24') },
          { value: 'app-ca-age-25-34', name: this.t('app-ca-age-25-34') },
          { value: 'app-ca-age-35-49', name: this.t('app-ca-age-35-49') },
          { value: 'app-ca-age-50-65', name: this.t('app-ca-age-50-65') },
          { value: 'app-ca-age-over-65', name: this.t('app-ca-age-over-65') },
          { value: 'other', name: this.t('app-other') },
        ];
      }
      return [
        { value: 'app-us-age-under-18', name: this.t('app-us-age-under-18') },
        { value: 'app-us-age-18-24', name: this.t('app-us-age-18-24') },
        { value: 'app-us-age-25-34', name: this.t('app-us-age-25-34') },
        { value: 'app-us-age-35-49', name: this.t('app-us-age-35-49') },
        { value: 'app-us-age-50-65', name: this.t('app-us-age-50-65') },
        { value: 'app-us-age-over-65', name: this.t('app-us-age-over-65') },
        { value: 'other', name: this.t('app-other') },
      ];
    },
  },

  async mounted() {
    this.step = this.$route.params.step;
    if (this.step) {
      if (this.step != '1') {
        await this.router.push(this.link('programs/add/step/1'));
      }
    }

    if (this.app.view.isAdminPage) {
      this.parentUrl = this.link('admin/programs');
    }

    this.app.showLoading();

    if (this.isAdminPage) {
      this.title = this.t('app-add-program');
    } else {
      this.title = this.t('app-submit-program');
    }

    if (this.$route.params.id) {
      this.program.document.id = this.$route.params.id;
      await this.program.load();
      this.title = this.t('app-edit-program');
      this.query = this.program.placeTitle;
      if (this.app.bootstrap.country == 'ca') {
        const organizationId = this.program.attributes.organization;
        if (organizationId) {
          const organization = new Organization();
          organization.document.id = organizationId;
          await organization.load();
          this.program.hasOrgWithBBBSCEnabled = organization.attributes.bbbsc_enabled;
          if (this.program.attributes.standing == 'app-allowed') {
            this.mentorCityEnabled = organization.attributes.mentor_city_enabled;
          }
        }
      }
    }

    this.ready();

    Vue.nextTick(() => {
      const organizationDetailPage = new Vue(OrganizationDetailPage);
      organizationDetailPage.programMode = true;
      const organizationMountEl = this.$el.querySelector('#organization-mount');
      organizationDetailPage.$mount(organizationMountEl);
      organizationDetailPage.render();

      this.onTitleInput();
      this.onDescriptionInput('program-description');
      this.onDescriptionInput('mentor-description');
    });
  },

  methods: {
    getRequiredTitle() {
      const en = this.program.localizedAttributes.en.field_display_title;
      if (globals.app.languages.list.length == 1) {
        return en;
      }
      const secondaryLangcode = this.app.languages.getSecondaryLangcode();
      const fr = this.program.localizedAttributes[secondaryLangcode].field_display_title;
      if (en == '' && fr != '') {
        return fr;
      }
      return en;
    },

    async submit() {
      const fileEl: HTMLInputElement = document.querySelector('#program-logo-file');
      const file = fileEl?.files[0];
      if (file) {
        this.program.file = file;
      }

      this.app.showLoading();
      this.program.localizedAttributes.en.field_display_title = this.getRequiredTitle();
      await this.program.save();
      if (this.app.view.isAdminPage) {
        this.router.push(this.parentUrl);
      } else {
        const title = this.program.localizedAttributes.en.field_display_title;
        const email = this.program.attributes.contactEmail;
        const organizationId = this.program.attributes.organization;
        let redirect = `programs/submitted?title=${title}&email=${email}`;
        if (organizationId) {
          redirect += `&organization=${organizationId}`;
        }
        this.router.push(this.link(redirect));
      }
    },

    handleLocationSelect(place: any) {
      this.country = place.getCountry();
    },

    addLocation() {
      this.program.attributes.locations.push(new GooglePlace());
    },

    removeLocation(pos: number) {
      this.program.attributes.locations.splice(pos, 1);
    },

    onApprovalClick() {
      this.router.push(this.link(`admin/programs/approval/${this.program.document.id}`));
    },

    onAdministratorsClick() {
      this.router.push(this.link(`admin/programs/administrators/${this.program.document.id}`));
    },

    onAddNewOrganizationClick() {
      this.router.push(this.link('programs/add/organization'));
    },

    onProgramTransitionAfterEnter() {
      this.onTransitionAfterEnter();
      this.onTitleInput();
      this.onDescriptionInput('program-description');
      this.onDescriptionInput('mentor-description');
    },

    onProgramTransitionBeforeEnter() {
      this.onTransitionBeforeEnter();
    },

    onTransitionBeforeEnter() {
      document.querySelector('body').classList.add('transition');
    },
    onTransitionAfterEnter() {
      document.querySelector('body').classList.remove('transition');
    },

    isOrganizationRequired() {
      // if(this.app.view.isAdminPage && !this.app.user.account.data.attributes.field_global_administrator) {
      //   return true
      // }
      return false;
    },

  },
};
