import CollectionRequestUrlBuilder from '../../../pages/CollectionRequestUrlBuilder';

export default class SearchListUrlBuilder extends CollectionRequestUrlBuilder {
  partner(value: string): SearchListUrlBuilder {
    if (value) {
      this.params['filter[field_partner_entity.id]'] = value;
    }
    return this;
  }
}
