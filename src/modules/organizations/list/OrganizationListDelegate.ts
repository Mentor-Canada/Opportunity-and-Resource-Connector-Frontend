import ListDelegateBase from '../../../pages/ListDelegateBase';
import ListDelegateInterface from '../../../pages/ListDelegateInterface';
import OrganizationListUrlBuilder from './OrganizationListUrlBuilder';
import globals from '../../../globals';
import OrganizationFields from './OrganizationFields';

export default class OrganizationListDelegate extends ListDelegateBase implements ListDelegateInterface {
  baseUrl: string = 'admin/organizations';

  csvUrl: string = 'app/organization/csv';

  url: string = 'app/organization';

  canAdd: boolean = false;

  filter: any = {};

  constructor() {
    super();
    this.sort = [{
      name: 'attributes.created', direction: 'desc', field: 'attributes.created', sortField: 'attributes.created',
    }];
    this.fields = [
      { title: this.t('app-name'), name: `attributes.${OrganizationFields.displayTitle}`, sortField: `attributes.${OrganizationFields.displayTitle}` },
      { title: this.t('app-contact'), name: 'email-slot' },
      { title: this.t('app-status'), name: 'standing', sortField: 'attributes.field_standing' },
      { title: this.t('app-created'), name: 'attributes.created', sortField: 'attributes.created' },
    ];
    if (globals.app.user.admin) {
      this.fields.push({ title: '', name: 'settings-slot' });
      this.canAdd = true;
    }
    this.tableClasses.push('clickable-rows');
  }

  transform(response: any) {
    for (const row of response.data) {
      row.standing = this.t(row.attributes.field_standing);
      if (!row.standing) row.standing = this.t('app-pending');
    }
  }

  urlBuilder(): OrganizationListUrlBuilder {
    const builder = new OrganizationListUrlBuilder();
    for (const field in this.filter) {
      if (['startDate', 'endDate', 'dateMode'].includes(field)) {
        continue;
      }
      const value = this.filter[field];
      builder.addFilter(field, value);
    }
    return builder;
  }

  loadSavedFilter(attributes) {
    if (attributes) {
      this.filter = attributes;
    }
  }

  clearFilter() {
    for (const field in this.filter) {
      this.filter[field] = '';
    }
  }
}
