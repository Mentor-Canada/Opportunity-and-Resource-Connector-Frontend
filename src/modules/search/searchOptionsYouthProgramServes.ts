import globals from "../../globals"

export default function searchOptionsYouthProgramServes(countryCode = null) {
  if(countryCode == 'ca') {
    return [
      { value: "all", name: globals.app.t('app-all') },
      { value: 'app-ca-academically-at-risk', name: globals.app.t('app-ca-academically-at-risk') },
      { value: 'app-ca-college-post-secondary-student', name: globals.app.t('app-ca-college-post-secondary-student') },
      { value: 'app-ca-foster-residential-or-kinship-care', name: globals.app.t('app-ca-foster-residential-or-kinship-care') },
      { value: 'app-ca-gang-involved-or-gang-at-risk', name: globals.app.t('app-ca-gang-involved-or-gang-at-risk') },
      { value: 'app-ca-gifted-talented-academic-achiever', name: globals.app.t('app-ca-gifted-talented-academic-achiever') },
      { value: 'app-ca-incarcerated-parent', name: globals.app.t('app-ca-incarcerated-parent') },
      { value: 'app-ca-low-income', name: globals.app.t('app-ca-low-income') },
      { value: 'app-ca-neet-opportunity-youth', name: globals.app.t('app-ca-neet-opportunity-youth') },
      { value: 'app-ca-physical-disabilities-special-care-needs', name: globals.app.t('app-ca-physical-disabilities-special-care-needs') },
      { value: 'app-ca-recent-immigrant-refugee', name: globals.app.t('app-ca-recent-immigrant-refugee') },
      { value: 'app-ca-single-parent-household', name: globals.app.t('app-ca-single-parent-household') },
      { value: 'app-ca-adjudicated-court-involved', name: globals.app.t('app-ca-adjudicated-court-involved') },
      { value: 'app-ca-emancipated', name: globals.app.t('app-ca-emancipated') },
      { value: 'app-ca-general-youth-population', name: globals.app.t('app-ca-general-youth-population') },
      { value: 'app-ca-homeless-living-in-a-shelter', name: globals.app.t('app-ca-homeless-living-in-a-shelter') },
      { value: 'app-ca-lgbtq-youth', name: globals.app.t('app-ca-lgbtq-youth') },
      { value: 'app-ca-mental-health-needs', name: globals.app.t('app-ca-mental-health-needs') },
      { value: 'app-ca-parent-involved-in-military', name: globals.app.t('app-ca-parent-involved-in-military') },
      { value: 'app-ca-pregnant-parenting', name: globals.app.t('app-ca-pregnant-parenting') },
      { value: 'app-ca-school-drop-out', name: globals.app.t('app-ca-school-drop-out') },
      { value: 'app-ca-special-education', name: globals.app.t('app-ca-special-education') },
      { value: 'other', name: globals.app.t('app-other') }
    ]
  }
  return [
    { value: "all", name: globals.app.t('app-all') },
    { value: 'app-us-academically-at-risk', name: globals.app.t('app-us-academically-at-risk') },
    { value: 'app-us-college-post-secondary-student', name: globals.app.t('app-us-college-post-secondary-student') },
    { value: 'app-us-foster-residential-or-kinship-care', name: globals.app.t('app-us-foster-residential-or-kinship-care') },
    { value: 'app-us-gang-involved', name: globals.app.t('app-us-gang-involved') },
    { value: 'app-us-gifted-talented-academic-achiever', name: globals.app.t('app-us-gifted-talented-academic-achiever') },
    { value: 'app-us-incarcerated-parent', name: globals.app.t('app-us-incarcerated-parent') },
    { value: 'app-us-low-income', name: globals.app.t('app-us-low-income') },
    { value: 'app-us-opportunity-youth', name: globals.app.t('app-us-opportunity-youth') },
    { value: 'app-us-physical-disabilities-special-care-needs', name: globals.app.t('app-us-physical-disabilities-special-care-needs') },
    { value: 'app-us-recent-immigrant-refugee', name: globals.app.t('app-us-recent-immigrant-refugee') },
    { value: 'app-us-single-parent-household', name: globals.app.t('app-us-single-parent-household') },
    { value: 'app-us-youth-with-disabilities', name: globals.app.t('app-us-youth-with-disabilities') },
    { value: 'app-us-adjudicated-court-involved', name: globals.app.t('app-us-adjudicated-court-involved') },
    { value: 'app-us-first-generation-college', name: globals.app.t('app-us-first-generation-college') },
    { value: 'app-us-gang-at-risk', name: globals.app.t('app-us-gang-at-risk') },
    { value: 'app-us-general-youth-population', name: globals.app.t('app-us-general-youth-population') },
    { value: 'app-us-homeless-runaway', name: globals.app.t('app-us-homeless-runaway') },
    { value: 'app-us-lgbtq-youth', name: globals.app.t('app-us-lgbtq-youth') },
    { value: 'app-us-mental-health-issues', name: globals.app.t('app-us-mental-health-issues') },
    { value: 'app-us-parent-involved-in-military', name: globals.app.t('app-us-parent-involved-in-military') },
    { value: 'app-us-pregnant-parenting', name: globals.app.t('app-us-pregnant-parenting') },
    { value: 'app-us-school-drop-out', name: globals.app.t('app-us-school-drop-out') },
    { value: 'app-us-special-education', name: globals.app.t('app-us-special-education') },
    { value: 'other', name: globals.app.t('app-other') }
  ]
}