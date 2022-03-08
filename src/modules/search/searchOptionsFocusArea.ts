import globals from "../../globals"

export default function searchOptionsFocusArea(countryCode = null) {
  if(countryCode == 'ca') {
    return [
      { value: "all", name: globals.app.t('app-all') },
      { value: 'app-ca-program-focus-academics-literacy', name: globals.app.t('app-ca-program-focus-academics-literacy') },
      { value: 'app-ca-program-focus-arts', name: globals.app.t('app-ca-program-focus-arts') },
      { value: 'app-ca-program-focus-job-skills-career-readiness', name: globals.app.t('app-ca-program-focus-job-skills-career-readiness') },
      { value: 'app-ca-program-focus-sports-activities', name: globals.app.t('app-ca-program-focus-sports-activities') },
      { value: 'app-ca-program-focus-stem', name: globals.app.t('app-ca-program-focus-stem') },
      { value: 'app-ca-program-focus-social-emotional-skills', name: globals.app.t('app-ca-program-focus-social-emotional-skills') },
      { value: 'app-ca-program-focus-community-connections-building-social-capital', name: globals.app.t('app-ca-program-focus-community-connections-building-social-capital') },
      { value: 'app-ca-program-focus-health-and-well-being', name: globals.app.t('app-ca-program-focus-health-and-well-being') },
      { value: 'app-ca-program-focus-faith', name: globals.app.t('app-ca-program-focus-faith') },
      { value: 'app-ca-program-focus-culture', name: globals.app.t('app-ca-program-focus-culture') },
      { value: 'other', name: globals.app.t('app-other') }
    ]
  }
  return [
    { value: "all", name: globals.app.t('app-all') },
    { value: 'app-us-program-focus-academics', name: globals.app.t('app-us-program-focus-academics') },
    { value: 'app-us-program-focus-arts', name: globals.app.t('app-us-program-focus-arts') },
    { value: 'app-us-program-focus-job-skills', name: globals.app.t('app-us-program-focus-job-skills') },
    { value: 'app-us-program-focus-job-sports', name: globals.app.t('app-us-program-focus-job-sports') },
    { value: 'app-us-program-focus-job-stem', name: globals.app.t('app-us-program-focus-job-stem') },
    { value: 'other', name: globals.app.t('app-other') }
  ]
}