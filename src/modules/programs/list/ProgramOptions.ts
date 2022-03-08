import OptionCollection from "Models/OptionCollection"

export default class ProgramOptions {

  standing = new OptionCollection()
    .add('app-allowed')
    .add('app-pending')
    .add('app-suspended')
    .options

  delivery = new OptionCollection()
    .add('communityBased', 'app-program-delivery-community-based')
    .add('siteBased', 'app-program-delivery-site-based')
    .add('eMentoring', 'app-program-delivery-e-mentoring')
    .options

  focusArea = new OptionCollection()
    .add('app-us-program-focus-academics')
    .add('app-us-program-focus-arts')
    .add('app-us-program-focus-job-skills')
    .add('app-us-program-focus-job-sports')
    .add('app-us-program-focus-job-stem')
    .add('other', 'app-other')
    .options

  meetingLocation = new OptionCollection()
    .add('app-us-program-meeting-agency')
    .add('app-us-program-meeting-community')
    .add('app-us-program-meeting-faith')
    .add('app-us-program-meeting-juvenile')
    .add('app-us-program-meeting-mental')
    .add('app-us-program-meeting-school')
    .add('app-us-program-meeting-workplace')
    .add('app-us-program-meeting-after-school')
    .add('app-us-program-meeting-online')
    .add('other', 'app-other')
    .options

  typesOfMentoring = new OptionCollection()
    .add('app-type-of-mentoring-1-to-1')
    .add('app-type-of-mentoring-group')
    .add('app-type-of-mentoring-team')
    .add('app-type-of-mentoring-e-mentoring')
    .add('app-type-of-mentoring-peer')
    .add('app-type-of-mentoring-school')
    .add('other', 'app-other')
    .options

  operatedThrough = new OptionCollection()
    .add('app-us-program-operated-business')
    .add('app-us-program-operated-community')
    .add('app-us-program-operated-faith')
    .add('app-us-program-operated-government')
    .add('app-us-program-operated-higher-education')
    .add('app-us-program-operated-resident')
    .add('app-us-program-operated-school')
    .add('other', 'app-other')
    .options

  scheduled = new OptionCollection()
    .add('app-set-by-participants')
    .add('app-set-by-admin')
    .add('other', 'app-other')
    .options

  genders = new OptionCollection()
    .add('app-us-male')
    .add('app-us-female')
    .add('app-us-genderqueer')
    .add('app-us-non-binary')
    .add('app-us-two-spirit')
    .add('other', 'app-additional')
    .options

  ages = new OptionCollection()
    .add('app-us-7-and-under')
    .add('app-us-8-10')
    .add('app-us-11-14')
    .add('app-us-15-18')
    .add('app-us-19-24')
    .add('other', 'app-other')
    .options

  familyStructure = new OptionCollection()
    .add('app-us-foster-care')
    .add('app-us-group-home')
    .add('app-us-guardian')
    .add('app-us-kinship-care')
    .add('app-us-single-parent-family')
    .add('app-us-two-parent-family')
    .add('other', 'app-other')
    .options

  youth = new OptionCollection()
    .add('app-us-academically-at-risk')
    .add('app-us-college-post-secondary-student')
    .add('app-us-foster-residential-or-kinship-care')
    .add('app-us-gang-involved')
    .add('app-us-gifted-talented-academic-achiever')
    .add('app-us-incarcerated-parent')
    .add('app-us-low-income')
    .add('app-us-opportunity-youth')
    .add('app-us-physical-disabilities-special-care-needs')
    .add('app-us-recent-immigrant-refugee')
    .add('app-us-single-parent-household')
    .add('app-us-youth-with-disabilities')
    .add('app-us-adjudicated-court-involved')
    .add('app-us-first-generation-college')
    .add('app-us-gang-at-risk')
    .add('app-us-general-youth-population')
    .add('app-us-homeless-runaway')
    .add('app-us-lgbtq-youth')
    .add('app-us-mental-health-issues')
    .add('app-us-parent-involved-in-military')
    .add('app-us-pregnant-parenting')
    .add('app-us-school-drop-out')
    .add('app-us-special-education')
    .add('other', 'app-other')
    .options

  mentorGenders = new OptionCollection()
    .add('app-us-male')
    .add('app-us-female')
    .add('app-us-genderqueer')
    .add('app-us-non-binary')
    .add('app-us-two-spirit')
    .add('other', 'app-additional')
    .options

  mentorAges = new OptionCollection()
    .add('app-us-age-under-18')
    .add('app-us-age-18-24')
    .add('app-us-age-25-34')
    .add('app-us-age-35-49')
    .add('app-us-age-50-65')
    .add('app-us-age-over-65')
    .add('other', 'app-other')
    .options

  yesOrNo = new OptionCollection()
    .add('app-yes')
    .add('app-no')
    .options

  backgroundCheckType = new OptionCollection()
    .add('app-background-check-type-fingerprint')
    .add('app-background-check-type-name')
    .add('app-background-check-type-other')
    .add('app-background-check-type-peer')
    .options

  backgroundCheckFingerprintType = new OptionCollection()
    .add('app-background-check-fingerprint-fbi')
    .add('app-background-check-fingerprint-state')
    .options

  backgroundCheckNameType = new OptionCollection()
    .add('app-background-check-name-multi-state')
    .add('app-background-check-name-state')
    .add('app-background-check-name-local')
    .options

  backgroundCheckOtherType = new OptionCollection()
    .add('app-background-check-other-abuse')
    .add('app-background-check-other-offender')
    .options

  month = new OptionCollection()
    .add('app-less-than-one-month')
    .add('app-1-month')
    .add('app-2-months')
    .add('app-3-months')
    .add('app-4-months')
    .add('app-5-months')
    .add('app-6-months')
    .add('app-7-months')
    .add('app-8-months')
    .add('app-9-months')
    .add('app-10-months')
    .add('app-11-months')
    .add('app-12-months-or-longer')
    .add('app-no-minimum-match-commitment')
    .options

  frequency = new OptionCollection()
    .add('app-frequency-weekly')
    .add('app-frequency-bi-weekly')
    .add('app-frequency-monthly')
    .add('other', 'app-other')
    .options

  duration = new OptionCollection()
    .add('app-less-than-1-hour')
    .add('app-1-2-hours')
    .add('app-2-3-hours')
    .add('app-3-4-hours')
    .add('app-5-or-more-hours')
    .options

  constructor() {
    if(window.app.bootstrap.country == 'ca') {
      this.backgroundCheckType = new OptionCollection()
        .add('app-background-check-type-ca-child-and-family')
        .add('app-background-check-type-ca-vulnerable-sector-check')
        .options
    }
  }

}