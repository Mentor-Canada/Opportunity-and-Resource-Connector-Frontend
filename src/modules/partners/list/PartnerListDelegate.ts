import ListDelegateBase from "../../../pages/ListDelegateBase"
import ListDelegateInterface from "../../../pages/ListDelegateInterface"
import CollectionRequestUrlBuilder from "../../../pages/CollectionRequestUrlBuilder"
import globals from "../../../globals"

export default class PartnerListDelegate extends ListDelegateBase implements ListDelegateInterface {

  baseUrl: string = "admin/partners";
  csvUrl: string = "partners";
  url: string = "node/partner";
  canAdd: boolean = true

  constructor() {
    super()
    this.sort = [{ name: 'attributes.field_display_title', direction: 'asc', field: 'attributes.field_display_title', sortField: 'attributes.field_display_title' }]
    this.fields = [
      { title: this.t('app-name'), name: 'attributes.field_display_title', sortField: 'attributes.field_display_title'},
      { title: this.t('app-partner-id'), name: 'attributes.field_id', sortField: 'attributes.field_id'},
      { title: this.t('app-created'), name: 'attributes.created', sortField: 'attributes.created' }
    ]
    this.tableClasses.push('clickable-rows')
  }

  transform(response: any) {
  }

  urlBuilder(): CollectionRequestUrlBuilder {
    const builder = new CollectionRequestUrlBuilder()
    if(this.search) {
      builder.params['filter[title][condition][path]'] = 'field_display_title'
      builder.params['filter[title][condition][value]'] = this.search
      builder.params['filter[title][condition][operator]'] = 'CONTAINS'
    }
    return builder
  }

}