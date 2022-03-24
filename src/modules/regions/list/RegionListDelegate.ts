import ListDelegateBase from '../../../pages/ListDelegateBase';
import ListDelegateInterface from '../../../pages/ListDelegateInterface';
import CollectionRequestUrlBuilder from '../../../pages/CollectionRequestUrlBuilder';
import AccountListUrlBuilder from '../../account/list/AccountListUrlBuilder';

export default class RegionListDelegate extends ListDelegateBase implements ListDelegateInterface {
  baseUrl: string = 'admin/regions';

  csvUrl: string = null;

  url: string = 'app/affiliates';

  canAdd: boolean = true;

  trail = [
    { title: 'app-mentor-connector', url: '' },
    { title: 'app-dashboard', url: 'admin' },
    { title: 'app-regions', url: null },
  ];

  constructor() {
    super();
    this.fields = [
      { title: this.t('app-title'), name: 'attributes.title', sortField: 'attributes.title' },
      { title: this.t('app-created'), name: 'attributes.created', sortField: 'attributes.created' },
    ];
    this.sort = [
      {
        name: 'attributes.created', direction: 'desc', field: 'attributes.created', sortField: 'attributes.created',
      },
    ];
    this.tableClasses.push('clickable-rows');
  }

  transform(response: any) {
  }

  urlBuilder(): CollectionRequestUrlBuilder {
    const builder = new CollectionRequestUrlBuilder();
    if (this.search) {
      builder.filter('title', this.search);
    }
    return builder;
  }
}
