import globals from "../../globals"

export default function searchOptionsAgesProgramServes(countryCode = null) {
  if(countryCode == 'ca') {
    return [
      { value: "all", name: globals.app.t('app-all') },
      { value: 'app-ca-7-and-under', name: globals.app.t('app-ca-7-and-under') },
      { value: 'app-ca-8-11', name: globals.app.t('app-ca-8-11') },
      { value: 'app-ca-12-14', name: globals.app.t('app-ca-12-14') },
      { value: 'app-ca-15-17', name: globals.app.t('app-ca-15-17') },
      { value: 'app-ca-18-24', name: globals.app.t('app-ca-18-24') },
      { value: 'app-ca-25-and-over', name: globals.app.t('app-ca-25-and-over') },
      { value: 'other', name: globals.app.t('app-other') }
    ]
  }
  return [
    { value: "all", name: globals.app.t('app-all') },
    { value: 'app-us-7-and-under', name: globals.app.t('app-us-7-and-under') },
    { value: 'app-us-8-10', name: globals.app.t('app-us-8-10') },
    { value: 'app-us-11-14', name: globals.app.t('app-us-11-14') },
    { value: 'app-us-15-18', name: globals.app.t('app-us-15-18') },
    { value: 'app-us-19-24', name: globals.app.t('app-us-19-24') },
    { value: 'other', name: globals.app.t('app-other') }
  ]
}