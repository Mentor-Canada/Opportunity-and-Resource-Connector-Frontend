import ListDelegateBase from '../../../pages/ListDelegateBase';
import ListDelegateInterface from '../../../pages/ListDelegateInterface';
import CollectionRequestUrlBuilder from '../../../pages/CollectionRequestUrlBuilder';

export default class ApplicationListDelegate extends ListDelegateBase implements ListDelegateInterface {
  baseUrl: string = 'admin/applications';

  csvUrl: string = 'app/inquiry/csv';

  url: string = 'app/inquiry';

  programFilter: string;

  roleFilter: string;

  statusFilter: string;

  leadFilter: string;

  leadFilterOther: string;

  firstNameFilter: string;

  lastNameFilter: string;

  emailFilter: string;

  phoneFilter: string;

  voiceFilter: string;

  smsFilter: string;

  constructor() {
    super();
    this.sort = [{
      name: 'attributes.created', direction: 'desc', field: 'attributes.created', sortField: 'attributes.created',
    }];
    this.fields = [
      { title: this.t('app-program'), name: 'attributes.title', sortField: 'attributes.title' },
      { title: this.t('app-first-name'), name: 'attributes.firstName', sortField: 'attributes.firstName' },
      { title: this.t('app-last-name'), name: 'attributes.lastName', sortField: 'attributes.lastName' },
      { title: this.t('app-role'), name: 'attributes.role', sortField: 'attributes.role' },
      { title: this.t('app-status'), name: 'attributes.status', sortField: 'attributes.status' },
      { title: this.t('app-created'), name: 'attributes.created', sortField: 'attributes.created' },
    ];
    this.tableClasses.push('clickable-rows');
  }

  transform(response: any) {
    for (const row of response.data) {
      const { role } = row.attributes;
      if (role != null) {
        row.attributes.role = role.charAt(0).toUpperCase() + role.slice(1);
      }
      if (row.attributes.status) {
        row.attributes.status = this.t(row.attributes.status);
      } else {
        row.attributes.status = this.t('app-un-contacted');
      }
    }
    return response;
  }

  urlBuilder(): CollectionRequestUrlBuilder {
    const builder = new CollectionRequestUrlBuilder();
    for (const field in this.filter) {
      if (['startDate', 'endDate', 'dateMode'].includes(field)) {
        continue;
      }
      const value = this.filter[field];
      builder.addFilter(field, value);
    }
    return builder;
  }
}
