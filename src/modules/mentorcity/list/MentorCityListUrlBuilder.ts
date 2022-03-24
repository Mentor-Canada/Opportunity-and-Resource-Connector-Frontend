import CollectionRequestUrlBuilder from '../../../pages/CollectionRequestUrlBuilder';

export default class MentorCityListUrlBuilder extends CollectionRequestUrlBuilder {
  private _search: string;

  standing(value: string): MentorCityListUrlBuilder {
    if (value == 'app-all') value = '';
    if (value) {
      if (value == 'app-pending') {
        this.params['filter[field_standing][condition][path]'] = 'field_standing';
        this.params['filter[field_standing][condition][operator]'] = 'IS NULL';
      } else {
        this.params['filter[field_standing][value]'] = value;
      }
    }
    return this;
  }

  province(value: string): MentorCityListUrlBuilder {
    if (value == 'app-all') value = '';
    if (value == 'app-unknown') {
      this.params['filter[province-filter][condition][path]'] = 'field_physical_locations.province';
      this.params['filter[province-filter][condition][operator]'] = 'IS NULL';
    } else if (value) {
      this.params['filter[field_physical_locations.province][value]'] = value;
    }
    return this;
  }

  name(value: string): MentorCityListUrlBuilder {
    if (value) {
      this.params['filter[field_display_title][value]'] = value;
      this.params['filter[field_display_title][operator]'] = 'CONTAINS';
    }
    return this;
  }

  addFilter(field: string, value: string): MentorCityListUrlBuilder {
    if (value == 'app-all') value = '';
    if (value == 'app-pending') value = 'IS NULL';
    if (value) {
      this.params[`filter[${field}]`] = JSON.stringify(value);
    }
    return this;
  }
}
