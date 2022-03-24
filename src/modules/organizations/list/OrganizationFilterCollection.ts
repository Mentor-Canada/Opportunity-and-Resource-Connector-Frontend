import globals from '../../../globals';
import FilterEntity from '../../filter/FilterEntity';

export default class OrganizationFilterCollection {
  collection: FilterEntity[] = [];

  private readonly type;

  constructor(type) {
    this.type = type;
  }

  async load() {
    this.collection = [];
    const response = await globals.api.get(`/a/app/filter?type=${this.type}`);
    for (const row of response.data) {
      const filter = new FilterEntity(this.type);
      filter.id = row.id;
      filter.attributes = row;
      this.collection.push(filter);
    }
  }
}
