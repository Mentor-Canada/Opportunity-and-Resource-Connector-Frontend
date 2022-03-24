import ListDelegateBase from '../../../pages/ListDelegateBase';
import ListDelegateInterface from '../../../pages/ListDelegateInterface';
import CollectionRequestUrlBuilder from '../../../pages/CollectionRequestUrlBuilder';

export default class FeedbackListDelegate extends ListDelegateBase implements ListDelegateInterface {
  csvUrl: string = 'app/feedback/csv';

  url: string = 'app/feedback';

  baseUrl: string = 'admin/feedback';

  constructor() {
    super();
    this.fields = [
      { title: this.t('app-email'), name: 'attributes.field_email', sortField: 'attributes.field_email' },
      { title: this.t('app-url'), name: 'attributes.field_url', sortField: 'attributes.field_ul' },
      { title: this.t('app-message'), name: 'attributes.field_text', sortField: 'attributes.field_text' },
      { title: this.t('app-created'), name: 'attributes.created', sortField: 'attributes.created' },
    ];
    this.sort = [
      {
        name: 'attributes.created', direction: 'desc', field: 'attributes.created', sortField: 'attributes.created',
      },
    ];
  }

  urlBuilder(): CollectionRequestUrlBuilder {
    return new CollectionRequestUrlBuilder();
  }

  transform(response) {
  }
}
