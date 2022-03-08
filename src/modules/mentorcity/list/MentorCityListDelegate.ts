import ListDelegateBase from "../../../pages/ListDelegateBase"
import ListDelegateInterface from "../../../pages/ListDelegateInterface"
import MentorCityListUrlBuilder from "./MentorCityListUrlBuilder"

export default class MentorCityListDelegate extends ListDelegateBase implements ListDelegateInterface {

  csvUrl: string = "app/mentorcity/csv"
  url: string = "app/mentorcity"
  baseUrl: string = "admin/mentorcity"

  constructor() {
    super()
    this.sort = [{ name: 'attributes.created', direction: 'desc', field: 'attributes.created', sortField: 'attributes.created' }]
    this.fields = [
      { title: this.t('app-program-name'), name: 'name-slot' },
      { title: this.t('app-invitation-sent-to'), name: 'email-slot' },
      { title: this.t('app-invitation-sent-on'), name: 'attributes.created', sortField: 'attributes.created' },
    ]
  }

  transform(response: any) {
    return response
  }

  urlBuilder(): MentorCityListUrlBuilder {
    const builder = new MentorCityListUrlBuilder()
    for(const field in this.filter) {
      if(["startDate", "endDate", "dateMode"].includes(field)) {
        continue
      }
      const value = this.filter[field]
      builder.addFilter(field, value)
    }
    return builder
  }

}
