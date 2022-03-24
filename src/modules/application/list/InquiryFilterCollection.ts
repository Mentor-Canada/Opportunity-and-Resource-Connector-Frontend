import globals from '../../../globals';
import InquiryFilterEntity from './InquiryFilterEntity';

export default class InquiryFilterCollection {
  collection: InquiryFilterEntity[] = [];

  async load() {
    this.collection = [];
    const response = await globals.api.get('/a/app/inquiry/filter');
    for (const row of response.data.data) {
      const filter = new InquiryFilterEntity();
      filter.attributes.id = row.id;
      filter.attributes.title = row.field_display_title;
      filter.attributes.start_time = row.field_start_time;
      filter.attributes.end_time = row.field_end_time;
      filter.attributes.date_mode = row.field_date_mode;
      filter.entity = row.entity;
      this.collection.push(filter);
    }
  }
}
