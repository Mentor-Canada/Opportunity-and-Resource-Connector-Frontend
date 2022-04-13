import ListDelegateBase from '../../../pages/ListDelegateBase';
import ListDelegateInterface from '../../../pages/ListDelegateInterface';
import MentorCityListUrlBuilder from './MentorCityListUrlBuilder';
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import globals from "../../../globals";
import frLocale from "date-fns/locale/fr-CA";
import distanceInWordsToNow from "date-fns/formatDistanceToNow";
import format from "date-fns/format";

export default class MentorCityListDelegate extends ListDelegateBase implements ListDelegateInterface {
  csvUrl: string = 'app/mentorcity/csv';

  url: string = 'app/mentorcity';

  baseUrl: string = 'admin/mentorcity';

  constructor() {
    super();
    this.sort = [{
      name: 'attributes.created', direction: 'desc', field: 'attributes.modified_date', sortField: 'attributes.modified_date',
    }];
    this.fields = [
      { title: this.t('app-program-name'), name: 'attributes.title', sortField: true },
      { title: this.t('app-status'), name: 'attributes.status', sortField: true },
      { title: this.t('app-invitation-sent-to'), name: 'attributes.field_mentor_city_email', sortField: true },
      { title: globals.app.view.$t('activation-date'), name: 'attributes.created', sortField: 'attributes.created_date' },
      { title: globals.app.view.$t('deactivation-date'), name: 'attributes.deactivation_date', sortField: 'attributes.deactivation_date' },
      { title: globals.app.view.$t('deactivation-reason'), name: 'attributes.deactivation_reason', sortField: 'attributes.deactivation_reason' },
      { title: globals.app.view.$t('last-modified'), name: 'attributes.modified_date', sortField: 'attributes.modified_date' },
    ];
  }

  transform(response: any) {
    for(const row of response.data) {
      row.attributes.modified_date = this.formatTimestamp(row.attributes.modified_date);
      if(row.attributes.deactivation_date) {
        row.attributes.deactivation_date = this.formatTimestamp(row.attributes.deactivation_date);
      }
    }
    return response;
  }

  formatTimestamp(value): string {
    const date = new Date(parseInt(value) * 1000);
    const today = new Date();
    const distance = differenceInCalendarDays(today, date);

    if (distance <= 31) {
      const dateOptions: any = {};
      if (globals.app.language.langcode == 'fr') {
        dateOptions.locale = frLocale;
      }
      let distanceString = distanceInWordsToNow(date, dateOptions);
      return globals.app.t('app-created-ago', {date: distanceString});
    } else {
      return format(date, 'yyyy-MM-dd');
    }
  }

  urlBuilder(): MentorCityListUrlBuilder {
    const builder = new MentorCityListUrlBuilder();
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
