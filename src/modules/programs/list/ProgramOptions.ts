import OptionCollection from 'Models/OptionCollection';

export default class ProgramOptions {
  standing = new OptionCollection()
    .add('app-allowed')
    .add('app-pending')
    .add('app-suspended')
    .options;

  delivery = new OptionCollection()
    .add('communityBased', 'app-program-delivery-community-based')
    .add('siteBased', 'app-program-delivery-site-based')
    .add('eMentoring', 'app-program-delivery-e-mentoring')
    .options;

  focusArea = new OptionCollection()
    .add('app-ca-program-focus-academics-literacy')
    .add('app-ca-program-focus-arts')
    .add('app-ca-program-focus-job-skills-career-readiness')
    .add('app-ca-program-focus-sports-activities')
    .add('app-ca-program-focus-stem')
    .add('app-ca-program-focus-social-emotional-skills')
    .add('app-ca-program-focus-community-connections-building-social-capital')
    .add('app-ca-program-focus-health-and-well-being')
    .add('app-ca-program-focus-faith')
    .add('app-ca-program-focus-culture')
    .add('other', 'app-other')
    .options;

  meetingLocation = new OptionCollection()
    .add('app-ca-program-meeting-program-agency-site')
    .add('app-ca-program-meeting-community')
    .add('app-ca-program-meeting-faith-based-site')
    .add('app-ca-program-meeting-youth-custody-correctional-facility')
    .add('app-ca-program-meeting-mental-health-treatment-facility')
    .add('app-ca-program-meeting-school-academic-site')
    .add('app-ca-program-meeting-workplace')
    .add('app-ca-program-meeting-after-school-site')
    .add('app-ca-program-meeting-online-virtual')
    .add('other', 'app-other')
    .options;

  typesOfMentoring = new OptionCollection()
    .add('app-type-of-mentoring-1-to-1')
    .add('app-type-of-mentoring-group')
    .add('app-type-of-mentoring-team')
    .add('app-type-of-mentoring-e-mentoring')
    .add('app-type-of-mentoring-peer')
    .add('app-type-of-mentoring-school')
    .add('other', 'app-other')
    .options;

  operatedThrough = new OptionCollection()
    .add('app-ca-program-operated-business')
    .add('app-ca-program-operated-community-based organization')
    .add('app-ca-program-operated-foundation-or-philanthropic-organization')
    .add('app-ca-program-operated-employment-agency')
    .add('app-ca-program-operated-faith-based-organization')
    .add('app-ca-program-operated-government-agency')
    .add('app-ca-program-operated-higher-education-post-secondary-institution')
    .add('app-ca-program-operated-resident-treatment-facility')
    .add('app-ca-program-operated-correctional-facility')
    .add('app-ca-program-operated-school')
    .add('other', 'app-other')
    .options;

  scheduled = new OptionCollection()
    .add('app-set-by-participants')
    .add('app-set-by-admin')
    .add('other', 'app-other')
    .options;

  genders = new OptionCollection()
    .add('app-ca-male')
    .add('app-ca-female')
    .add('app-ca-genderqueer')
    .add('app-ca-non-binary')
    .add('app-ca-two-spirit')
    .add('app-ca-transgender')
    .add('other', 'app-additional')
    .options;

  ages = new OptionCollection()
    .add('app-ca-7-and-under')
    .add('app-ca-8-11')
    .add('app-ca-12-14')
    .add('app-ca-15-17')
    .add('app-ca-18-24')
    .add('app-ca-25-and-over')
    .add('other', 'app-other')
    .options;

  familyStructure = new OptionCollection()
    .add('app-ca-foster-care')
    .add('app-ca-group-home')
    .add('app-ca-guardian')
    .add('app-ca-kinship-care')
    .add('app-ca-single-parent-family')
    .add('app-ca-two-parent-family')
    .add('app-ca-blended-family')
    .add('other', 'app-other')
    .options;

  youth = new OptionCollection()
    .add('app-ca-academically-at-risk')
    .add('app-ca-college-post-secondary-student')
    .add('app-ca-foster-residential-or-kinship-care')
    .add('app-ca-gang-involved-or-gang-at-risk')
    .add('app-ca-gifted-talented-academic-achiever')
    .add('app-ca-incarcerated-parent')
    .add('app-ca-low-income')
    .add('app-ca-neet-opportunity-youth')
    .add('app-ca-physical-disabilities-special-care-needs')
    .add('app-ca-recent-immigrant-refugee')
    .add('app-ca-single-parent-household')
    .add('app-ca-adjudicated-court-involved')
    .add('app-ca-emancipated')
    .add('app-ca-general-youth-population')
    .add('app-ca-homeless-living-in-a-shelter')
    .add('app-ca-lgbtq-youth')
    .add('app-ca-mental-health-needs')
    .add('app-ca-parent-involved-in-military')
    .add('app-ca-pregnant-parenting')
    .add('app-ca-school-drop-out')
    .add('app-ca-special-education')
    .add('other', 'app-other')
    .options;

  mentorGenders = new OptionCollection()
    .add('app-ca-male')
    .add('app-ca-female')
    .add('app-ca-genderqueer')
    .add('app-ca-non-binary')
    .add('app-ca-two-spirit')
    .add('app-ca-transgender')
    .add('other', 'app-other')
    .options;

  mentorAges = new OptionCollection()
    .add('app-ca-age-under-18')
    .add('app-ca-age-18-24')
    .add('app-ca-age-25-34')
    .add('app-ca-age-35-49')
    .add('app-ca-age-50-65')
    .add('app-ca-age-over-65')
    .add('other', 'app-other')
    .options;

  yesOrNo = new OptionCollection()
    .add('app-yes')
    .add('app-no')
    .options;

  backgroundCheckType = new OptionCollection()
    .add('app-background-check-type-fingerprint')
    .add('app-background-check-type-name')
    .add('app-background-check-type-other')
    .add('app-background-check-type-peer')
    .options;

  backgroundCheckFingerprintType = new OptionCollection()
    .add('app-background-check-fingerprint-fbi')
    .add('app-background-check-fingerprint-state')
    .options;

  backgroundCheckNameType = new OptionCollection()
    .add('app-background-check-name-multi-state')
    .add('app-background-check-name-state')
    .add('app-background-check-name-local')
    .options;

  backgroundCheckOtherType = new OptionCollection()
    .add('app-background-check-other-abuse')
    .add('app-background-check-other-offender')
    .options;

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
    .options;

  frequency = new OptionCollection()
    .add('app-frequency-weekly')
    .add('app-frequency-bi-weekly')
    .add('app-frequency-monthly')
    .add('other', 'app-other')
    .options;

  duration = new OptionCollection()
    .add('app-less-than-1-hour')
    .add('app-1-2-hours')
    .add('app-2-3-hours')
    .add('app-3-4-hours')
    .add('app-5-or-more-hours')
    .options;

  constructor() {
    if (window.app.bootstrap.country == 'ca') {
      this.backgroundCheckType = new OptionCollection()
        .add('app-background-check-type-ca-child-and-family')
        .add('app-background-check-type-ca-vulnerable-sector-check')
        .options;
    }
  }
}
