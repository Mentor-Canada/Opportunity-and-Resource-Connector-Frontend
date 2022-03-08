import globals from "../../globals"

export default function searchOptionsTypeOfMentoring() {
  return [
    {value: 'all', name: globals.app.t('app-all')},
    {value: 'app-type-of-mentoring-1-to-1', name: globals.app.t('app-type-of-mentoring-1-to-1')},
    {value: 'app-type-of-mentoring-group', name: globals.app.t('app-type-of-mentoring-group')},
    {value: 'app-type-of-mentoring-team', name: globals.app.t('app-type-of-mentoring-team')},
    {value: 'app-type-of-mentoring-e-mentoring', name: globals.app.t('app-type-of-mentoring-e-mentoring')},
    {value: 'app-type-of-mentoring-peer', name: globals.app.t('app-type-of-mentoring-peer')},
    {value: 'app-type-of-mentoring-school', name: globals.app.t('app-type-of-mentoring-school')},
    {value: 'other', name: globals.app.t('app-other')}
  ]
}