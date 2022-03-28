import AccountListUrlBuilder from './AccountListUrlBuilder';
import globals from '../../../globals';
import ListDelegateBase from '../../../pages/ListDelegateBase';
import ListDelegateInterface from '../../../pages/ListDelegateInterface';
import CollectionRequestUrlBuilder from '../../../pages/CollectionRequestUrlBuilder';

export default class AccountListDelegate extends ListDelegateBase implements ListDelegateInterface {
  baseUrl: string = 'admin/accounts';

  csvUrl: string = 'app/accounts/csv';

  url: string = 'app/accounts';

  search: string = '';

  accountType: string = '';

  mentorCity: string = '';

  canAdd: boolean = true;

  firstName: string = '';

  lastName: string = '';

  constructor() {
    super();
    this.sort = [{
      name: 'attributes.mail', direction: 'asc', field: 'attributes.mail', sortField: 'attributes.mail',
    }];
    this.fields = [
      { title: this.t('app-email'), name: 'attributes.mail', sortField: 'attributes.mail' },
      { title: this.t('app-first-name'), name: 'attributes.firstName', sortField: 'attributes.firstName' },
      { title: this.t('app-last-name'), name: 'attributes.lastName', sortField: 'attributes.lastName' },
      { title: this.t('app-created'), name: 'attributes.created', sortField: 'attributes.created' },
    ];
    if (globals.app.user.admin) {
      this.canAdd = true;
    }
  }

  transform(response: any) {
    const index = response.data.findIndex((row) => row.attributes.display_name == 'Anonymous');
    if (index != -1) {
      response.data.splice(index, 1);
    }
  }

  urlBuilder(): CollectionRequestUrlBuilder {
    this.startDate = this.filter.start_date;
    this.endDate = this.filter.end_date;
    return new AccountListUrlBuilder()
      .search(this.search)
      .accountType(this.accountType)
      .mentorCity(this.mentorCity)
      .firstName(this.firstName)
      .lastName(this.lastName);
  }

  clearFilter() {
    this.filter = {};
    this.search = null;
    this.accountType = null;
    this.mentorCity = null;
    this.firstName = null;
    this.lastName = null;
  }
}
