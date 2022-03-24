import SearchListUrlBuilder from './SearchListUrlBuilder';
import ListDelegateBase from '../../../pages/ListDelegateBase';
import ListDelegateInterface from '../../../pages/ListDelegateInterface';

export default class SearchListDelegate extends ListDelegateBase implements ListDelegateInterface {
  csvUrl: string = 'app/search/csv';

  url: string = 'app/search';

  baseUrl: string = 'admin/searches';

  partnerEntityId: string = '';

  partnerFieldId: string = 'all';

  constructor() {
    super();
    this.fields = [
      { title: this.t('app-partner'), name: 'attributes.partnerTitle' },
      { title: this.t('app-role'), name: 'attributes.role', sortField: 'attributes.role' },
      { title: this.t('app-postal-zip-code'), name: 'attributes.zip', sortField: 'attributes.zip' },
      { title: this.t('app-email'), name: 'attributes.email', sortField: 'attributes.email' },
      { title: this.t('app-created'), name: 'attributes.created', sortField: 'attributes.created' },
    ];
    this.sort = [
      {
        name: 'attributes.created', direction: 'desc', field: 'attributes.created', sortField: 'attributes.created',
      },
    ];
  }

  urlBuilder(): SearchListUrlBuilder {
    return new SearchListUrlBuilder()
      .include('field_partner_entity')
      .partner(this.partnerEntityId);
  }

  transform(response) {
    for (const row of response.data) {
      row.attributes.role = this.t(row.attributes.role);
    }
  }
}
