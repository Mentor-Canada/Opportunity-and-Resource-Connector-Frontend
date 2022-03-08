import Url from "url-parse"

export default class HandlerAdapter {

  firstName
  lastName
  email
  zipCode
  distance
  youth
  age
  type
  fwID2
  delivery

  private url

  constructor() {
    const urlString = (window as any).location.href
    this.url = new Url(urlString, true)

    this.firstName = this.url.query['firstName']
    this.lastName = this.url.query['lastName']
    this.email = this.url.query['email']
    this.zipCode = this.url.query['zipCode']
    if(!this.zipCode && this.url.query['zip']) {
      this.zipCode = this.url.query['zip']
    }
    this.fwID2 = this.url.query['fwID2']
    this.distance = this.url.query['distance']
    if(!this.distance) {
      this.distance = 30
    }

    this.youth = this._youth()
    this.age = this._age()
    this.type = this._type()

    const community = this.url.query["community"]
    const siteBased = this.url.query["siteBased"]
    const eMentoring = this.url.query["eMentoring"]
    this.delivery = []
    if(community) {
      this.delivery.push("community")
    }
    if(siteBased) {
      this.delivery.push("siteBased")
    }
    if(eMentoring) {
      this.delivery.push("eMentoring")
    }
    if(!this.delivery.length) {
      this.delivery.push("community")
      this.delivery.push("siteBased")
      this.delivery.push("eMentoring")
    }
  }

  private _youth() {
    const options = []
    options['0'] = 'all'
    options['1'] = 'app-us-general-youth-population'
    options['2'] = 'app-us-academically-at-risk'
    options['3'] = 'app-us-adjudicated-court-involved'
    options['4'] = 'app-us-college-post-secondary-student'
    options['5'] = 'app-us-first-generation-college'
    options['6'] = 'app-us-foster-residential-or-kinship-care'
    options['7'] = 'app-us-gang-at-risk'
    options['8'] = 'app-us-gang-involved'
    options['9'] = 'app-us-gifted-talented-academic-achiever'
    options['10'] = 'app-us-homeless-runaway'
    options['11'] = 'app-us-incarcerated-parent'
    options['12'] = 'app-us-lgbtq-youth'
    options['13'] = 'app-us-low-income'
    options['14'] = 'app-us-mental-health-issues'
    options['15'] = 'app-us-parent-involved-in-military'
    options['16'] = 'app-us-physical-disabilities-special-care-needs'
    options['17'] = 'app-us-pregnant-parenting'
    options['18'] = 'app-us-recent-immigrant-refugee'
    options['19'] = 'app-us-school-drop-out'
    options['20'] = 'app-us-single-parent-household'
    options['21'] = 'app-us-special-education'
    options['22'] = 'app-us-youth-with-disabilities'
    options['23'] = 'other'
    return options[this.url.query['youth']]
  }

  private _age() {
    const options = []
    options['0'] = 'all'
    options['1'] = 'app-us-7-and-under'
    options['2'] = 'app-us-8-10'
    options['3'] = 'app-us-11-14'
    options['4'] = 'app-us-15-18'
    options['5'] = 'other'
    return options[this.url.query['ages']]
  }

  private _type() {
    const options = []
    options['0'] = 'all'
    options['1'] = 'app-type-of-mentoring-1-to-1'
    options['2'] = 'app-type-of-mentoring-group'
    options['3'] = 'app-type-of-mentoring-team'
    options['4'] = 'app-type-of-mentoring-e-mentoring'
    options['5'] = 'app-type-of-mentoring-peer'
    return options[this.url.query['type']]
  }

}
