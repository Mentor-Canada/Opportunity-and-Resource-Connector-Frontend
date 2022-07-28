import globals from '../../../globals';
import ProgramFields from './ProgramFields';
import ListDelegateBase from '../../../pages/ListDelegateBase';
import ListDelegateInterface from '../../../pages/ListDelegateInterface';
import { ProgramListUrlBuilder } from './ProgramListUrlBuilder';

export default class ProgramListDelegate extends ListDelegateBase implements ListDelegateInterface {
  csvUrl: string = 'app/program/csv';

  url: string = 'app/program';

  baseUrl: string = 'admin/programs';

  canAdd: boolean = false;

  additionalFilters: any[] = [];

  constructor() {
    super();
    this.sort = [{
      name: 'attributes.created', direction: 'desc', field: 'attributes.created', sortField: 'attributes.created',
    }];
    this.fields = [
      { title: this.t('app-name'), name: `attributes.${ProgramFields.displayTitle}`, sortField: `attributes.${ProgramFields.displayTitle}` },
      { title: this.t('app-organization'), name: 'attributes.organization_title', sortField: 'attributes.organization_title' },
      { title: this.t('app-contact'), name: 'email-slot' },
      { title: this.t('app-status'), name: 'attributes.field_standing', sortField: 'attributes.field_standing' },
      { title: this.t('app-responsiveness-tier'), name: 'attributes.responsivenessTier', sortField: 'attributes.responsivenessTier' },
      { title: this.t('app-program-source'), name: 'attributes.source', sortField: 'attributes.source' },
      { title: this.t('app-created'), name: 'attributes.created', sortField: 'attributes.created' },
      { title: '', name: 'slot-1' },
    ];
    this.setCanAdd();
    this.tableClasses.push('clickable-rows');
  }

  async setCanAdd() {
    if (globals.app.user.admin) {
      this.fields.push({ title: '', name: 'settings-slot' });
      this.canAdd = true;
    } else {
      const response = await globals.api.get('/en/a/app/organization');
      if (response.data.total) {
        this.canAdd = true;
      }
    }
  }

  transform(response: any) {
    for (const row of response.data) {
      if (!row.attributes.field_standing) {
        row.attributes.field_standing = this.t('app-pending');
      } else {
        row.attributes.field_standing = this.t(row.attributes.field_standing);
      }
    }
    return response;
  }

  urlBuilder(): ProgramListUrlBuilder {
    const builder = new ProgramListUrlBuilder();
    if (this.additionalFilters.length) {
      this.additionalFilters.forEach((additionalFilter) => {
        builder.addFilter(additionalFilter.field, additionalFilter.value);
      });
      this.additionalFilters = [];
    }
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
